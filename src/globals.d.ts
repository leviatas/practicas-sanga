/// <reference types="vite/client" />

// Versión de la app inyectada por Vite desde package.json (ver vite.config.ts).
declare const __APP_VERSION__: string

// Importar imágenes como URL (Vite las procesa y devuelve la ruta final).
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}

// ---- Web Speech API: reconocimiento de voz (para ejercicios 'speak') ----
// Tipos mínimos. No están en el lib estándar de TS, así que los declaramos.
interface SpeechRecognitionAlternative {
  readonly transcript: string
  readonly confidence: number
}
interface SpeechRecognitionResult {
  readonly length: number
  readonly isFinal: boolean
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
}
interface SpeechRecognitionResultList {
  readonly length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number
  readonly results: SpeechRecognitionResultList
}
interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string
  readonly message: string
}
interface SpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
}
declare var SpeechRecognition: { new (): SpeechRecognition } | undefined
interface Window {
  SpeechRecognition?: { new (): SpeechRecognition }
  webkitSpeechRecognition?: { new (): SpeechRecognition }
}
