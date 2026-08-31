import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Prácticas del Lenguaje (PDL)
// 2do Trimestre → cinco prácticas:
//
// 1) La poesía y las imágenes sensoriales
// 2) Los artículos y los adjetivos — La construcción sustantiva
// 3) El diccionario y la enciclopedia
// 4) Clasificación semántica de los adjetivos
// 5) Separación en sílabas y reglas de tildación
//
// Formatos usados: choice, drag, classify, reveal.
// Consignas y explicaciones en castellano.
// ============================================================================

export const grade4PdlPractices: Practice[] = [
  // ========================= 1. POESÍA E IMÁGENES SENSORIALES ==============
  {
    id: 'poesia-imagenes-sensoriales',
    title: 'La poesía y las imágenes sensoriales',
    description:
      'Identificá y clasificá imágenes sensoriales en fragmentos poéticos: visuales, auditivas, olfativas, gustativas y táctiles.',
    emoji: '📜',
    questions: [
      // --- Identificar el tipo de imagen sensorial (choice) ---
      {
        id: 'is1',
        prompt:
          '«El cielo se tiñó de rojo y naranja al atardecer.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Visual', correct: true },
          { text: 'Auditiva' },
          { text: 'Táctil' },
        ],
        explanation:
          'Es una imagen visual porque describe colores que percibimos con la vista.',
      },
      {
        id: 'is2',
        prompt:
          '«El murmullo del arroyo acompañaba la tarde.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Auditiva', correct: true },
          { text: 'Gustativa' },
          { text: 'Olfativa' },
        ],
        explanation:
          'Es una imagen auditiva porque "murmullo" es un sonido que percibimos con el oído.',
      },
      {
        id: 'is3',
        prompt:
          '«Un perfume a jazmines inundó el jardín.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Olfativa', correct: true },
          { text: 'Visual' },
          { text: 'Táctil' },
        ],
        explanation:
          'Es una imagen olfativa porque describe un aroma que percibimos con el olfato.',
      },
      {
        id: 'is4',
        prompt:
          '«La frazada suave y tibia me cubría.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Táctil', correct: true },
          { text: 'Visual' },
          { text: 'Auditiva' },
        ],
        explanation:
          'Es una imagen táctil porque "suave" y "tibia" se perciben con el tacto.',
      },
      {
        id: 'is5',
        prompt:
          '«Probé la miel dorada y dulce del panal.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Gustativa', correct: true },
          { text: 'Olfativa' },
          { text: 'Visual' },
        ],
        explanation:
          'Es una imagen gustativa porque "dulce" es un sabor que percibimos con el gusto.',
      },
      {
        id: 'is6',
        prompt:
          '«Las campanas resonaban en todo el pueblo.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Auditiva', correct: true },
          { text: 'Táctil' },
          { text: 'Gustativa' },
        ],
        explanation:
          'Es una imagen auditiva porque "resonaban" refiere a un sonido.',
      },
      {
        id: 'is7',
        prompt:
          '«El aroma a pan recién horneado salía por la ventana.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Olfativa', correct: true },
          { text: 'Gustativa' },
          { text: 'Auditiva' },
        ],
        explanation:
          'Es una imagen olfativa porque "aroma" se percibe con el olfato.',
      },
      {
        id: 'is8',
        prompt:
          '«Las estrellas brillaban como diamantes sobre el mar oscuro.» ¿Qué tipo de imagen sensorial es?',
        options: [
          { text: 'Visual', correct: true },
          { text: 'Auditiva' },
          { text: 'Olfativa' },
        ],
        explanation:
          'Es una imagen visual porque describe lo que vemos: el brillo de las estrellas.',
      },
      // --- Clasificar imágenes sensoriales (classify) ---
      {
        id: 'is-clas1',
        kind: 'classify',
        prompt:
          'Arrastrá cada expresión a la categoría de imagen sensorial que le corresponde.',
        categories: ['Visual', 'Auditiva', 'Táctil'],
        items: [
          { text: 'cielo azul', category: 'Visual' },
          { text: 'canto del gallo', category: 'Auditiva' },
          { text: 'arena caliente', category: 'Táctil' },
          { text: 'hojas doradas', category: 'Visual' },
          { text: 'trueno lejano', category: 'Auditiva' },
          { text: 'brisa helada', category: 'Táctil' },
        ],
      },
      {
        id: 'is-clas2',
        kind: 'classify',
        prompt:
          'Clasificá cada expresión según el sentido al que apela.',
        categories: ['Olfativa', 'Gustativa'],
        items: [
          { text: 'olor a tierra mojada', category: 'Olfativa' },
          { text: 'sabor amargo', category: 'Gustativa' },
          { text: 'perfume de rosas', category: 'Olfativa' },
          { text: 'limonada ácida', category: 'Gustativa' },
          { text: 'aroma a café', category: 'Olfativa' },
          { text: 'chocolate dulce', category: 'Gustativa' },
        ],
      },
      // --- Completar versos (drag) ---
      {
        id: 'is-drag1',
        kind: 'drag',
        prompt:
          'Completá el verso con la imagen sensorial correcta.',
        segments: ['El viento ', ' me acariciaba la cara.'],
        blanks: ['helado'],
        bank: ['helado', 'azul', 'amargo'],
        explanation:
          '«Helado» es una imagen táctil que completa el sentido del verso.',
      },
      {
        id: 'is-drag2',
        kind: 'drag',
        prompt: 'Completá el verso con las palabras correctas.',
        segments: ['El ', ' de los pájaros llenaba el ', '.'],
        blanks: ['canto', 'bosque'],
        bank: ['canto', 'bosque', 'sabor', 'color'],
        explanation:
          '«El canto de los pájaros llenaba el bosque» usa una imagen auditiva.',
      },
      // --- Poesía: verso y estrofa (choice) ---
      {
        id: 'po1',
        prompt: '¿Cómo se llama cada línea de un poema?',
        options: [
          { text: 'Verso', correct: true },
          { text: 'Estrofa' },
          { text: 'Párrafo' },
        ],
        explanation:
          'Cada línea de un poema se llama verso. Un grupo de versos forma una estrofa.',
      },
      {
        id: 'po2',
        prompt: '¿Cómo se llama el conjunto de versos agrupados en un poema?',
        options: [
          { text: 'Estrofa', correct: true },
          { text: 'Capítulo' },
          { text: 'Oración' },
        ],
        explanation:
          'Un conjunto de versos agrupados en un poema se llama estrofa.',
      },
      {
        id: 'po3',
        prompt: '¿Cuántos sentidos usa la poesía para crear imágenes sensoriales?',
        options: [
          { text: 'Cinco (vista, oído, olfato, gusto, tacto)', correct: true },
          { text: 'Tres (vista, oído, tacto)' },
          { text: 'Dos (vista y oído)' },
        ],
        explanation:
          'Las imágenes sensoriales pueden apelar a los cinco sentidos: vista, oído, olfato, gusto y tacto.',
      },
      {
        id: 'po4',
        prompt: '¿Qué es la rima en un poema?',
        options: [
          {
            text: 'La repetición de sonidos al final de los versos',
            correct: true,
          },
          { text: 'La cantidad de versos de una estrofa' },
          { text: 'El tema del poema' },
        ],
        explanation:
          'La rima es la coincidencia de sonidos al final de dos o más versos.',
      },
    ],
  },

  // ========================= 2. ARTÍCULOS, ADJETIVOS Y CONSTRUCCIÓN SUSTANTIVA
  {
    id: 'articulos-adjetivos-construccion',
    title: 'Los artículos y los adjetivos — La construcción sustantiva',
    description:
      'Identificá artículos y adjetivos, armá construcciones sustantivas y trabajá la concordancia.',
    emoji: '📝',
    questions: [
      // --- Identificar artículos (choice) ---
      {
        id: 'aa1',
        prompt:
          'En la oración «La niña corrió por el parque», ¿cuáles son los artículos?',
        options: [
          { text: '«La» y «el»', correct: true },
          { text: '«niña» y «parque»' },
          { text: '«corrió» y «por»' },
        ],
        explanation:
          '«La» y «el» son artículos definidos que acompañan a los sustantivos.',
      },
      {
        id: 'aa2',
        prompt: '¿Cuál de los siguientes es un artículo indefinido?',
        options: [
          { text: 'Un', correct: true },
          { text: 'El' },
          { text: 'Los' },
        ],
        explanation:
          '«Un» es un artículo indefinido. «El» y «Los» son artículos definidos.',
      },
      {
        id: 'aa3',
        prompt:
          'En «Unas mariposas volaban sobre las flores», ¿cuáles son los artículos?',
        options: [
          { text: '«Unas» y «las»', correct: true },
          { text: '«mariposas» y «flores»' },
          { text: '«volaban» y «sobre»' },
        ],
        explanation:
          '«Unas» es artículo indefinido plural y «las» es artículo definido plural.',
      },
      // --- Clasificar artículos (classify) ---
      {
        id: 'aa-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada artículo como definido o indefinido.',
        categories: ['Definido', 'Indefinido'],
        items: [
          { text: 'el', category: 'Definido' },
          { text: 'un', category: 'Indefinido' },
          { text: 'la', category: 'Definido' },
          { text: 'una', category: 'Indefinido' },
          { text: 'los', category: 'Definido' },
          { text: 'unas', category: 'Indefinido' },
          { text: 'las', category: 'Definido' },
          { text: 'unos', category: 'Indefinido' },
        ],
      },
      // --- Identificar adjetivos (choice) ---
      {
        id: 'aa4',
        prompt:
          'En «El gato negro dormía en la silla vieja», ¿cuáles son los adjetivos?',
        options: [
          { text: '«negro» y «vieja»', correct: true },
          { text: '«gato» y «silla»' },
          { text: '«El» y «la»' },
        ],
        explanation:
          '«Negro» y «vieja» son adjetivos: modifican a los sustantivos «gato» y «silla».',
      },
      {
        id: 'aa5',
        prompt:
          'En «Compré tres libros nuevos», ¿cuál es el adjetivo calificativo?',
        options: [
          { text: '«nuevos»', correct: true },
          { text: '«tres»' },
          { text: '«libros»' },
        ],
        explanation:
          '«Nuevos» es un adjetivo calificativo. «Tres» es un adjetivo numeral.',
      },
      // --- Concordancia de género y número (choice) ---
      {
        id: 'aa6',
        prompt:
          'Completá: «Las flores ______ perfumaban el jardín.» ¿Qué adjetivo concuerda?',
        options: [
          { text: 'blancas', correct: true },
          { text: 'blancos' },
          { text: 'blanco' },
        ],
        explanation:
          '«Las flores» es femenino plural, así que el adjetivo debe ser «blancas».',
      },
      {
        id: 'aa7',
        prompt:
          'Completá: «El perro ______ ladró fuerte.» ¿Qué adjetivo concuerda?',
        options: [
          { text: 'furioso', correct: true },
          { text: 'furiosa' },
          { text: 'furiosos' },
        ],
        explanation:
          '«El perro» es masculino singular, así que el adjetivo debe ser «furioso».',
      },
      {
        id: 'aa8',
        prompt:
          'Completá: «Los árboles ______ perdían sus hojas.» ¿Qué adjetivo concuerda?',
        options: [
          { text: 'altos', correct: true },
          { text: 'alta' },
          { text: 'alto' },
        ],
        explanation:
          '«Los árboles» es masculino plural, así que el adjetivo debe ser «altos».',
      },
      // --- Construcción sustantiva: armar arrastrando (drag) ---
      {
        id: 'aa-drag1',
        kind: 'drag',
        prompt:
          'Armá la construcción sustantiva correcta: artículo + sustantivo + adjetivo.',
        segments: ['', ' casa ', ''],
        blanks: ['La', 'grande'],
        bank: ['grande', 'La', 'corre', 'pero'],
        explanation:
          'La construcción sustantiva es «La casa grande»: artículo + sustantivo + adjetivo.',
      },
      {
        id: 'aa-drag2',
        kind: 'drag',
        prompt:
          'Armá la construcción sustantiva: artículo + adjetivo + sustantivo.',
        segments: ['', ' ', ' día'],
        blanks: ['Un', 'hermoso'],
        bank: ['hermoso', 'Un', 'corrió', 'pero'],
        explanation:
          'La construcción sustantiva es «Un hermoso día»: artículo + adjetivo + sustantivo.',
      },
      {
        id: 'aa-drag3',
        kind: 'drag',
        prompt:
          'Completá la construcción sustantiva: «____ gatitos ____ jugaban en el patio».',
        segments: ['', ' gatitos ', ' jugaban en el patio'],
        blanks: ['Los', 'pequeños'],
        bank: ['pequeños', 'Los', 'rápido', 'ella'],
        explanation:
          '«Los gatitos pequeños» es la construcción sustantiva: artículo + sustantivo + adjetivo.',
      },
      // --- Clasificar palabras (classify) ---
      {
        id: 'aa-clas2',
        kind: 'classify',
        prompt:
          'Clasificá cada palabra como artículo, sustantivo o adjetivo.',
        categories: ['Artículo', 'Sustantivo', 'Adjetivo'],
        items: [
          { text: 'el', category: 'Artículo' },
          { text: 'perro', category: 'Sustantivo' },
          { text: 'grande', category: 'Adjetivo' },
          { text: 'una', category: 'Artículo' },
          { text: 'mesa', category: 'Sustantivo' },
          { text: 'roja', category: 'Adjetivo' },
          { text: 'los', category: 'Artículo' },
          { text: 'niños', category: 'Sustantivo' },
          { text: 'alegres', category: 'Adjetivo' },
        ],
      },
      // --- Qué es la construcción sustantiva (choice) ---
      {
        id: 'aa9',
        prompt: '¿Qué es una construcción sustantiva?',
        options: [
          {
            text: 'Un grupo de palabras cuyo núcleo es un sustantivo',
            correct: true,
          },
          { text: 'Un grupo de palabras cuyo núcleo es un verbo' },
          { text: 'Una oración completa con sujeto y predicado' },
        ],
        explanation:
          'La construcción sustantiva es un grupo de palabras organizadas alrededor de un sustantivo (núcleo), que puede ir acompañado por artículos y adjetivos.',
      },
      {
        id: 'aa10',
        prompt:
          'En «Las hermosas flores silvestres», ¿cuál es el núcleo de la construcción sustantiva?',
        options: [
          { text: '«flores»', correct: true },
          { text: '«Las»' },
          { text: '«hermosas»' },
        ],
        explanation:
          'El sustantivo «flores» es el núcleo. «Las» es el artículo y «hermosas» y «silvestres» son adjetivos que lo modifican.',
      },
    ],
  },

  // ========================= 3. EL DICCIONARIO Y LA ENCICLOPEDIA ============
  {
    id: 'diccionario-enciclopedia',
    title: 'El diccionario y la enciclopedia',
    description:
      'Diferenciá cuándo usar el diccionario y cuándo la enciclopedia. Ordená palabras y reconocé las partes de una entrada.',
    emoji: '📖',
    questions: [
      // --- Diferenciar diccionario vs. enciclopedia (reveal) ---
      {
        id: 'de1',
        kind: 'reveal',
        emoji: '🔎',
        prompt:
          'Querés saber qué significa la palabra «efímero». ¿Dónde buscás?',
        hint: 'Pensá: ¿buscás el significado de una palabra o información sobre un tema?',
        options: [
          {
            text: 'En el diccionario',
            correct: true,
            why: '¡Correcto! El diccionario da el significado, la clase de palabra y ejemplos de uso de cada término.',
          },
          {
            text: 'En la enciclopedia',
            why: 'No exactamente. La enciclopedia explica temas en profundidad, pero para el significado de una palabra conviene el diccionario.',
          },
        ],
      },
      {
        id: 'de2',
        kind: 'reveal',
        emoji: '🌋',
        prompt:
          'Querés saber cómo se formó el volcán Lanín y dónde queda. ¿Dónde buscás?',
        hint: 'Pensá: ¿necesitás la definición de una palabra o información detallada sobre un lugar?',
        options: [
          {
            text: 'En la enciclopedia',
            correct: true,
            why: '¡Correcto! La enciclopedia desarrolla temas con información extensa: historia, geografía, ciencia, etc.',
          },
          {
            text: 'En el diccionario',
            why: 'El diccionario te diría qué significa "volcán", pero no te da información específica sobre el Lanín.',
          },
        ],
      },
      {
        id: 'de3',
        kind: 'reveal',
        emoji: '📚',
        prompt:
          'Querés saber si «correr» es un verbo o un sustantivo. ¿Dónde buscás?',
        hint: 'Pensá: ¿necesitás saber la clase de palabra o información sobre un tema?',
        options: [
          {
            text: 'En el diccionario',
            correct: true,
            why: '¡Correcto! El diccionario indica la clase de palabra (verbo, sustantivo, adjetivo, etc.) junto con su definición.',
          },
          {
            text: 'En la enciclopedia',
            why: 'La enciclopedia no se ocupa de clasificar palabras gramaticalmente. Eso lo hace el diccionario.',
          },
        ],
      },
      {
        id: 'de4',
        kind: 'reveal',
        emoji: '🦕',
        prompt:
          'Querés saber en qué período vivieron los dinosaurios y cómo se extinguieron. ¿Dónde buscás?',
        hint: 'Pensá: ¿buscás una definición breve o información extensa sobre un tema?',
        options: [
          {
            text: 'En la enciclopedia',
            correct: true,
            why: '¡Correcto! La enciclopedia tiene artículos extensos con información detallada sobre temas como este.',
          },
          {
            text: 'En el diccionario',
            why: 'El diccionario te diría qué significa "dinosaurio", pero no te cuenta su historia completa.',
          },
        ],
      },
      // --- Orden alfabético (choice) ---
      {
        id: 'de5',
        prompt: '¿Cuál es el orden alfabético correcto de estas palabras?',
        options: [
          { text: 'barco — campo — dulce — frío', correct: true },
          { text: 'campo — barco — dulce — frío' },
          { text: 'dulce — barco — frío — campo' },
        ],
        explanation:
          'En el diccionario las palabras van en orden alfabético: B → C → D → F.',
      },
      {
        id: 'de6',
        prompt: '¿Cuál es el orden alfabético correcto?',
        options: [
          { text: 'gato — globo — gota — grúa', correct: true },
          { text: 'globo — gato — grúa — gota' },
          { text: 'grúa — gota — globo — gato' },
        ],
        explanation:
          'Cuando la primera letra es igual, se ordena por la segunda y tercera: ga → gl → go → gr.',
      },
      {
        id: 'de7',
        prompt: '¿Cuál es el orden alfabético correcto?',
        options: [
          { text: 'abeja — abrigo — aceite — agua', correct: true },
          { text: 'agua — aceite — abrigo — abeja' },
          { text: 'aceite — abeja — agua — abrigo' },
        ],
        explanation:
          'Todas empiezan con «a»: ab-e → ab-r → ac → ag.',
      },
      // --- Partes de una entrada de diccionario (classify) ---
      {
        id: 'de-clas1',
        kind: 'classify',
        prompt:
          '¿Qué información encontrás en un diccionario y cuál en una enciclopedia?',
        categories: ['Diccionario', 'Enciclopedia'],
        items: [
          { text: 'Significado de una palabra', category: 'Diccionario' },
          { text: 'Clase de palabra (sust., verb., adj.)', category: 'Diccionario' },
          { text: 'Historia de un país', category: 'Enciclopedia' },
          { text: 'Biografía de un científico', category: 'Enciclopedia' },
          { text: 'Sinónimos y antónimos', category: 'Diccionario' },
          { text: 'Cómo funciona el sistema solar', category: 'Enciclopedia' },
        ],
      },
      // --- Completar entrada de diccionario (drag) ---
      {
        id: 'de-drag1',
        kind: 'drag',
        prompt:
          'Completá la entrada de diccionario: «feliz. ____. Que siente ____.»',
        segments: ['feliz. ', '. Que siente ', '.'],
        blanks: ['adj', 'alegría'],
        bank: ['adj', 'alegría', 'sust', 'tristeza'],
        explanation:
          '«feliz» es un adjetivo (adj.) y su definición es «Que siente alegría».',
      },
      {
        id: 'de-drag2',
        kind: 'drag',
        prompt:
          'Completá la entrada: «lluvia. ____. Agua que cae de las ____.»',
        segments: ['lluvia. ', '. Agua que cae de las ', '.'],
        blanks: ['sust', 'nubes'],
        bank: ['sust', 'nubes', 'verb', 'hojas'],
        explanation:
          '«lluvia» es un sustantivo (sust.) y la definición correcta menciona las nubes.',
      },
      // --- Qué contiene cada uno (choice) ---
      {
        id: 'de8',
        prompt: '¿En qué orden están organizadas las palabras en el diccionario?',
        options: [
          { text: 'En orden alfabético', correct: true },
          { text: 'Por temas' },
          { text: 'Por cantidad de letras' },
        ],
        explanation:
          'El diccionario organiza las palabras en orden alfabético para poder encontrarlas fácilmente.',
      },
      {
        id: 'de9',
        prompt: '¿Qué información NO encontrás en un diccionario?',
        options: [
          { text: 'La historia completa de un país', correct: true },
          { text: 'El significado de una palabra' },
          { text: 'La clase de palabra' },
        ],
        explanation:
          'La historia de un país es información extensa que va en una enciclopedia, no en un diccionario.',
      },
      {
        id: 'de10',
        prompt: '¿Cómo se buscan las palabras en el diccionario si son verbos conjugados?',
        options: [
          {
            text: 'Se busca el infinitivo del verbo (ej: buscar «correr» en vez de «corrió»)',
            correct: true,
          },
          { text: 'Se busca la palabra tal cual está conjugada' },
          { text: 'Los verbos no están en el diccionario' },
        ],
        explanation:
          'En el diccionario los verbos aparecen en infinitivo (-ar, -er, -ir). Para encontrar «corrió» buscás «correr».',
      },
    ],
  },

  // ========================= 4. CLASIFICACIÓN SEMÁNTICA DE LOS ADJETIVOS ====
  {
    id: 'clasificacion-semantica-adjetivos',
    title: 'Clasificación semántica de los adjetivos',
    description:
      'Clasificá adjetivos en calificativos, numerales, posesivos, demostrativos y gentilicios.',
    emoji: '🏷️',
    questions: [
      // --- Clasificar por tipo (classify) ---
      {
        id: 'csa-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada adjetivo según su tipo.',
        categories: ['Calificativo', 'Numeral', 'Posesivo'],
        items: [
          { text: 'hermoso', category: 'Calificativo' },
          { text: 'tres', category: 'Numeral' },
          { text: 'mi', category: 'Posesivo' },
          { text: 'pequeña', category: 'Calificativo' },
          { text: 'quinto', category: 'Numeral' },
          { text: 'tu', category: 'Posesivo' },
          { text: 'brillante', category: 'Calificativo' },
          { text: 'doce', category: 'Numeral' },
          { text: 'nuestro', category: 'Posesivo' },
        ],
      },
      {
        id: 'csa-clas2',
        kind: 'classify',
        prompt: 'Clasificá cada adjetivo como demostrativo o gentilicio.',
        categories: ['Demostrativo', 'Gentilicio'],
        items: [
          { text: 'este', category: 'Demostrativo' },
          { text: 'argentino', category: 'Gentilicio' },
          { text: 'esa', category: 'Demostrativo' },
          { text: 'brasileña', category: 'Gentilicio' },
          { text: 'aquel', category: 'Demostrativo' },
          { text: 'cordobés', category: 'Gentilicio' },
        ],
      },
      // --- Identificar el tipo (choice / reveal) ---
      {
        id: 'csa1',
        kind: 'reveal',
        emoji: '🔍',
        prompt:
          'En la oración «Mi hermana tiene dos gatos negros», ¿qué tipo de adjetivo es «mi»?',
        options: [
          {
            text: 'Posesivo',
            correct: true,
            why: '¡Correcto! «Mi» indica posesión: a quién pertenece la hermana.',
          },
          {
            text: 'Calificativo',
            why: 'Incorrecto. Un calificativo describe una cualidad (como «negros»), no indica posesión.',
          },
          {
            text: 'Demostrativo',
            why: 'Incorrecto. Un demostrativo señala distancia (este, ese, aquel), no posesión.',
          },
        ],
      },
      {
        id: 'csa2',
        kind: 'reveal',
        emoji: '🔢',
        prompt:
          'En «Compré cinco manzanas rojas», ¿qué tipo de adjetivo es «cinco»?',
        options: [
          {
            text: 'Numeral',
            correct: true,
            why: '¡Correcto! «Cinco» indica cantidad exacta, por eso es un adjetivo numeral.',
          },
          {
            text: 'Calificativo',
            why: 'Incorrecto. Un calificativo describe una cualidad (como «rojas»), no una cantidad.',
          },
          {
            text: 'Posesivo',
            why: 'Incorrecto. Un posesivo indica a quién pertenece algo (mi, tu, su).',
          },
        ],
      },
      {
        id: 'csa3',
        prompt:
          'En «Esa película fue increíble», ¿qué tipo de adjetivo es «esa»?',
        options: [
          { text: 'Demostrativo', correct: true },
          { text: 'Calificativo' },
          { text: 'Numeral' },
        ],
        explanation:
          '«Esa» es un adjetivo demostrativo: señala algo que está a una distancia media del hablante.',
      },
      {
        id: 'csa4',
        prompt:
          'En «La comida mexicana es deliciosa», ¿qué tipo de adjetivo es «mexicana»?',
        options: [
          { text: 'Gentilicio', correct: true },
          { text: 'Posesivo' },
          { text: 'Numeral' },
        ],
        explanation:
          '«Mexicana» es un adjetivo gentilicio: indica el lugar de origen.',
      },
      {
        id: 'csa5',
        prompt:
          '¿Qué tipo de adjetivo indica una cualidad del sustantivo (color, tamaño, forma)?',
        options: [
          { text: 'Calificativo', correct: true },
          { text: 'Numeral' },
          { text: 'Demostrativo' },
        ],
        explanation:
          'El adjetivo calificativo describe cualidades: grande, rojo, suave, brillante, etc.',
      },
      {
        id: 'csa6',
        prompt: '¿Qué tipo de adjetivo indica el lugar de origen?',
        options: [
          { text: 'Gentilicio', correct: true },
          { text: 'Calificativo' },
          { text: 'Posesivo' },
        ],
        explanation:
          'Los adjetivos gentilicios indican de dónde es alguien o algo: argentino, español, porteño, etc.',
      },
      // --- Completar con el adjetivo correcto (drag) ---
      {
        id: 'csa-drag1',
        kind: 'drag',
        prompt:
          'Completá: «____ casa tiene ____ ventanas ____».',
        segments: ['', ' casa tiene ', ' ventanas ', '.'],
        blanks: ['Nuestra', 'cuatro', 'grandes'],
        bank: ['Nuestra', 'cuatro', 'grandes', 'corrió', 'lejos'],
        explanation:
          '«Nuestra» es posesivo, «cuatro» es numeral y «grandes» es calificativo.',
      },
      {
        id: 'csa-drag2',
        kind: 'drag',
        prompt:
          'Completá: «____ jugador ____ metió el ____ gol».',
        segments: ['', ' jugador ', ' metió el ', ' gol.'],
        blanks: ['Aquel', 'uruguayo', 'primer'],
        bank: ['Aquel', 'uruguayo', 'primer', 'rápido', 'corre'],
        explanation:
          '«Aquel» es demostrativo, «uruguayo» es gentilicio y «primer» es numeral.',
      },
      // --- Más identificación (choice) ---
      {
        id: 'csa7',
        prompt:
          'En «Estos chicos rosarinos ganaron el segundo premio», ¿cuántos adjetivos hay?',
        options: [
          { text: 'Tres: «estos», «rosarinos» y «segundo»', correct: true },
          { text: 'Dos: «rosarinos» y «segundo»' },
          { text: 'Uno: «rosarinos»' },
        ],
        explanation:
          '«Estos» es demostrativo, «rosarinos» es gentilicio y «segundo» es numeral. Son tres adjetivos.',
      },
      {
        id: 'csa8',
        prompt:
          'Los adjetivos posesivos son aquellos que...',
        options: [
          { text: 'Indican a quién pertenece el sustantivo (mi, tu, su, nuestro)', correct: true },
          { text: 'Indican la cantidad del sustantivo (uno, dos, tres)' },
          { text: 'Señalan la distancia del sustantivo (este, ese, aquel)' },
        ],
        explanation:
          'Los posesivos indican posesión o pertenencia: mi libro, tu casa, su perro, nuestro equipo.',
      },
    ],
  },

  // ========================= 5. SEPARACIÓN EN SÍLABAS Y REGLAS DE TILDACIÓN =
  {
    id: 'silabas-tildacion',
    title: 'Separación en sílabas y reglas de tildación',
    description:
      'Separá en sílabas, encontrá la sílaba tónica, clasificá palabras y decidí si llevan tilde.',
    emoji: '✏️',
    questions: [
      // --- Separar en sílabas (choice) ---
      {
        id: 'st1',
        prompt: '¿Cómo se separa en sílabas la palabra «mariposa»?',
        options: [
          { text: 'ma-ri-po-sa', correct: true },
          { text: 'mar-i-po-sa' },
          { text: 'ma-rip-o-sa' },
        ],
        explanation: '«Mariposa» tiene cuatro sílabas: ma-ri-po-sa.',
      },
      {
        id: 'st2',
        prompt: '¿Cómo se separa en sílabas la palabra «escuela»?',
        options: [
          { text: 'es-cue-la', correct: true },
          { text: 'e-scu-e-la' },
          { text: 'esc-ue-la' },
        ],
        explanation:
          '«Escuela» tiene tres sílabas: es-cue-la. «ue» es un diptongo y no se separa.',
      },
      {
        id: 'st3',
        prompt: '¿Cómo se separa en sílabas la palabra «murciélago»?',
        options: [
          { text: 'mur-cié-la-go', correct: true },
          { text: 'murc-ié-la-go' },
          { text: 'mur-ci-é-la-go' },
        ],
        explanation:
          '«Murciélago» tiene cuatro sílabas: mur-cié-la-go. «ié» es un diptongo.',
      },
      {
        id: 'st4',
        prompt: '¿Cómo se separa en sílabas la palabra «zanahoria»?',
        options: [
          { text: 'za-na-ho-ria', correct: true },
          { text: 'zan-a-ho-ria' },
          { text: 'za-na-hor-ia' },
        ],
        explanation: '«Zanahoria» tiene cuatro sílabas: za-na-ho-ria.',
      },
      // --- Identificar la sílaba tónica (choice) ---
      {
        id: 'st5',
        prompt: '¿Cuál es la sílaba tónica de la palabra «telefono»?',
        options: [
          { text: 'le', correct: true },
          { text: 'te' },
          { text: 'no' },
        ],
        explanation:
          'La sílaba tónica es «le» (la que suena más fuerte): te-LE-fo-no.',
      },
      {
        id: 'st6',
        prompt: '¿Cuál es la sílaba tónica de la palabra «camion»?',
        options: [
          { text: 'mion', correct: true },
          { text: 'ca' },
          { text: 'mi' },
        ],
        explanation:
          'La sílaba tónica es «mion» (la última): ca-MION.',
      },
      {
        id: 'st7',
        prompt: '¿Cuál es la sílaba tónica de la palabra «lapiz»?',
        options: [
          { text: 'la', correct: true },
          { text: 'piz' },
        ],
        explanation:
          'La sílaba tónica es «la» (la anteúltima): LA-piz.',
      },
      {
        id: 'st8',
        prompt: '¿Cuál es la sílaba tónica de la palabra «cantante»?',
        options: [
          { text: 'tan', correct: true },
          { text: 'can' },
          { text: 'te' },
        ],
        explanation:
          'La sílaba tónica es «tan» (la anteúltima): can-TAN-te.',
      },
      // --- Clasificar: agudas, graves, esdrújulas (classify) ---
      {
        id: 'st-clas1',
        kind: 'classify',
        prompt:
          'Clasificá cada palabra como aguda, grave o esdrújula.',
        categories: ['Aguda', 'Grave', 'Esdrújula'],
        items: [
          { text: 'canción', category: 'Aguda' },
          { text: 'árbol', category: 'Grave' },
          { text: 'brújula', category: 'Esdrújula' },
          { text: 'reloj', category: 'Aguda' },
          { text: 'lápiz', category: 'Grave' },
          { text: 'teléfono', category: 'Esdrújula' },
          { text: 'café', category: 'Aguda' },
          { text: 'cárcel', category: 'Grave' },
          { text: 'música', category: 'Esdrújula' },
        ],
      },
      {
        id: 'st-clas2',
        kind: 'classify',
        prompt: 'Clasificá estas palabras según la posición de su sílaba tónica.',
        categories: ['Aguda', 'Grave', 'Esdrújula'],
        items: [
          { text: 'mamá', category: 'Aguda' },
          { text: 'mesa', category: 'Grave' },
          { text: 'lámpara', category: 'Esdrújula' },
          { text: 'avión', category: 'Aguda' },
          { text: 'fácil', category: 'Grave' },
          { text: 'pájaro', category: 'Esdrújula' },
        ],
      },
      // --- Reglas de tildación (reveal) ---
      {
        id: 'st-rev1',
        kind: 'reveal',
        emoji: '📏',
        prompt: '¿Cuándo llevan tilde las palabras agudas?',
        options: [
          {
            text: 'Cuando terminan en N, S o vocal',
            correct: true,
            why: '¡Correcto! Las agudas llevan tilde cuando terminan en N, S o vocal. Ej: canción, después, café.',
          },
          {
            text: 'Siempre llevan tilde',
            why: 'Incorrecto. Las agudas solo llevan tilde si terminan en N, S o vocal. «Reloj» es aguda y no lleva tilde.',
          },
          {
            text: 'Nunca llevan tilde',
            why: 'Incorrecto. Algunas agudas sí llevan tilde: canción, café, mamá.',
          },
        ],
      },
      {
        id: 'st-rev2',
        kind: 'reveal',
        emoji: '📏',
        prompt: '¿Cuándo llevan tilde las palabras graves?',
        options: [
          {
            text: 'Cuando NO terminan en N, S o vocal',
            correct: true,
            why: '¡Correcto! Las graves llevan tilde cuando NO terminan en N, S o vocal. Ej: árbol, lápiz, fácil.',
          },
          {
            text: 'Cuando terminan en N, S o vocal',
            why: 'Incorrecto. Eso es la regla de las agudas. Las graves llevan tilde justamente en el caso contrario.',
          },
          {
            text: 'Siempre llevan tilde',
            why: 'Incorrecto. «Mesa» es grave y no lleva tilde porque termina en vocal.',
          },
        ],
      },
      {
        id: 'st-rev3',
        kind: 'reveal',
        emoji: '📏',
        prompt: '¿Cuándo llevan tilde las palabras esdrújulas?',
        options: [
          {
            text: 'Siempre llevan tilde',
            correct: true,
            why: '¡Correcto! Las esdrújulas SIEMPRE llevan tilde, sin excepción. Ej: música, teléfono, brújula, pájaro.',
          },
          {
            text: 'Solo cuando terminan en N, S o vocal',
            why: 'Incorrecto. Esa regla es de las agudas. Las esdrújulas siempre llevan tilde.',
          },
          {
            text: 'Nunca llevan tilde',
            why: 'Incorrecto. Las esdrújulas siempre se tildan: música, teléfono, brújula.',
          },
        ],
      },
      // --- ¿Lleva tilde o no? (choice) ---
      {
        id: 'st9',
        prompt:
          '«Arbol» — ¿Lleva tilde? Si sí, ¿dónde?',
        options: [
          { text: 'Sí: «Árbol» (en la A)', correct: true },
          { text: 'No lleva tilde' },
          { text: 'Sí: «Arból» (en la O)' },
        ],
        explanation:
          '«Árbol» es grave y termina en L (no en N, S o vocal), por eso lleva tilde en la A.',
      },
      {
        id: 'st10',
        prompt: '«Mesa» — ¿Lleva tilde?',
        options: [
          { text: 'No lleva tilde', correct: true },
          { text: 'Sí: «Mésa»' },
        ],
        explanation:
          '«Mesa» es grave y termina en vocal (A), por eso no lleva tilde.',
      },
      {
        id: 'st11',
        prompt: '«Cafe» — ¿Lleva tilde? Si sí, ¿dónde?',
        options: [
          { text: 'Sí: «Café» (en la E)', correct: true },
          { text: 'No lleva tilde' },
          { text: 'Sí: «Cáfe» (en la A)' },
        ],
        explanation:
          '«Café» es aguda y termina en vocal (E), por eso lleva tilde en la última sílaba.',
      },
      {
        id: 'st12',
        prompt: '«Reloj» — ¿Lleva tilde?',
        options: [
          { text: 'No lleva tilde', correct: true },
          { text: 'Sí: «Relój»' },
        ],
        explanation:
          '«Reloj» es aguda pero termina en J (no en N, S o vocal), por eso no lleva tilde.',
      },
      {
        id: 'st13',
        prompt: '«Musica» — ¿Lleva tilde? Si sí, ¿dónde?',
        options: [
          { text: 'Sí: «Música» (en la U)', correct: true },
          { text: 'No lleva tilde' },
          { text: 'Sí: «Musicá» (en la A)' },
        ],
        explanation:
          '«Música» es esdrújula y las esdrújulas siempre llevan tilde.',
      },
      // --- Completar regla de tildación (drag) ---
      {
        id: 'st-drag1',
        kind: 'drag',
        prompt:
          'Completá la regla: «Las palabras agudas llevan tilde cuando terminan en ____, ____ o ____».',
        segments: [
          'Las palabras agudas llevan tilde cuando terminan en ',
          ', ',
          ' o ',
          '.',
        ],
        blanks: ['N', 'S', 'vocal'],
        bank: ['N', 'S', 'vocal', 'L', 'R', 'consonante'],
        anyOrder: true,
        explanation:
          'Las agudas llevan tilde cuando terminan en N, S o vocal.',
      },
      {
        id: 'st-drag2',
        kind: 'drag',
        prompt:
          'Completá: «Las palabras ____ SIEMPRE llevan tilde».',
        segments: ['Las palabras ', ' SIEMPRE llevan tilde.'],
        blanks: ['esdrújulas'],
        bank: ['esdrújulas', 'agudas', 'graves'],
        explanation:
          'Las esdrújulas siempre llevan tilde, sin excepción.',
      },
      // --- Definiciones (choice) ---
      {
        id: 'st14',
        prompt: '¿Qué es la sílaba tónica?',
        options: [
          {
            text: 'La sílaba que se pronuncia con más fuerza',
            correct: true,
          },
          { text: 'La primera sílaba de la palabra' },
          { text: 'La última sílaba de la palabra' },
        ],
        explanation:
          'La sílaba tónica es la que suena más fuerte al pronunciar la palabra.',
      },
      {
        id: 'st15',
        prompt: '¿Cómo se llaman las palabras cuya sílaba tónica es la última?',
        options: [
          { text: 'Agudas', correct: true },
          { text: 'Graves' },
          { text: 'Esdrújulas' },
        ],
        explanation:
          'Las agudas tienen la sílaba tónica en la última posición: ca-fé, ca-mión, re-loj.',
      },
      {
        id: 'st16',
        prompt:
          '¿Cómo se llaman las palabras cuya sílaba tónica es la anteúltima?',
        options: [
          { text: 'Graves', correct: true },
          { text: 'Agudas' },
          { text: 'Esdrújulas' },
        ],
        explanation:
          'Las graves tienen la sílaba tónica en la anteúltima posición: me-sa, lá-piz, ár-bol.',
      },
      {
        id: 'st17',
        prompt:
          '¿Cómo se llaman las palabras cuya sílaba tónica es la antepenúltima?',
        options: [
          { text: 'Esdrújulas', correct: true },
          { text: 'Agudas' },
          { text: 'Graves' },
        ],
        explanation:
          'Las esdrújulas tienen la sílaba tónica en la antepenúltima posición: mú-si-ca, te-lé-fo-no.',
      },
    ],
  },
]
