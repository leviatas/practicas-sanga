// Dibujos del repaso de English de 1er grado. Son RECORTES de las fichas que
// pasó la seño (They are / It is / Can / Body parts / Animals), no dibujos
// nuevos: así el chico ve exactamente lo mismo que en la fotocopia.
//
// La clave es el nombre del archivo sin extensión (ej: 'they-horses',
// 'can-dog-swim', 'bp-ears', 'an-cat'). Los prefijos evitan chocar con las
// claves de los otros mapas ('eye', 'nose'... de bodyPartsImages).
const files = import.meta.glob('../assets/repaso-english/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export const repasoImages: Record<string, string> = Object.fromEntries(
  Object.entries(files).map(([path, src]) => [
    path.slice(path.lastIndexOf('/') + 1).replace(/\.jpg$/, ''),
    src,
  ]),
)
