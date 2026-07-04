#!/usr/bin/env bash
# ============================================================================
# prod.sh — Build y deploy de producción con Docker Compose.
#
# Hace todo de una sola vez:
#   1. Verifica que Docker esté disponible.
#   2. Construye la imagen (Vite build dentro del contenedor).
#   3. Levanta el contenedor de producción (nginx) en segundo plano.
#   4. Muestra la URL donde queda disponible.
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

echo "📦 Construyendo y levantando Prácticas Sanga (puerto ${PORT})..."
PORT="$PORT" $COMPOSE up -d --build

echo ""
echo "✅ ¡Listo! Prácticas Sanga está corriendo."
echo "   Abrí:  http://localhost:${PORT}"
echo ""
echo "   Ver logs:   ./prod.sh logs"
echo "   Detener:    ./prod.sh down"
