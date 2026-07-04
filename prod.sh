#!/usr/bin/env bash
# ============================================================================
# prod.sh — Build y deploy de producción con Docker Compose.
#
# Hace todo de una sola vez:
#   1. Verifica que Docker esté disponible.
#   2. Verifica que el puerto elegido NO esté en uso.
#   3. Construye la imagen (Vite build dentro del contenedor).
#   4. Levanta el contenedor de producción (nginx) en segundo plano.
#   5. Muestra la URL local y la de Tailscale con el puerto elegido.
#
# Uso:
#   ./prod.sh            # build + deploy (puerto 8080)
#   PORT=3000 ./prod.sh  # build + deploy en otro puerto
#   ./prod.sh down       # detener y eliminar el contenedor
#   ./prod.sh logs       # ver logs en vivo
# ============================================================================
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8080}"
CONTAINER_NAME="practicas-sanga"

# --- Elegir el comando de compose (v2 "docker compose" o v1 "docker-compose") ---
if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE="docker-compose"
else
  echo "❌ No se encontró Docker Compose. Instalá Docker antes de continuar." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker no está corriendo. Iniciá Docker y volvé a intentar." >&2
  exit 1
fi

# --- Subcomandos opcionales ---
case "${1:-up}" in
  down)
    echo "🛑 Deteniendo Prácticas Sanga..."
    $COMPOSE down
    exit 0
    ;;
  logs)
    $COMPOSE logs -f
    exit 0
    ;;
  up)
    ;;
  *)
    echo "Uso: ./prod.sh [up|down|logs]" >&2
    exit 1
    ;;
esac

# --- ¿Está el puerto en uso? ---
port_in_use() {
  local p="$1"
  if command -v ss >/dev/null 2>&1; then
    ss -Hltn "sport = :$p" 2>/dev/null | grep -q .
  elif command -v lsof >/dev/null 2>&1; then
    lsof -iTCP:"$p" -sTCP:LISTEN >/dev/null 2>&1
  elif command -v netstat >/dev/null 2>&1; then
    netstat -ltn 2>/dev/null | grep -qE "[:.]$p[[:space:]]"
  else
    # Sin herramienta para chequear: no bloqueamos.
    return 1
  fi
}

if port_in_use "$PORT"; then
  # Si el que lo usa es NUESTRO propio contenedor, está OK (compose lo recrea).
  if docker ps --format '{{.Names}} {{.Ports}}' 2>/dev/null \
       | grep -q "${CONTAINER_NAME}.*:${PORT}->"; then
    echo "ℹ️  El puerto ${PORT} lo usa el contenedor actual; se va a recrear."
  else
    echo "❌ El puerto ${PORT} ya está en uso por otro proceso." >&2
    echo "   Elegí otro puerto, por ejemplo:  PORT=8090 ./prod.sh" >&2
    exit 1
  fi
fi

echo "📦 Construyendo y levantando Prácticas Sanga (puerto ${PORT})..."
PORT="$PORT" $COMPOSE up -d --build

# --- IP de Tailscale (para probar desde otros dispositivos de la tailnet) ---
ts_ip() {
  if command -v tailscale >/dev/null 2>&1; then
    tailscale ip -4 2>/dev/null | head -n1
  fi
}
TS_IP="$(ts_ip || true)"

echo ""
echo "✅ ¡Listo! Prácticas Sanga está corriendo en el puerto ${PORT}."
echo ""
echo "   Local:      http://localhost:${PORT}"
if [ -n "${TS_IP}" ]; then
  echo "   Tailscale:  http://${TS_IP}:${PORT}"
else
  echo "   Tailscale:  (no detectado — instalá y activá tailscale con 'tailscale up'"
  echo "               para acceder desde otros dispositivos de tu tailnet)"
fi
echo ""
echo "   Ver logs:   ./prod.sh logs"
echo "   Detener:    ./prod.sh down"
