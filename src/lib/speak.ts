// ============================================================================
// Leer un texto en voz alta (Web Speech API). Quita emojis para que la voz no
// diga "sol con rayos" y demás. `lang` elige el idioma: castellano por defecto.
// ============================================================================

export function speak(text: string, lang = 'es-AR'): void {
  try {
    const synth = window.speechSynthesis
    if (!synth) return
    const clean = text
      .replace(/[\p{Extended_Pictographic}️‍]/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
    if (!clean) return
    synth.cancel()
    const u = new SpeechSynthesisUtterance(clean)
    u.lang = lang
    u.rate = 0.9
    // Algunos navegadores ignoran `lang` si no se les da una voz de ese idioma.
    const base = lang.slice(0, 2).toLowerCase()
    const voice = synth
      .getVoices()
      .find((v) => v.lang?.toLowerCase().replace('_', '-').startsWith(base))
    if (voice) u.voice = voice
    synth.speak(u)
  } catch {
    // Sin soporte de voz: no rompemos nada.
  }
}
