// ============================================================================
// Voz de los minijuegos (Web Speech API) — sistema centralizado.
//
// Pensado para chicos de 1er grado que todavía no leen de corrido: TODO lo que
// aparece escrito (consignas, pistas, explicaciones, felicitaciones) se puede
// escuchar. Por eso:
//  · Elige la mejor voz en castellano disponible, priorizando la argentina
//    (es-AR), después la latinoamericana (es-419, es-US, es-MX...) y por
//    último cualquier español.
//  · Habla pausado (rate 0.85) y con un tono apenas más alto, más cálido.
//  · Convierte los signos de las cuentas en palabras («7 + 3 = 10» →
//    «7 más 3 es igual a 10», «$30» → «30 pesos») y saca los emojis, así los
//    problemas generados al azar se leen bien sin escribir el texto dos veces.
//  · Una sola cola: cada `say` corta lo que se estaba diciendo, así no se
//    pisan las voces al tocar rápido.
// Si el navegador no tiene voz, no pasa nada: el texto sigue escrito.
// ============================================================================

let cachedVoice: SpeechSynthesisVoice | null | undefined

const PREFERRED = ['es-ar', 'es-419', 'es-us', 'es-mx', 'es-uy', 'es-cl', 'es-co', 'es-es']

function pickVoice(): SpeechSynthesisVoice | null {
  const synth = window.speechSynthesis
  const voices = synth.getVoices()
  if (!voices.length) return null
  const norm = (v: SpeechSynthesisVoice) => (v.lang ?? '').toLowerCase().replace('_', '-')
  for (const lang of PREFERRED) {
    const matches = voices.filter((v) => norm(v) === lang)
    if (matches.length) {
      // Dentro del idioma, preferimos voces "naturales"/de Google, que suenan
      // menos robóticas, y las femeninas conocidas (más cálidas para chicos).
      const nice = matches.find((v) => /natural|google|paulina|sabina|helena|elena|monica/i.test(v.name))
      return nice ?? matches[0]
    }
  }
  return voices.find((v) => norm(v).startsWith('es')) ?? null
}

function voice(): SpeechSynthesisVoice | null {
  if (cachedVoice === undefined || cachedVoice === null) {
    cachedVoice = pickVoice()
  }
  return cachedVoice
}

// Las voces cargan de forma asíncrona en Chrome: se recalcula cuando llegan.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      cachedVoice = pickVoice()
    })
  } catch {
    // Safari viejo: sin evento, se elige en el primer uso.
  }
}

/** Pasa una cuenta o un texto con signos a como se dice en voz alta. */
export function toSpeech(text: string): string {
  return text
    .replace(/[\p{Extended_Pictographic}️‍]/gu, '')
    .replace(/\$\s?(\d+)/g, '$1 pesos')
    .replace(/\s*\+\s*/g, ' más ')
    .replace(/(\d)\s*[−–]\s*(?=\d)/g, '$1 menos ')
    .replace(/\s*=\s*/g, ' es igual a ')
    // El casillero vacío de una cuenta («7 + □ = 10») se lee «cuánto».
    .replace(/□/g, ' cuánto ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function voiceAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/**
 * Dice un texto (o varios, uno detrás del otro). Corta lo anterior.
 * `onEnd` se llama al terminar el último (o enseguida si no hay voz).
 */
export function say(text: string | string[], onEnd?: () => void): void {
  const parts = (Array.isArray(text) ? text : [text]).map(toSpeech).filter(Boolean)
  if (!voiceAvailable() || parts.length === 0) {
    onEnd?.()
    return
  }
  try {
    const synth = window.speechSynthesis
    synth.cancel()
    // Chrome a veces queda "pausado" después de cancel en mobile.
    synth.resume()
    const v = voice()
    parts.forEach((part, i) => {
      const u = new SpeechSynthesisUtterance(part)
      u.lang = v?.lang ?? 'es-AR'
      if (v) u.voice = v
      u.rate = 0.85
      u.pitch = 1.08
      if (i === parts.length - 1 && onEnd) {
        u.onend = () => onEnd()
        u.onerror = () => onEnd()
      }
      synth.speak(u)
    })
  } catch {
    onEnd?.()
  }
}

/** Corta la voz (al salir de un juego, por ejemplo). */
export function hush(): void {
  try {
    if (voiceAvailable()) window.speechSynthesis.cancel()
  } catch {
    // nada
  }
}

// Felicitaciones con voseo, para no repetir siempre la misma.
const PRAISES = [
  '¡Muy bien',
  '¡Excelente',
  '¡Genial',
  '¡Bárbaro',
  '¡Buenísimo',
  '¡Así se hace',
  '¡Lo lograste',
  '¡Qué bien que pensaste',
]

export function praise(name = ''): string {
  const p = PRAISES[Math.floor(Math.random() * PRAISES.length)]
  return name ? `${p}, ${name}!` : `${p}!`
}

// Ánimo al equivocarse: nunca reta, invita a probar otra vez.
const RETRY = [
  'Casi. Probá otra vez.',
  'Mmm, no es ese. ¡Intentá de nuevo!',
  'Todavía no. Pensalo con calma y probá otra vez.',
]

export function retry(): string {
  return RETRY[Math.floor(Math.random() * RETRY.length)]
}
