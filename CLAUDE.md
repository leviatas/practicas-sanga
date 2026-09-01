# Notas para Claude — practicas-sanga

## Versionado (IMPORTANTE)

Este proyecto usa versión semántica en `package.json`. La versión se muestra en
el footer de la app (`__APP_VERSION__`, inyectada por Vite desde `package.json`).

Convención del repo:

- **Cada cambio de contenido/app sube la versión** en `package.json` (semver:
  patch para arreglos/ajustes de ejercicios, minor para secciones o funciones
  nuevas).
- El mensaje de commit incluye la versión al final, entre paréntesis. Ej:
  `Vocabulario bici: armar la palabra con letras (v1.12.0)`.
- Cambios que **no** tocan la app (solo docs, como este `CLAUDE.md`) no suben
  la versión.

## Avisar la versión en cada merge (preferencia del usuario)

**Cada vez que se hace un merge a `main`, avisar en el chat qué versión se
subió** (la versión que quedó en `package.json` tras el merge). Ej:
"Mergeado a main ✅ — versión subida: **v1.12.0**".

Si el merge fue solo de docs y no cambió la versión, aclararlo:
"Merge de docs, la versión sigue en v1.11.2".

## Pedir permiso SIEMPRE para PR y merge (IMPORTANTE)

**Nunca abrir un Pull Request ni mergear a `main` sin pedirme permiso antes y
esperar mi respuesta.** Vale para cada PR y para cada merge, todas las veces:
que en un pedido anterior yo haya dicho "PR y merge" NO autoriza los
siguientes.

Flujo esperado al terminar un cambio:

1. Commit y push a la rama de trabajo (eso sí, sin preguntar).
2. Contarme qué quedó hecho y **preguntarme** si abro el PR.
3. Con el PR abierto, **volver a preguntarme** antes de mergear.
