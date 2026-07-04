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
