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

`prod.sh` te **pregunta en qué puerto** publicar la app (default `8080`),
valida que no esté en uso y guarda el elegido en un archivo **`.env`**
(ignorado por git). Docker Compose lee ese puerto desde `.env`.

Otros comandos:

```bash
PORT=3000 ./prod.sh   # usar 3000 sin preguntar (también lo guarda en .env)
./prod.sh logs        # ver logs en vivo
./prod.sh down        # detener y eliminar el contenedor
```

Equivalente manual con Compose (usa el puerto del `.env`):

```bash
docker compose up -d --build      # build + deploy
docker compose down               # detener
```

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
