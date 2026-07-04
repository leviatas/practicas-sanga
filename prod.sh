#!/usr/bin/env bash
# ============================================================================
# prod.sh — Build y deploy de producción con Docker Compose.
#
# Hace todo de una sola vez:
#   1. Verifica que Docker esté disponible.
#   2. Elige el puerto: te lo pregunta al ejecutar (o toma la variable PORT),
#      lo valida (que sea válido y NO esté en uso) y lo guarda en .env.
#   3. Docker Compose lee ese puerto desde .env.
#   4. Construye la imagen (Vite build dentro del contenedor).
#   5. Levanta el contenedor de producción (nginx) en segundo plano.
#   6. Muestra la URL local y la de Tailscale con el puerto elegido.
#
# Uso:
#   ./prod.sh            # pregunta el puerto (default 8080 o el guardado en .env)
#   PORT=3000 ./prod.sh  # usa 3000 sin preguntar y lo guarda en .env
#   ./prod.sh down       # detener y eliminar el contenedor
#   ./prod.sh logs       # ver logs en vivo
# ============================================================================
set -euo pipefail

cd "$(dirname "$0")"

CONTAINER_NAME="practicas-sanga"
ENV_FILE=".env"
DEFAULT_PORT=8080
# Puerto pedido explícitamente por variable de entorno (si la hubiera)
REQUESTED_PORT="${PORT:-}"

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

# ¿El puerto lo usa NUESTRO propio contenedor? (entonces se puede recrear)
used_by_us() {
  docker ps --format '{{.Names}} {{.Ports}}' 2>/dev/null \
    | grep -q "${CONTAINER_NAME}.*:${1}->"
}

valid_port() {
  [[ "$1" =~ ^[0-9]+$ ]] && [ "$1" -ge 1 ] && [ "$1" -le 65535 ]
}

# --- Determinar el default sugerido (el guardado en .env, si existe) ---
if [ -f "$ENV_FILE" ]; then
  SAVED_PORT="$(grep -E '^PORT=' "$ENV_FILE" 2>/dev/null | tail -n1 | cut -d= -f2 | tr -d '[:space:]' || true)"
  if valid_port "${SAVED_PORT:-}"; then
    DEFAULT_PORT="$SAVED_PORT"
  fi
fi

# --- Elegir el puerto ---
choose_port() {
  local candidate
  while true; do
    if [ -n "$REQUESTED_PORT" ]; then
      candidate="$REQUESTED_PORT"
      REQUESTED_PORT=""   # solo se usa una vez; si falla, pasamos a preguntar
    elif [ -t 0 ]; then
      read -r -p "¿En qué puerto querés publicar la app? [${DEFAULT_PORT}]: " candidate
      candidate="${candidate:-$DEFAULT_PORT}"
    else
      candidate="$DEFAULT_PORT"   # sin terminal interactiva: usamos el default
    fi

    if ! valid_port "$candidate"; then
      echo "  ⚠️  Puerto inválido: '${candidate}'. Poné un número entre 1 y 65535." >&2
      [ -t 0 ] && continue || exit 1
    fi

    if port_in_use "$candidate" && ! used_by_us "$candidate"; then
      echo "  ⚠️  El puerto ${candidate} ya está en uso por otro proceso. Elegí otro." >&2
      [ -t 0 ] && continue || exit 1
    fi

    PORT="$candidate"
    return 0
  done
}

choose_port

# --- Guardar el puerto en .env (lo lee docker compose) ---
touch "$ENV_FILE"
if grep -qE '^PORT=' "$ENV_FILE"; then
  sed -i -E "s|^PORT=.*|PORT=${PORT}|" "$ENV_FILE"
else
  printf 'PORT=%s\n' "$PORT" >> "$ENV_FILE"
fi
echo "💾 Puerto ${PORT} guardado en ${ENV_FILE}"

echo "📦 Construyendo y levantando Prácticas Sanga (puerto ${PORT})..."
# docker compose toma PORT automáticamente desde .env
$COMPOSE up -d --build

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
