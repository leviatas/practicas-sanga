// Dibujos de los simulacros de 4to (Alto en el camino III) de Prácticas del
// Lenguaje y Matemática, recortados de las fotocopias. A los recuadros vacíos
// (la noticia y las partes de la circunferencia) se les agregó un número en
// rojo, así la consigna puede decir «el recuadro 1 es…».
import noticiaMerendero from '../assets/pdl/noticia-merendero.jpg'
import circuloPartes from '../assets/matematica/circulo-partes.jpg'
import circuloAO from '../assets/matematica/circulo-a-o.jpg'
import angulos from '../assets/matematica/angulos.jpg'
import transportador125 from '../assets/matematica/transportador-125.jpg'

// Mapa nombre → imagen. El nombre se usa en el campo `image` de cada pregunta.
export const simulacroImages: Record<string, string> = {
  'pdl-noticia-merendero': noticiaMerendero,
  'mate-circulo-partes': circuloPartes,
  'mate-circulo-a-o': circuloAO,
  'mate-angulos': angulos,
  'mate-transportador-125': transportador125,
}
