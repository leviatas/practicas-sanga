// Dibujos del simulacro de Ciencias Sociales de 4to (Alto en el camino III).
// Se recortaron de la fotocopia tal como aparecen en la hoja, SIN los títulos
// de las ilustraciones originales («Los pueblos nómades…»), que revelaban la
// respuesta.
import sedentarios from '../assets/sociales/sedentarios.jpg'
import nomades from '../assets/sociales/nomades.jpg'
import terrazas from '../assets/sociales/terrazas.jpg'
import chinampas from '../assets/sociales/chinampas.jpg'
import roza from '../assets/sociales/roza.jpg'
import mapaMesoamericaAndes from '../assets/sociales/mapa-mesoamerica-andes.jpg'

// Mapa nombre → imagen. El nombre se usa en el campo `image` de cada pregunta.
export const socialesImages: Record<string, string> = {
  'sociales-sedentarios': sedentarios,
  'sociales-nomades': nomades,
  'sociales-terrazas': terrazas,
  'sociales-chinampas': chinampas,
  'sociales-roza': roza,
  'sociales-mapa': mapaMesoamericaAndes,
}
