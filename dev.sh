#!/usr/bin/env bash
# ============================================================================
# dev.sh — Entorno de desarrollo con Docker Compose (Vite + hot reload).
#
# Es el hermano de ./prod.sh, pero para desarrollar: no compila nada, monta el
# código del repo dentro del contenedor y recarga solo al guardar un archivo.
#
#   1. Verifica que Docker esté disponible.
#   2. Resuelve el puerto automáticamente:
#        - usa la variable DEV_PORT del entorno si se pasó, o
#        - usa el DEV_PORT guardado en .env si existe, o
#        - usa 5173 por defecto;
#      y si ese puerto está ocupado por otro proceso, busca el próximo libre.
#   3. Guarda el puerto elegido en .env (lo lee Docker Compose).
#   4. Levanta el contenedor de desarrollo (Vite) y el backend de logs.
#   5. Muestra la URL local y la de Tailscale con el puerto elegido.
#
# A diferencia de prod.sh:
#   - NO hace git pull (en desarrollo mandan tus cambios locales).
#   - NO rota la clave de telemetría (usa LOGS_PASSWORD de .env o Sanga70).
#   - Usa su propia base de datos (volumen sanga-db-dev), separada de la real.
#   - Por defecto queda en primer plano mostrando los logs (Ctrl+C para salir).
#
# Uso:
#   ./dev.sh              # levanta y queda mostrando los logs (Ctrl+C corta)
#   DEV_PORT=5200 ./dev.sh   # fuerza 5200 (si está libre) y lo guarda en .env
#   ./dev.sh -d           # levanta en segundo plano
#   ./dev.sh down         # detener y eliminar los contenedores
#   ./dev.sh logs         # ver logs en vivo
# ============================================================================
set -euo pipefail

cd "$(dirname "$0")"

COMPOSE_FILE="docker-compose.dev.yml"
CONTAINER_NAME="practicas-sanga-dev"
ENV_FILE=".env"
DEFAULT_PORT=5173
# Puerto pedido explícitamente por variable de entorno (si la hubiera)
REQUESTED_PORT="${DEV_PORT:-}"

# --- Elegir el comando de compose (v2 "docker compose" o v1 "docker-compose") ---
if docker compose version >/dev/null 2>&1; then
  COMPOSE="docker compose -f $COMPOSE_FILE"
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE="docker-compose -f $COMPOSE_FILE"
else
  echo "❌ No se encontró Docker Compose. Instalá Docker antes de continuar." >&2
  exit 1
fi

if ! docker info >/dev/null 2>&1; then
  echo "❌ Docker no está corriendo. Iniciá Docker y volvé a intentar." >&2
  exit 1
fi

# --- Subcomandos opcionales ---
DETACHED=false
case "${1:-up}" in
  down)
    echo "🛑 Deteniendo el entorno de desarrollo..."
    $COMPOSE down
    exit 0
    ;;
  logs)
    $COMPOSE logs -f
    exit 0
    ;;
  -d|detach)
    DETACHED=true
    ;;
  up)
    ;;
  *)
    echo "Uso: ./dev.sh [up|-d|down|logs]" >&2
    exit 1
    ;;
esac

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

# ¿El puerto lo usa NUESTRO propio contenedor de dev? (entonces se puede reusar)
used_by_us() {
  docker ps --format '{{.Names}} {{.Ports}}' 2>/dev/null \
    | grep -q "${CONTAINER_NAME}.*:${1}->"
}

# --- Puerto base: DEV_PORT del entorno > DEV_PORT de .env > 5173 ---
SAVED_PORT=""
if [ -f "$ENV_FILE" ]; then
  SAVED_PORT="$(grep -E '^DEV_PORT=' "$ENV_FILE" 2>/dev/null | tail -n1 | cut -d= -f2 | tr -d '[:space:]' || true)"
fi

if valid_port "$REQUESTED_PORT"; then
  BASE_PORT="$REQUESTED_PORT"
elif valid_port "$SAVED_PORT"; then
  BASE_PORT="$SAVED_PORT"
  echo "🔎 Usando el puerto ${BASE_PORT} guardado en ${ENV_FILE}."
else
  BASE_PORT="$DEFAULT_PORT"
fi

# --- Elegir el puerto: el base si está libre (o es nuestro), si no el próximo ---
DEV_PORT=""
candidate="$BASE_PORT"
limit=$((BASE_PORT + 50))
while [ "$candidate" -le "$limit" ] && [ "$candidate" -le 65535 ]; do
  if used_by_us "$candidate" || ! port_in_use "$candidate"; then
    DEV_PORT="$candidate"
    break
  fi
  candidate=$((candidate + 1))
done

if [ -z "$DEV_PORT" ]; then
  echo "❌ No encontré un puerto libre entre ${BASE_PORT} y ${limit}." >&2
  echo "   Probá indicando uno con:  DEV_PORT=NNNN ./dev.sh" >&2
  exit 1
fi

if [ "$DEV_PORT" != "$BASE_PORT" ]; then
  echo "ℹ️  El puerto ${BASE_PORT} estaba ocupado; uso el ${DEV_PORT}."
fi

# --- Guardar el puerto en .env (lo lee docker compose) ---
touch "$ENV_FILE"
if grep -qE '^DEV_PORT=' "$ENV_FILE"; then
  sed -i -E "s|^DEV_PORT=.*|DEV_PORT=${DEV_PORT}|" "$ENV_FILE"
else
  printf 'DEV_PORT=%s\n' "$DEV_PORT" >> "$ENV_FILE"
fi
echo "💾 Puerto ${DEV_PORT} guardado en ${ENV_FILE}"

# --- IP de Tailscale (para probar desde otros dispositivos de la tailnet) ---
ts_ip() {
  if command -v tailscale >/dev/null 2>&1; then
    tailscale ip -4 2>/dev/null | head -n1
  fi
}
TS_IP="$(ts_ip || true)"

echo ""
echo "🚀 Levantando el entorno de desarrollo (puerto ${DEV_PORT})..."
echo ""
echo "   Local:      http://localhost:${DEV_PORT}"
if [ -n "${TS_IP}" ]; then
  echo "   Tailscale:  http://${TS_IP}:${DEV_PORT}"
fi
echo ""

# docker compose toma DEV_PORT automáticamente desde .env
if [ "$DETACHED" = true ]; then
  $COMPOSE up -d --build
  echo ""
  echo "✅ Corriendo en segundo plano (la primera vez tarda: hace npm install)."
  echo ""
  echo "   Ver logs:   ./dev.sh logs"
  echo "   Detener:    ./dev.sh down"
else
  echo "   (la primera vez tarda un poco: hace npm install dentro del contenedor)"
  echo "   Ctrl+C para cortar. Para detener del todo:  ./dev.sh down"
  echo ""
  $COMPOSE up -d --build
fi
