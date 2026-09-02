import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Prácticas del Lenguaje (PDL)
// 2do Trimestre → seis prácticas:
//
// 1) La poesía y las imágenes sensoriales
// 2) Los artículos y los adjetivos — La construcción sustantiva
// 3) Construcción sustantiva (núcleo y modificadores directos e indirectos)
// 4) El diccionario y la enciclopedia
// 5) Clasificación semántica de los adjetivos
// 6) Separación en sílabas y reglas de tildación
//
// Formatos usados: choice, drag, classify, reveal, words, analyze.
// Consignas y explicaciones en castellano.
// ============================================================================

export const grade4PdlPractices: Practice[] = [
  // ========================= 1. POESÍA E IMÁGENES SENSORIALES ==============
  // Identificar y clasificar imágenes sensoriales, más verso, estrofa y rima.
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
          '«Probé la miel dulce del panal.» ¿Qué tipo de imagen sensorial es?',
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
      // --- Clasificar rimas (classify) ---
      {
        id: 'is-clas3',
        kind: 'classify',
        prompt: 'Clasificá las parejas de palabras según cómo riman.',
        categories: ['Rima consonante', 'Rima asonante', 'No riman'],
        items: [
          { text: 'gato – pato', category: 'Rima consonante' },
          { text: 'canción – corazón', category: 'Rima consonante' },
          { text: 'estrella – bella', category: 'Rima consonante' },
          { text: 'ventana – mañana', category: 'Rima consonante' },
          { text: 'mesa – pera', category: 'Rima asonante' },
          { text: 'luna – ruta', category: 'Rima asonante' },
          { text: 'camino – vestido', category: 'Rima asonante' },
          { text: 'perro – árbol', category: 'No riman' },
          { text: 'mariposa – jardín', category: 'No riman' },
        ],
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

  // ========================= 3. CONSTRUCCIÓN SUSTANTIVA ====================
  // Señalar el núcleo, señalar los modificadores (directos e indirectos) y
  // analizar la construcción entera poniendo un cartelito debajo de cada
  // palabra. Cierra con las definiciones, para repasar la teoría.
  {
    id: 'construccion-sustantiva',
    title: 'Construcción sustantiva',
    description:
      'Señalá el núcleo y los modificadores directos e indirectos, y analizá la construcción palabra por palabra.',
    emoji: '🧩',
    questions: [
      // --- Tocá el núcleo (words) ---
      {
        id: 'cs-nu1',
        kind: 'words',
        prompt: 'Tocá el núcleo.',
        words: ['La', 'pequeña', 'mariposa', 'azul'],
        pick: [2],
        explanation:
          'El núcleo de la construcción sustantiva es el sustantivo: «mariposa». «La», «pequeña» y «azul» solo la acompañan.',
      },
      {
        id: 'cs-nu2',
        kind: 'words',
        prompt: 'Tocá el núcleo.',
        words: ['Los', 'altos', 'árboles', 'verdes'],
        pick: [2],
        explanation:
          'El núcleo es el sustantivo «árboles»: es la palabra más importante y de la que hablan las demás.',
      },

      // --- Tocá los modificadores directos (words) ---
      {
        id: 'cs-md1',
        kind: 'words',
        prompt: 'Tocá los modificadores directos.',
        words: ['Las', 'altas', 'montañas', 'nevadas'],
        pick: [0, 1, 3],
        explanation:
          'Los modificadores directos son «las», «altas» y «nevadas»: acompañan al núcleo «montañas» sin ninguna palabra en el medio.',
      },
      {
        id: 'cs-md2',
        kind: 'words',
        prompt: 'Tocá los modificadores directos.',
        words: ['El', 'pequeño', 'barco', 'pesquero'],
        pick: [0, 1, 3],
        explanation:
          'El artículo «el» y los adjetivos «pequeño» y «pesquero» modifican directamente al núcleo «barco».',
      },

      // --- Analizar la construcción entera (analyze) ---
      {
        id: 'cs-an1',
        kind: 'analyze',
        prompt: 'Arrastrá cada cartelito al casillero que corresponda.',
        words: ['Las', 'altas', 'montañas', 'nevadas'],
        labels: ['MD', 'MD', 'NÚCLEO', 'MD'],
        explanation:
          'El núcleo es «montañas» y los tres modificadores directos son «Las», «altas» y «nevadas».',
      },
      {
        id: 'cs-an2',
        kind: 'analyze',
        prompt: 'Arrastrá cada cartelito al casillero que corresponda.',
        words: ['El', 'gato', 'negro'],
        labels: ['MD', 'NÚCLEO', 'MD'],
        explanation:
          'El núcleo es «gato»; «El» y «negro» son sus modificadores directos.',
      },
      {
        id: 'cs-an3',
        kind: 'analyze',
        prompt: 'Arrastrá cada cartelito al casillero que corresponda.',
        words: ['La', 'pequeña', 'mariposa', 'azul'],
        labels: ['MD', 'MD', 'NÚCLEO', 'MD'],
        explanation:
          'El núcleo es «mariposa» y «La», «pequeña» y «azul» son modificadores directos.',
      },

      // --- Tocá el modificador indirecto (words) ---
      {
        id: 'cs-mi1',
        kind: 'words',
        prompt: 'Tocá el modificador indirecto.',
        words: ['La', 'casa', 'de', 'madera'],
        pick: [2, 3],
        explanation:
          'El modificador indirecto es «de madera»: es un grupo de palabras que se une al núcleo «casa» por medio de la preposición «de».',
      },
      {
        id: 'cs-mi2',
        kind: 'words',
        prompt: 'Tocá el nexo que une el modificador indirecto con el núcleo.',
        words: ['Un', 'libro', 'sobre', 'dinosaurios'],
        pick: [2],
        explanation:
          'El nexo es la preposición «sobre»: conecta el núcleo «libro» con el modificador indirecto.',
      },

      // --- Analizar con modificador indirecto (analyze) ---
      {
        id: 'cs-mi-an1',
        kind: 'analyze',
        prompt:
          'Analizá la construcción sustantiva de «Los zapatos nuevos de Juan están junto a la puerta».',
        words: ['Los', 'zapatos', 'nuevos', 'de Juan'],
        labels: ['MD', 'NÚCLEO', 'MD', 'MI'],
        explanation:
          'Núcleo: «zapatos». MD: «Los» y «nuevos». MI: «de Juan», unido al núcleo por la preposición «de».',
      },
      {
        id: 'cs-mi-an2',
        kind: 'analyze',
        prompt:
          'Analizá la construcción sustantiva de «Una tortuga pequeña con manchas caminaba por el jardín».',
        words: ['Una', 'tortuga', 'pequeña', 'con manchas'],
        labels: ['MD', 'NÚCLEO', 'MD', 'MI'],
        explanation:
          'Núcleo: «tortuga». MD: «Una» y «pequeña». MI: «con manchas», unido al núcleo por la preposición «con».',
      },
      {
        id: 'cs-mi-an3',
        kind: 'analyze',
        prompt:
          'Analizá la construcción sustantiva de «El enorme árbol del parque tiene muchas ramas».',
        words: ['El', 'enorme', 'árbol', 'del parque'],
        labels: ['MD', 'MD', 'NÚCLEO', 'MI'],
        explanation:
          'Núcleo: «árbol». MD: «El» y «enorme». MI: «del parque», unido al núcleo por la preposición «de» («del» = de + el).',
      },
      {
        id: 'cs-mi-an4',
        kind: 'analyze',
        prompt:
          'Analizá la construcción sustantiva de «La caja misteriosa sin tapa estaba debajo de la cama».',
        words: ['La', 'caja', 'misteriosa', 'sin tapa'],
        labels: ['MD', 'NÚCLEO', 'MD', 'MI'],
        explanation:
          'Núcleo: «caja». MD: «La» y «misteriosa». MI: «sin tapa», unido al núcleo por la preposición «sin».',
      },
      {
        id: 'cs-mi-an5',
        kind: 'analyze',
        prompt:
          'Analizá la construcción sustantiva de «Los libros interesantes sobre animales están en la biblioteca».',
        words: ['Los', 'libros', 'interesantes', 'sobre animales'],
        labels: ['MD', 'NÚCLEO', 'MD', 'MI'],
        explanation:
          'Núcleo: «libros». MD: «Los» e «interesantes». MI: «sobre animales», unido al núcleo por la preposición «sobre».',
      },

      // --- Las definiciones (choice) ---
      {
        id: 'cs-def1',
        prompt: 'Una construcción sustantiva es...',
        options: [
          {
            text: 'Un grupo de palabras cuya palabra principal es un sustantivo, acompañado por otras que lo modifican',
            correct: true,
          },
          { text: 'Un grupo de palabras cuya palabra principal es un verbo' },
          { text: 'Una oración completa, con sujeto y predicado' },
        ],
        explanation:
          'La construcción sustantiva tiene un sustantivo como palabra principal (el núcleo) y otras palabras que lo acompañan y lo modifican.',
      },
      {
        id: 'cs-def2',
        prompt: 'El modificador directo es...',
        options: [
          {
            text: 'El artículo o el adjetivo que acompaña al sustantivo sin ninguna palabra en el medio',
            correct: true,
          },
          {
            text: 'Un grupo de palabras que se une al sustantivo con una preposición',
          },
          { text: 'La palabra principal de la construcción sustantiva' },
        ],
        explanation:
          'En «el perro manso», «el» y «manso» son modificadores directos: acompañan al núcleo sin ninguna palabra en el medio.',
      },
      {
        id: 'cs-def3',
        prompt: 'El modificador directo concuerda con el núcleo en...',
        options: [
          { text: 'Género y número', correct: true },
          { text: 'Solo en género' },
          { text: 'Solo en número' },
        ],
        explanation:
          'Si el núcleo cambia, el modificador directo cambia con él: «la casa blanca» → «las casas blancas».',
      },
      {
        id: 'cs-def4',
        prompt:
          '¿En cuál de estas construcciones el modificador directo concuerda bien con el núcleo?',
        options: [
          { text: 'Las ventanas abiertas', correct: true },
          { text: 'Las ventanas abierto' },
          { text: 'Los ventanas abiertas' },
        ],
        explanation:
          '«Ventanas» es femenino plural, así que el artículo y el adjetivo también van en femenino plural: «Las ventanas abiertas».',
      },
      {
        id: 'cs-def5',
        prompt: 'El modificador indirecto es...',
        options: [
          {
            text: 'Un grupo de palabras que acompaña al sustantivo y se une a él mediante una preposición',
            correct: true,
          },
          {
            text: 'Un adjetivo que acompaña al sustantivo sin nada en el medio',
          },
          { text: 'El sustantivo principal de la construcción' },
        ],
        explanation:
          'En «la casa de madera», el modificador indirecto es «de madera»: se une al núcleo por medio de la preposición «de».',
      },
      {
        id: 'cs-def6',
        prompt:
          'En «la casa de madera», ¿qué palabra conecta el modificador indirecto con el núcleo?',
        options: [
          { text: '«de», que es una preposición', correct: true },
          { text: '«la», que es un artículo' },
          { text: '«madera», que es un sustantivo' },
        ],
        explanation:
          'El modificador indirecto siempre tiene un nexo que lo conecta con el núcleo, y ese nexo es una preposición: de, con, sin, sobre, para, entre otras.',
      },
    ],
  },

  // ========================= 4. EL DICCIONARIO Y LA ENCICLOPEDIA ============
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

  // ========================= 5. CLASIFICACIÓN SEMÁNTICA DE LOS ADJETIVOS ====
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
      {
        id: 'csa9',
        prompt: 'Los adjetivos calificativos son aquellos que...',
        options: [
          {
            text: 'Indican una cualidad del sustantivo (grande, rojo, suave)',
            correct: true,
          },
          { text: 'Indican a quién pertenece el sustantivo (mi, tu, su)' },
          { text: 'Indican el lugar de origen del sustantivo (argentino, español)' },
        ],
        explanation:
          'Los calificativos describen cualidades: color, tamaño, forma o carácter. Ej.: una casa grande, un perro manso.',
      },
      {
        id: 'csa10',
        prompt: 'Los adjetivos gentilicios son aquellos que...',
        options: [
          {
            text: 'Indican el lugar de origen del sustantivo (argentino, español, porteño)',
            correct: true,
          },
          { text: 'Señalan la distancia del sustantivo (este, ese, aquel)' },
          { text: 'Indican la cantidad o el orden del sustantivo (dos, primero)' },
        ],
        explanation:
          'Los gentilicios dicen de dónde es alguien o algo: la comida mexicana, un turista chileno, una calle cordobesa.',
      },
      {
        id: 'csa11',
        prompt: 'Los adjetivos numerales son aquellos que...',
        options: [
          {
            text: 'Indican la cantidad o el orden del sustantivo (dos, tres, primero, segundo)',
            correct: true,
          },
          { text: 'Indican una cualidad del sustantivo (alto, dulce, veloz)' },
          { text: 'Indican a quién pertenece el sustantivo (mi, tu, nuestro)' },
        ],
        explanation:
          'Los numerales indican cantidad (cardinales: dos, tres, diez) u orden (ordinales: primero, segundo, quinto).',
      },
      {
        id: 'csa12',
        prompt: 'Los adjetivos demostrativos son aquellos que...',
        options: [
          {
            text: 'Señalan a qué distancia está el sustantivo (este, ese, aquel)',
            correct: true,
          },
          { text: 'Indican el lugar de origen del sustantivo (cordobés, brasileño)' },
          { text: 'Indican una cualidad del sustantivo (brillante, pequeño)' },
        ],
        explanation:
          'Los demostrativos señalan la distancia: este/esta (cerca), ese/esa (a distancia media) y aquel/aquella (lejos).',
      },
    ],
  },

  // ========================= 6. SEPARACIÓN EN SÍLABAS Y REGLAS DE TILDACIÓN =
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
        prompt: '«Arbol» — ¿Lleva tilde?',
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
