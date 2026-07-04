# 📚 Prácticas Sanga

App web para **practicar exámenes por grado**, sin necesidad de login.
Pensada para usarse cómodamente tanto en **celular** como en **computadora**.

Actualmente incluye los **midterms de inglés** de **1er grado** y **4to grado**.

- ✅ Sin registro ni contraseñas
- ✅ Responsive (mobile + escritorio) y accesible (teclado, buen contraste, modo oscuro)
- ✅ React + Vite + TypeScript
- ✅ Deploy con Docker Compose en un solo comando

---

## 🚀 Puesta en producción (Docker Compose)

Con Docker instalado, un solo comando construye y despliega todo:

```bash
./prod.sh
```

Al ejecutarlo, `prod.sh` primero hace **`git pull`** para traer los últimos
cambios (se puede saltar con `NO_PULL=1 ./prod.sh`; si no hay conexión, avisa
y sigue con la versión actual).

`prod.sh` **no pregunta** el puerto: usa el que esté guardado en **`.env`**
(o `8080` por defecto) y, si ese puerto está ocupado por otro proceso,
**busca automáticamente el próximo libre**. El puerto elegido queda guardado
en `.env` (ignorado por git) y Docker Compose lo lee desde ahí.

Otros comandos:

```bash
PORT=3000 ./prod.sh   # forzar 3000 (si está libre); también lo guarda en .env
./prod.sh logs        # ver logs en vivo
./prod.sh down        # detener y eliminar el contenedor
```

Equivalente manual con Compose (usa el puerto del `.env`):

```bash
docker compose up -d --build      # build + deploy
docker compose down               # detener
```

---

## 🌐 Exponer a internet (Cloudflare Tunnel)

Podés publicar la app a internet con un túnel de Cloudflare, sin abrir puertos
en el router.

1. En **Cloudflare Zero Trust → Networks → Tunnels**, creá un túnel y copiá su
   **token** (la cadena larga que aparece tras `--token`).
2. En el panel del túnel, agregá un **public hostname** (ej. `practicas.tudominio.com`)
   apuntando al servicio interno **`http://web:80`**.
3. Poné el token en `.env`:

   ```bash
   echo "CLOUDFLARED_TOKEN=pegá-acá-tu-token" >> .env
   ./prod.sh
   ```

`prod.sh` detecta el token y levanta también el servicio `cloudflared`
(profile `tunnel`). Sin token, solo corre la web local.

Manual con Compose:

```bash
docker compose --profile tunnel up -d --build   # web + túnel
docker compose --profile tunnel down            # bajar ambos
```

> El archivo `.env.example` documenta las variables (`PORT`, `CLOUDFLARED_TOKEN`).

---

## 📊 Logs de uso (backend + SQLite)

La app registra el uso en un **backend propio** (Node, sin dependencias) que
guarda cada evento con la **IP del visitante** en **SQLite**.

- Eventos: apertura de la página, inicio de práctica, respuestas (con acierto)
  y prácticas completadas.
- Para verlos: **click en la versión** del footer y poné la **contraseña**
  (variable `LOGS_PASSWORD`, default `Sanga70`; la valida el backend).
- El panel muestra resumen, actividad **por IP (PC)**, por práctica y reciente.

Arquitectura: `nginx` sirve la app y hace `proxy_pass` de `/api` al servicio
`backend` (pasando la IP real, también detrás de Cloudflare). La base SQLite
persiste en el volumen `sanga-db`.

> Es logging básico de uso; no guarda datos personales más allá de la IP.

---

## 🧑‍💻 Desarrollo

### Opción A — con Docker (no necesitás Node instalado)

```bash
docker compose -f docker-compose.dev.yml up
```

Abrí **http://localhost:5173** (recarga automática al editar).

### Opción B — con Node local (>= 20)

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # build de producción en ./dist
npm run preview    # previsualizar el build
npm run lint       # chequeo de tipos con TypeScript
```

---

## ✏️ Cómo agregar o editar contenido

Todo el contenido vive en **`src/data/`** y es fácil de editar (no hace falta
tocar la lógica de la app).

- **`src/data/grades.ts`** → lista de grados disponibles.
- **`src/data/grade1-english-midterm.ts`** → preguntas de 1er grado (contenido real).
- **`src/data/grade4-english-midterm.ts`** → preguntas de 4to grado
  (contenido real: Academy Stars 4, Units 1 a 4).

### Agregar una pregunta

Copiá un bloque dentro de `questions` y editá el texto. La opción correcta se
marca con `correct: true`:

```ts
{
  id: 'q19',
  prompt: '¿Cómo se dice "amarillo" en inglés?',
  emoji: '🟨',
  options: [
    { text: 'Yellow', correct: true },
    { text: 'Green' },
    { text: 'Blue' },
  ],
  explanation: 'Opcional: se muestra después de responder.',
}
```

### Agregar un grado nuevo (2do, 3ro, ...)

1. Creá un archivo nuevo en `src/data/` (podés copiar uno existente).
2. Importalo y agregalo al array `grades` en `src/data/grades.ts`.

### Agregar otra práctica dentro de un grado

Un grado puede tener varias prácticas. Agregá otra entrada en el array
`practices` del grado correspondiente.

---

## 🗂️ Estructura del proyecto

```
├── prod.sh                 # build + deploy de producción (un comando)
├── docker-compose.yml      # producción (nginx)
├── docker-compose.dev.yml  # desarrollo (Vite + hot reload)
├── Dockerfile              # build multi-stage (node → nginx)
├── nginx.conf              # config nginx con fallback SPA
├── index.html
└── src/
    ├── main.tsx            # entrada + rutas
    ├── App.tsx             # layout (header/footer)
    ├── types.ts            # modelo de datos
    ├── index.css           # estilos (mobile-first, accesible, modo oscuro)
    ├── data/               # 👈 contenido editable (grados y preguntas)
    └── pages/              # Home, Grado, Práctica (quiz), 404
```
