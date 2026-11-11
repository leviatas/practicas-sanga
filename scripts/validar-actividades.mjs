// Validación AUTOMÁTICA de las actividades (estructura de los datos).
//
// Carga src/data/grades.ts con Vite (así resuelve las imágenes y los
// import.meta.glob igual que la app) y revisa cada pregunta según su `kind`:
// que la respuesta correcta exista, que los huecos y las fichas cuadren, que
// las imágenes estén, que no haya ids repetidos, y algunas PISTAS que regalan
// la respuesta (la consigna la contiene, el botón ESCUCHA la dice, la correcta
// siempre en el mismo lugar...).
//
// Lo que NO puede ver (si la respuesta es la correcta de verdad, si el dibujo
// coincide, si es útil para el grado) lo revisa Claude con el comando
// /validar-actividades (ver .claude/skills/validar-actividades/SKILL.md).
//
// Uso:
//   node scripts/validar-actividades.mjs                 → todo
//   node scripts/validar-actividades.mjs 4               → solo 4to grado
//   node scripts/validar-actividades.mjs 4/pdl           → una materia
//   node scripts/validar-actividades.mjs 1/english/repaso → un período
//   node scripts/validar-actividades.mjs 1/english/repaso/repaso-can-cant
// Se pueden pasar varios filtros. Sale con código 1 si hay errores.
import { createServer } from 'vite'

const filters = process.argv.slice(2).map((f) => f.split('/').filter(Boolean))

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
  logLevel: 'error',
})

