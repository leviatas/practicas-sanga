# ============================================================================
# Etapa 1: build de la app (Vite + React + TypeScript)
# ============================================================================
FROM node:22-alpine AS build

WORKDIR /app

# Instalamos dependencias con la lockfile para builds reproducibles
COPY package.json package-lock.json* ./
RUN npm ci

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# ============================================================================
# Etapa 2: servir los archivos estáticos con nginx
# ============================================================================
FROM nginx:1.27-alpine AS runtime

# Config de nginx con fallback SPA (para que funcione React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck simple
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
