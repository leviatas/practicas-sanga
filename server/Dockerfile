# Backend de logs — Node puro, sin dependencias (usa node:sqlite integrado).
FROM node:22-alpine

WORKDIR /app
COPY package.json ./
COPY src ./src

# La base de datos vive en /data (montado como volumen para que persista).
ENV DB_PATH=/data/usage.db
ENV PORT=3000
EXPOSE 3000

# node:sqlite es experimental en Node 22 y necesita el flag.
CMD ["node", "--experimental-sqlite", "src/index.js"]