let exitCode = 0
try {
  const { grades: GRADES } = await server.ssrLoadModule('/src/data/grades.ts')
  const load = (p, name) => server.ssrLoadModule(p).then((m) => m[name])
  // Mismo orden que QUESTION_IMAGES en src/pages/PracticePage.tsx: si sumás
  // un mapa de imágenes allá, sumalo acá también.
  const questionImageMaps = {
    schoolImages: await load('/src/components/schoolImages.ts', 'schoolImages'),
    familyImages: await load('/src/components/familyImages.ts', 'familyImages'),
    sentenceImages: await load('/src/components/sentenceImages.ts', 'sentenceImages'),
    outdoorIcons: await load('/src/components/outdoorIcons.ts', 'outdoorIcons'),
    pastContinuousImages: await load('/src/components/pastContinuousImages.ts', 'pastContinuousImages'),
    bodyPartsImages: await load('/src/components/bodyPartsImages.ts', 'bodyPartsImages'),
    repasoImages: await load('/src/components/repasoImages.ts', 'repasoImages'),
  }
  const vocabImageSrc = await load('/src/components/vocabImages.ts', 'vocabImageSrc')
  // Fotos con botón "📢 ESCUCHA" que dice la respuesta (LISTENABLE_IMAGES).
  const listenable = [
    questionImageMaps.schoolImages,
    questionImageMaps.bodyPartsImages,
    questionImageMaps.familyImages,
  ]

  const issues = []
  const add = (level, where, msg) => issues.push({ level, where, msg })
  const norm = (s) => String(s ?? '').trim().toLowerCase()
  // ¿`needle` aparece como palabra/frase entera dentro de `hay`?
  const containsWord = (hay, needle) => {
    const n = norm(needle)
    if (n.length < 3) return false
    const esc = n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`(^|[^\\p{L}\\p{N}])${esc}($|[^\\p{L}\\p{N}])`, 'u').test(norm(hay))
  }
  const match = (path) =>
    filters.length === 0 ||
    filters.some((f) => f.every((part, i) => part === path[i]))

  let practicesSeen = 0
  let questionsSeen = 0

  for (const grade of GRADES) {
    const practiceIds = new Map()
    for (const subject of grade.subjects) {
      for (const term of subject.terms) {
        for (const practice of term.practices) {
          const path = [grade.id, subject.id, term.id, practice.id]
          // El progreso y los votos se guardan por (grado, práctica): dos
          // prácticas DISTINTAS con el mismo id en el mismo grado se pisan el
          // progreso. (La MISMA práctica reusada en dos períodos —ej: la de
          // Unit 6 repetida en Final Exams— comparte el progreso a propósito.)
          const prev = practiceIds.get(practice.id)
          if (prev && prev.practice !== practice && match(path)) {
            add('ERROR', path.join('/'), `id de práctica repetido en el grado (también en ${prev.where}): se mezcla el progreso guardado`)
          }
          if (!prev) practiceIds.set(practice.id, { practice, where: path.join('/') })
          if (!match(path)) continue
          practicesSeen++
          checkPractice(practice, path.join('/'))
        }
      }
    }
  }

  function checkPractice(practice, where) {
    if (!practice.questions?.length) add('ERROR', where, 'la práctica no tiene preguntas')
    if (!practice.title?.trim()) add('ERROR', where, 'falta el título')
    if (!practice.description?.trim()) add('AVISO', where, 'falta la descripción')

    const ids = new Set()
    // Para ver si la correcta cae siempre en el mismo lugar (con keepOrder,
    // o con opciones que se barajan pero son siempre las mismas dos).
    const fixedPositions = []
    for (const q of practice.questions ?? []) {
      questionsSeen++
      const qw = `${where} › ${q.id}`
      if (ids.has(q.id)) add('ERROR', qw, 'id de pregunta repetido en la práctica')
      ids.add(q.id)
      if (!q.prompt?.trim() && q.kind !== 'secret-code') add('ERROR', qw, 'consigna vacía')
      if (q.image && !Object.values(questionImageMaps).some((m) => m[q.image])) {
        add('ERROR', qw, `la imagen '${q.image}' no está en ningún mapa: no se va a ver`)
      }
      if (q.hint && hasAnswer(q) && answersOf(q).some((a) => containsWord(q.hint, a))) {
        add('AVISO', qw, 'la pista contiene la respuesta')
      }
      checkKind(q, qw, fixedPositions)
    }

    if (fixedPositions.length >= 4) {
      const counts = {}
      for (const p of fixedPositions) counts[p] = (counts[p] ?? 0) + 1
      const [pos, n] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
      if (n / fixedPositions.length >= 0.8) {
        add('AVISO', where, `con orden fijo, la correcta está en la posición ${Number(pos) + 1} en ${n} de ${fixedPositions.length} preguntas: se puede adivinar el patrón`)
      }
    }
  }

  function hasAnswer(q) {
    return answersOf(q).length > 0
  }
  function answersOf(q) {
    if (q.options) return q.options.filter((o) => o.correct).map((o) => o.text)
    if (q.answer) return [q.answer]
    return []
  }

  function checkOptions(q, qw, { exactlyOne }) {
    const opts = q.options ?? []
    if (opts.length < 2) add('ERROR', qw, 'tiene menos de 2 opciones')
    const correct = opts.filter((o) => o.correct)
    if (correct.length === 0) add('ERROR', qw, 'ninguna opción está marcada como correcta')
    if (exactlyOne && correct.length > 1) add('AVISO', qw, `${correct.length} opciones marcadas como correctas (¿es a propósito?)`)
    const seen = new Set()
    for (const o of opts) {
      // Mayúsculas y puntuación cuentan: en los de puntuación ("one day" vs
      // "One day") justamente esa es la diferencia entre opciones.
      const key = String(o.text ?? '').trim() + (o.emoji ?? '')
      if (seen.has(key)) add('ERROR', qw, `opción repetida: "${o.text}"`)
      seen.add(key)
      if (!String(o.text ?? '').trim() && !o.emoji) add('ERROR', qw, 'opción vacía')
    }
    // Pistas que regalan la respuesta.
    for (const c of correct) {
      const others = opts.filter((o) => !o.correct)
      // Si la palabra también está en una incorrecta, no delata nada.
      const giveaway = (text) =>
        containsWord(text, c.text) && !others.some((o) => containsWord(text, o.text))
      if (giveaway(q.prompt)) add('AVISO', qw, `la consigna contiene la respuesta correcta ("${c.text}")`)
      if (q.blank && giveaway(q.blank.replace('___', ' '))) add('AVISO', qw, `la oración del hueco ya contiene la respuesta ("${c.text}")`)
      if (q.emoji && giveaway(q.emoji)) add('AVISO', qw, 'el emoji/texto de apoyo contiene la respuesta')
      if (q.explanation && others.length) {
        // La explicación se ve DESPUÉS de responder: no es pista, no se revisa.
      }
      // La correcta mucho más larga que todas las demás (se elige "la larga").
      const lens = others.map((o) => String(o.text).length)
      if (correct.length === 1 && others.length >= 2 && String(c.text).length > 1.6 * Math.max(...lens) && String(c.text).length >= 25 && !q.keepOrder) {
        add('AVISO', qw, 'la correcta es mucho más larga que las demás: se adivina por el largo')
      }
    }
    // Botón "📢 ESCUCHA" que dice la respuesta.
    const listenText = q.listen
      ? q.listen
      : q.image && listenable.some((m) => m[q.image]) && (q.kind == null || q.kind === 'choice') && correct.length === 1
        ? correct[0].text
        : null
    if (listenText && correct.some((c) => norm(c.text) === norm(listenText))) {
      add('AVISO', qw, `el botón 📢 ESCUCHA dice la respuesta ("${listenText}"): ¿es ayuda buscada (1er grado) o regala la pregunta?`)
    }
  }

  function checkKind(q, qw, fixedPositions) {
    const kind = q.kind ?? 'choice'
    switch (kind) {
      case 'choice':
      case 'tap':
      case 'listen-tap': {
        checkOptions(q, qw, { exactlyOne: true })
        if (q.blank !== undefined) {
          const n = q.blank.split('___').length - 1
          if (n !== 1) add('ERROR', qw, `la oración del hueco tiene ${n} huecos "___" (tiene que tener 1)`)
        }
        const opts = q.options ?? []
        const ci = opts.findIndex((o) => o.correct)
        if (ci >= 0 && (q.keepOrder || kind === 'listen-tap')) fixedPositions.push(ci)
        break
      }
      case 'reveal':
        checkOptions(q, qw, { exactlyOne: false })
        for (const o of q.options ?? []) {
          if (!o.why?.trim()) add('ERROR', qw, `la opción "${o.text}" no tiene explicación (why)`)
        }
        break
      case 'drag': {
        const segs = q.segments ?? []
        const blanks = q.blanks ?? []
        // DragCloze pone un hueco DESPUÉS de cada trozo mientras queden
        // blanks: valen segments.length - 1 huecos (texto al final) o
        // segments.length (las de armar la palabra letra por letra).
        if (blanks.length !== segs.length - 1 && blanks.length !== segs.length) {
          add('ERROR', qw, `hay ${segs.length} trozos de texto y ${blanks.length} respuestas en blanks (tienen que ser ${segs.length - 1} o ${segs.length})`)
        }
        const bank = [...(q.bank ?? [])]
        for (const b of blanks) {
          const i = bank.findIndex((x) => x === b)
          if (i < 0) add('ERROR', qw, `la respuesta "${b}" no está en el banco de fichas (o hay menos copias que huecos)`)
          else bank.splice(i, 1)
        }
        segs.forEach((s, i) => {
          if (i < blanks.length && containsWord(s, blanks[i]) && bank.length === 0) {
            add('AVISO', qw, `el texto junto al hueco ${i + 1} ya contiene "${blanks[i]}"`)
          }
        })
        break
      }
      case 'classify': {
        const cats = new Set(q.categories ?? [])
        if (cats.size < 2) add('ERROR', qw, 'necesita al menos 2 categorías')
        for (const it of q.items ?? []) {
          if (!cats.has(it.category)) add('ERROR', qw, `"${it.text}" va a la categoría "${it.category}", que no existe`)
        }
        const texts = (q.items ?? []).map((i) => norm(i.text))
        if (new Set(texts).size !== texts.length) add('ERROR', qw, 'hay fichas repetidas para clasificar')
        break
      }
      case 'label': {
        if (!questionImageMaps.bodyPartsImages[q.labelImage ?? '']) add('ERROR', qw, `labelImage '${q.labelImage}' no existe`)
        const bank = new Set(q.bank ?? [])
        for (const h of q.hotspots ?? []) {
          if (!bank.has(h.label)) add('ERROR', qw, `el casillero "${h.label}" no tiene su palabra en el banco`)
          if (h.x < 0 || h.x > 100 || h.y < 0 || h.y > 100 || h.at < 0 || h.at > 100) add('ERROR', qw, `"${h.label}": coordenadas fuera de 0–100`)
        }
        break
      }
      case 'sentence':
        for (const [i, c] of (q.columns ?? []).entries()) {
          if (!c.options.includes(c.answer)) add('ERROR', qw, `columna ${i + 1}: la respuesta "${c.answer}" no está entre sus opciones`)
          if (new Set(c.options).size !== c.options.length) add('ERROR', qw, `columna ${i + 1}: opciones repetidas`)
        }
        break
      case 'verses': {
        const n = (q.verses ?? []).length
        const r = q.rhyme ?? []
        if (r.length < 2) add('ERROR', qw, 'rhyme tiene que marcar al menos 2 versos')
        if (r.some((i) => i < 0 || i >= n)) add('ERROR', qw, 'rhyme tiene índices fuera de los versos')
        break
      }
      case 'words': {
        const n = (q.words ?? []).length
        const p = q.pick ?? []
        if (!p.length) add('ERROR', qw, 'pick está vacío')
        if (p.some((i) => i < 0 || i >= n)) add('ERROR', qw, 'pick tiene índices fuera de las palabras')
        break
      }
      case 'analyze':
        if ((q.labels ?? []).length !== (q.words ?? []).length) {
          add('ERROR', qw, `hay ${(q.words ?? []).length} palabras y ${(q.labels ?? []).length} cartelitos`)
        }
        break
      case 'acrostic':
        for (const row of q.rows ?? []) {
          if (row.given < 0 || row.given >= row.answer.length) add('ERROR', qw, `"${row.answer}": la letra dada (${row.given}) está fuera de la palabra`)
          if (row.answer !== row.answer.toUpperCase()) add('AVISO', qw, `"${row.answer}" no está en MAYÚSCULAS`)
          if (containsWord(row.clue, row.answer)) add('AVISO', qw, `la consigna "${row.clue}" contiene la respuesta`)
        }
        break
      case 'match':
      case 'memory': {
        const pairs = q.pairs ?? []
        if (pairs.length < 2) add('ERROR', qw, 'necesita al menos 2 pares')
        for (const p of pairs) {
          if (!vocabImageSrc(p.image)) add('ERROR', qw, `la imagen '${p.image}' no está en los mapas de vocabulario`)
        }
        const imgs = pairs.map((p) => p.image)
        const words = pairs.map((p) => norm(p.word))
        if (new Set(imgs).size !== imgs.length) add('ERROR', qw, 'hay imágenes repetidas')
        if (new Set(words).size !== words.length) add('ERROR', qw, 'hay palabras repetidas: dos imágenes tendrían la misma respuesta')
        break
      }
      case 'speak':
        if (!q.answer?.trim()) add('ERROR', qw, 'falta answer (lo que tiene que decir)')
        if (containsWord(q.prompt, q.answer)) add('AVISO', qw, 'la consigna contiene lo que tiene que decir')
        break
      case 'secret-code':
        if (!q.secretText?.trim()) add('ERROR', qw, 'falta secretText')
        break
      default:
        add('ERROR', qw, `kind desconocido: '${kind}'`)
    }
  }

  const errors = issues.filter((i) => i.level === 'ERROR')
  const warnings = issues.filter((i) => i.level === 'AVISO')
  console.log(`Revisadas ${practicesSeen} prácticas y ${questionsSeen} preguntas${filters.length ? ` (filtro: ${process.argv.slice(2).join(' ')})` : ''}.`)
  for (const i of [...errors, ...warnings]) console.log(`${i.level === 'ERROR' ? '❌' : '⚠️ '} ${i.where}: ${i.msg}`)
  console.log(`\n${errors.length} errores, ${warnings.length} avisos.`)
  if (practicesSeen === 0) {
    console.log('Ninguna práctica coincide con el filtro (grado/materia/período/práctica).')
    exitCode = 1
  }
  if (errors.length) exitCode = 1
} finally {
  await server.close()
}
process.exit(exitCode)
