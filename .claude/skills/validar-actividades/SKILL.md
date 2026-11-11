---
name: validar-actividades
description: Valida actividades (prácticas) de cualquier grado antes o después de publicarlas — que las respuestas sean correctas, que no haya pistas que regalen la respuesta, que sean útiles para el grado y que los datos no tengan errores. Úsala cuando pidan "validá las actividades", "revisá las prácticas nuevas", "fijate si están bien", "buscá errores en los ejercicios", o al terminar de cargar actividades nuevas.
---

# Validar actividades

Revisión en dos partes: una **automática** (script, estructura de los datos)
y una **a mano** (contenido: lo que el script no puede saber). El resultado es
un informe; **no se corrige nada sin preguntar** qué arreglar.

## 1. Qué revisar (alcance)

Si el usuario nombra grado / materia / período / práctica, eso. Si no, las
**actividades nuevas**:

```bash
# En una rama de trabajo: lo que cambió respecto de main
git diff --name-only main...HEAD -- src/data src/assets
# En main: los últimos commits que tocaron datos
git log --oneline -8 -- src/data
git show --stat <commit>
```

Traducí los archivos a filtros `grado/materia/período[/práctica]` mirando
`src/data/grades.ts` (ej: `grade4SocialesAlto3.ts` →
`4/sociales/alto-en-el-camino-3`). Los ids de la URL son los de `grades.ts`.

## 2. Parte automática

```bash
node scripts/validar-actividades.mjs <filtro> [<filtro> ...]
# ej: node scripts/validar-actividades.mjs 1/english/repaso 4/pdl/alto-en-el-camino-3
```

Carga los datos con Vite (resuelve imágenes igual que la app) y revisa cada
pregunta según su `kind`:

- **❌ Errores** (rompen el ejercicio): ninguna correcta, opciones repetidas,
  respuesta que no está en las opciones/banco, huecos que no cuadran con las
  respuestas, categorías inexistentes, índices fuera de rango, imágenes que no
  están en ningún mapa, ids repetidos (pregunta en la práctica; práctica en el
  grado, porque el progreso se guarda por grado + práctica).
- **⚠️ Avisos** (posibles pistas): la consigna/oración/emoji contiene la
  respuesta, el botón 📢 ESCUCHA dice la respuesta, la correcta es mucho más
  larga que las demás, la correcta cae siempre en el mismo lugar con orden fijo.

Los avisos **no son errores automáticos**: cada uno se juzga en la parte 3
(ej: en jardín "Tocá la banana" nombra la respuesta a propósito; en 1er grado
escuchar la palabra es ayuda buscada si lo que se practica es cómo se escribe).

Si sumás un mapa de imágenes nuevo a `QUESTION_IMAGES` de
`src/pages/PracticePage.tsx`, sumalo también en el script.

## 3. Parte a mano (leer los datos y mirar las imágenes)

Leé el archivo de datos completo de cada práctica y, si usa imágenes, miralas
(Read sobre `src/assets/...`). Revisá pregunta por pregunta:

### A. ¿Está bien? (errores de contenido)
- La opción marcada como correcta **es** la correcta. Rehacé cada cuenta.
- Las incorrectas son incorrectas de verdad (que ninguna también sea válida).
- Clasificaciones: cada ficha en su caja; que ninguna pueda ir en dos.
- El dibujo/foto coincide con la respuesta (cantidades, lo que se ve).
- Ortografía, tildes, gramática; en inglés, que la forma sea correcta.
- La explicación (`explanation` / `why`) dice lo mismo que la respuesta.
- Coincide con el temario o libro que figura en el comentario del archivo
  (definiciones como las enseña la seño: ej. isósceles "dos" vs "al menos dos").

### B. ¿Da pistas que invalidan la tarea?
- **Emoji o imagen que muestra la respuesta** (📏 en "¿con qué medimos el
  largo?" → regla).
- **Artículo o concordancia en los huecos**: en un `drag`, "la ___" con una
  sola ficha femenina en el banco ya dice cuál va. Poné el artículo dentro de
  la ficha o distractores del mismo género y número.
- **La consigna o la oración ya resuelven**: "YES, ___" con THEY ARE / THEY
  AREN'T se responde mirando solo el YES/NO, sin mirar el dibujo.
- **La correcta se delata por la forma**: la más larga o detallada, la única
  con punto final o mayúscula, la única "técnica".
- **Distractores absurdos** ("El 2.025", "Para jugar a la pelota"): la
  pregunta no mide nada. Los buenos distractores son errores típicos.
- **Patrón de posición** con `keepOrder` (la correcta siempre arriba).
- **Lectura en voz alta**: jardín y 1er grado (PDL y Matemática) leen la
  consigna solos; revisá qué dice la voz (`speak()` en PracticePage borra
  "+" y "⋯": "1 + 1 = ⋯" se oye "1 1 ="). El 📢 ESCUCHA no puede decir la
  respuesta cuando lo que se evalúa es reconocer la palabra.
- Otra pregunta de la misma práctica que trae la respuesta escrita.
- La `hint` no puede decir la respuesta, solo orientarla.

### C. ¿Es útil?
- Cubre el temario del examen y no se va de tema.
- Dificultad acorde al grado (1er grado: frases cortas, pocas opciones; 4to:
  razonamiento, `reveal` con el porqué de cada opción).
- Variedad de ejercicios y cantidad razonable de preguntas por práctica.
- Cada pregunta mide lo que dice medir (si se puede acertar sin saber el
  tema, no sirve).

### D. Técnica (si hay dudas de diseño)
- Que entre en la pantalla del celular sin scroll (levantar `npx vite` y
  medir; ver el skill `run`).

## 4. Informe

Un bloque por práctica revisada, con este orden de gravedad:

1. **Error**: respuesta mal, ejercicio roto → hay que arreglar.
2. **Pista**: se puede acertar sin saber → conviene arreglar.
3. **Mejora**: utilidad, distractores flojos, redacción.

Cada hallazgo con `archivo:línea`, qué pasa, y el arreglo propuesto concreto.
Las prácticas sin problemas se nombran en una línea ("sin observaciones").
Al final, preguntar **qué arreglar**. Si se arregla contenido de la app, va
con subida de versión (patch) según `CLAUDE.md`.
