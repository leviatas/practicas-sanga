#!/usr/bin/env bash
# ============================================================================
# prod.sh — Build y deploy de producción con Docker Compose.
#
# Hace todo de una sola vez, SIN preguntar el puerto:
#   0. Actualiza el repo (git pull; se puede saltar con NO_PULL=1).
#   1. Verifica que Docker esté disponible.
#   2. Resuelve el puerto automáticamente:
#        - usa la variable PORT del entorno si se pasó, o
#        - usa el PORT guardado en .env si existe, o
#        - usa 8080 por defecto;
#      y si ese puerto está ocupado por otro proceso, busca el próximo libre.
#   3. Guarda el puerto elegido en .env (lo lee Docker Compose).
#   4. Construye la imagen (Vite build dentro del contenedor).
#   5. Levanta el contenedor de producción (nginx) en segundo plano.
#   6. Muestra la URL local y la de Tailscale con el puerto elegido.
#
# Uso:
#   ./prod.sh            # usa .env / 8080 y busca libre si hace falta
#   PORT=3000 ./prod.sh  # fuerza 3000 (si está libre) y lo guarda en .env
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
    $COMPOSE --profile tunnel down
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

# --- Traer los últimos cambios del repo (best-effort; se puede saltar con NO_PULL=1) ---
if [ "${NO_PULL:-}" != "1" ] && [ -d .git ] && command -v git >/dev/null 2>&1; then
  echo "⬇️  Actualizando el repo (git pull)..."
  if ! git pull --ff-only; then
    echo "  ⚠️  No se pudo actualizar (¿sin conexión o cambios locales?). Sigo con la versión actual." >&2
  fi
fi

valid_port() {
  [[ "${1:-}" =~ ^[0-9]+$ ]] && [ "$1" -ge 1 ] && [ "$1" -le 65535 ]
}

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
    # Sin herramienta para chequear: asumimos libre.
    return 1
  fi
}

# ¿El puerto lo usa NUESTRO propio contenedor? (entonces se puede reusar/recrear)
used_by_us() {
  docker ps --format '{{.Names}} {{.Ports}}' 2>/dev/null \
    | grep -q "${CONTAINER_NAME}.*:${1}->"
}

# --- Puerto base: PORT del entorno > PORT de .env > 8080 ---
SAVED_PORT=""
if [ -f "$ENV_FILE" ]; then
  SAVED_PORT="$(grep -E '^PORT=' "$ENV_FILE" 2>/dev/null | tail -n1 | cut -d= -f2 | tr -d '[:space:]' || true)"
fi

if valid_port "$REQUESTED_PORT"; then
  BASE_PORT="$REQUESTED_PORT"
elif valid_port "$SAVED_PORT"; then
  BASE_PORT="$SAVED_PORT"
  echo "🔎 Usando el puerto ${BASE_PORT} guardado en ${ENV_FILE}."
else
  BASE_PORT="$DEFAULT_PORT"
fi

# --- Elegir el puerto: el base si está libre (o es nuestro), si no el próximo libre ---
PORT=""
candidate="$BASE_PORT"
limit=$((BASE_PORT + 50))
while [ "$candidate" -le "$limit" ] && [ "$candidate" -le 65535 ]; do
  if used_by_us "$candidate" || ! port_in_use "$candidate"; then
    PORT="$candidate"
    break
  fi
  candidate=$((candidate + 1))
done

if [ -z "$PORT" ]; then
  echo "❌ No encontré un puerto libre entre ${BASE_PORT} y ${limit}." >&2
  echo "   Probá indicando uno con:  PORT=NNNN ./prod.sh" >&2
  exit 1
fi

if [ "$PORT" != "$BASE_PORT" ]; then
  echo "ℹ️  El puerto ${BASE_PORT} estaba ocupado; uso el ${PORT}."
fi

# --- Guardar el puerto en .env (lo lee docker compose) ---
touch "$ENV_FILE"
if grep -qE '^PORT=' "$ENV_FILE"; then
  sed -i -E "s|^PORT=.*|PORT=${PORT}|" "$ENV_FILE"
else
  printf 'PORT=%s\n' "$PORT" >> "$ENV_FILE"
fi
echo "💾 Puerto ${PORT} guardado en ${ENV_FILE}"

# --- ¿Hay token de Cloudflare Tunnel en .env? Entonces exponemos a internet ---
TUNNEL_ON=false
if [ -f "$ENV_FILE" ]; then
  TOKEN_VAL="$(grep -E '^CLOUDFLARED_TOKEN=' "$ENV_FILE" 2>/dev/null | tail -n1 | cut -d= -f2- | tr -d '[:space:]' || true)"
  if [ -n "${TOKEN_VAL:-}" ]; then
    TUNNEL_ON=true
  fi
fi

echo "📦 Construyendo y levantando Prácticas Sanga (puerto ${PORT})..."
# docker compose toma PORT automáticamente desde .env
if [ "$TUNNEL_ON" = true ]; then
  echo "🌐 CLOUDFLARED_TOKEN detectado: se levanta también el túnel de Cloudflare."
  $COMPOSE --profile tunnel up -d --build
else
  $COMPOSE up -d --build
fi

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
