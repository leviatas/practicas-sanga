import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Matemática — Simulacro "Alto en el camino III"
// Es EXACTAMENTE el simulacro de la fotocopia, en el mismo orden (la práctica
// tiene `inOrder`, así que las preguntas no se barajan):
//  1) Leandro y los gastos de las vacaciones (a, b, c).
//  2) Paula y los estantes de libros (a, b).
//  3) La panadería «Dos Pancitos» y las bandejas de masitas.
//  GEOMETRÍA — Circunferencia y círculo:
//     1. Ubicar los nombres (centro, radio, diámetro, circunferencia, círculo).
//     2. Trazar la circunferencia de centro O que pasa por A.
//  3) Construcciones: circunferencia de 5 cm de diámetro y de 2 cm de radio.
//  4) Medir y clasificar tres ángulos.
//     a. Trazar sobre el transportador el lado que falta (125°).
//     b. Construir ángulos de 80°, 35° y 164°.
//     c. Construir triángulos (tres lados distintos / dos iguales) y
//        clasificarlos según sus lados.
// Las imágenes son las de la fotocopia (ver simulacroImages).
// ============================================================================

export const grade4MatematicaSimulacro3Practices: Practice[] = [
  {
    id: 'simulacro-matematica',
    title: 'Simulacro: problemas y geometría',
    description:
      'El simulacro de la fotocopia, consigna por consigna y en el mismo orden: Leandro, Paula, «Dos Pancitos», circunferencia y círculo, ángulos y triángulos.',
    emoji: '🧮',
    inOrder: true,
    questions: [
      // ---- 1) Leandro ----
      {
        id: 'sm1a',
        kind: 'reveal',
        emoji: '🏖️',
        prompt:
          '1) Durante las vacaciones Leandro gastó, cada día, $10.168 en comida, $1.609 en transportes y $20.024 en hospedaje. a. ¿Cuánto dinero gastó por día?',
        hint: 'Sumá los tres gastos de un día. Encolumná bien: unidades debajo de unidades.',
        options: [
          {
            text: '$31.801',
            correct: true,
            why: '¡Correcto! 10.168 + 1.609 + 20.024 = 31.801. Respuesta: «Leandro gastó $31.801 por día».',
          },
          {
            text: '$30.192',
            why: 'Incorrecto. Sumaste solo comida y hospedaje (10.168 + 20.024). Te faltó el transporte.',
          },
          {
            text: '$46.282',
            why: 'Incorrecto. Encolumnaste mal el 1.609 (lo corriste un lugar, como si fuera 16.090). Unidades debajo de unidades.',
          },
          {
            text: '$8.247',
            why: 'Incorrecto. Si gastó en las tres cosas, hay que sumar, no restar.',
          },
        ],
      },
      {
        id: 'sm1b',
        kind: 'reveal',
        emoji: '📅',
        prompt: '1) b. Si sus vacaciones duraron 15 días, ¿cuánto dinero gastó en total?',
        hint: 'Ya sabés lo que gastó en UN día. Si son 15 días iguales, ¿qué operación hacés?',
        options: [
          {
            text: '$477.015',
            correct: true,
            why: '¡Correcto! 31.801 × 15 = 477.015. Se puede pensar: 31.801 × 10 = 318.010 y 31.801 × 5 = 159.005; 318.010 + 159.005 = 477.015.',
          },
          {
            text: '$31.816',
            why: 'Incorrecto. Sumaste 15 en lugar de multiplicar por 15.',
          },
          {
            text: '$318.010',
            why: 'Casi. Eso es lo que gastó en 10 días. Faltan los otros 5 (159.005).',
          },
          {
            text: '$2.120',
            why: 'Incorrecto. Dividiste; pero si gasta lo mismo cada día durante 15 días, hay que multiplicar.',
          },
        ],
      },
      {
        id: 'sm1c',
        kind: 'reveal',
        emoji: '💵',
        prompt: '1) c. Si llevó $50.000, ¿cuánto dinero le sobró?',
        hint: 'Con $50.000 no le alcanza para los 15 días, así que pensalo para UN día: lo que llevó menos lo que gastó por día.',
        options: [
          {
            text: '$18.199',
            correct: true,
            why: '¡Correcto! 50.000 − 31.801 = 18.199. Se puede verificar: 31.801 + 18.199 = 50.000.',
          },
          {
            text: '$81.801',
            why: 'Incorrecto. Sumaste. Si le sobró, tiene que ser menos de lo que llevó.',
          },
          {
            text: '$28.299',
            why: 'Incorrecto. Revisá los «préstamos» de la resta: 50.000 − 31.801 tiene que dar 18.199.',
          },
          {
            text: '$427.015',
            why: 'Incorrecto. Restaste 477.015 − 50.000 (el gasto de los 15 días). Con lo que llevó se compara el gasto de un día: 50.000 − 31.801.',
          },
        ],
      },

      // ---- 2) Paula ----
      {
        id: 'sm2a',
        kind: 'classify',
        prompt:
          '2) Paula completó 12 estantes con 36 libros de terror en cada uno, 15 estantes con 28 de ciencia ficción en cada uno y 3 estantes con 35 libros de poesías en cada uno. a. ¿Cuántos libros hay de cada género? Poné cada cuenta y su resultado en su género.',
        categories: ['Terror', 'Ciencia ficción', 'Poesía'],
        items: [
          { text: '12 × 36', category: 'Terror' },
          { text: '432 libros', category: 'Terror' },
          { text: '15 × 28', category: 'Ciencia ficción' },
          { text: '420 libros', category: 'Ciencia ficción' },
          { text: '3 × 35', category: 'Poesía' },
          { text: '105 libros', category: 'Poesía' },
        ],
        explanation:
          'Terror: 12 × 36 = 432. Ciencia ficción: 15 × 28 = 420. Poesía: 3 × 35 = 105. (12 × 36 se puede pensar como 10 × 36 + 2 × 36 = 360 + 72.)',
      },
      {
        id: 'sm2b',
        kind: 'reveal',
        emoji: '📚',
        prompt: '2) b. ¿Cuántos libros tiene en total?',
        hint: 'Sumá los libros de los tres géneros: 432 + 420 + 105.',
        options: [
          { text: '957 libros', correct: true, why: '¡Correcto! 432 + 420 + 105 = 957.' },
          { text: '852 libros', why: 'Incorrecto. Te faltó sumar los 105 de poesía.' },
          {
            text: '30 libros',
            why: 'Incorrecto. 30 es la cantidad de estantes (12 + 15 + 3), no de libros.',
          },
          {
            text: '99 libros',
            why: 'Incorrecto. Sumaste los libros de un estante de cada género (36 + 28 + 35). Hay que usar todos los estantes.',
          },
        ],
      },

      // ---- 3) Dos Pancitos ----
      {
        id: 'sm3',
        kind: 'reveal',
        emoji: '🧁',
        prompt:
          '3) En la panadería «Dos Pancitos» quieren presentar las masitas en bandejas iguales. En cada bandeja entran 24 y en total tienen 13.224. ¿Cuántas bandejas necesitan?',
        hint: 'Hay que repartir 13.224 masitas en grupos de 24: ¿qué operación es?',
        options: [
          {
            text: '551 bandejas',
            correct: true,
            why: '¡Correcto! 13.224 ÷ 24 = 551 y no sobra nada. Verificación: 551 × 24 = 13.224.',
          },
          {
            text: '317.376 bandejas',
            why: 'Incorrecto. Multiplicaste. Si las masitas se reparten en bandejas, tiene que haber MENOS bandejas que masitas: se divide.',
          },
          {
            text: '13.200 bandejas',
            why: 'Incorrecto. Restaste 24. Hay que ver cuántas veces entra el 24 en 13.224.',
          },
          {
            text: '51 bandejas',
            why: 'Casi. Revisá la división: te faltó bajar una cifra. 51 × 24 = 1.224, no 13.224.',
          },
        ],
      },

      // ---- GEOMETRÍA: Circunferencia y círculo ----
      {
        id: 'sg1',
        kind: 'drag',
        image: 'mate-circulo-partes',
        prompt:
          'GEOMETRÍA — Circunferencia y círculo. 1. Ubicá los nombres que corresponden (centro, radio, diámetro, circunferencia, círculo).',
        segments: ['1: ', ' — 2: ', ' — 3: ', ' — 4: ', ' — 5: ', ''],
        blanks: ['circunferencia', 'centro', 'radio', 'diámetro', 'círculo'],
        bank: ['radio', 'círculo', 'centro', 'diámetro', 'circunferencia'],
        explanation:
          '1 circunferencia (la línea curva del borde), 2 centro (el punto del medio), 3 radio (une el centro con la circunferencia), 4 diámetro (pasa por el centro: es el doble del radio) y 5 círculo (toda la superficie pintada, con su borde).',
      },
      {
        id: 'sg2',
        kind: 'reveal',
        emoji: '🧭',
        image: 'mate-circulo-a-o',
        prompt:
          '2. El punto O es el centro de una circunferencia y A es uno de sus puntos. Usá el compás y trazá la circunferencia. ¿Cómo lo hacés?',
        options: [
          {
            text: 'Pincho el compás en O, lo abro hasta A y giro: la circunferencia pasa por A.',
            correct: true,
            why: '¡Correcto! O es el centro, así que ahí va la punta. La distancia de O a A es el radio: esa es la abertura del compás.',
          },
          {
            text: 'Pincho el compás en A y lo abro hasta O.',
            why: 'Incorrecto. Así A sería el centro. La punta del compás va en el centro, que es O.',
          },
          {
            text: 'Pincho en O y lo abro 5 cm, aunque no llegue a A.',
            why: 'Incorrecto. La circunferencia tiene que pasar por A: la abertura es justo la distancia de O a A.',
          },
        ],
      },

      // ---- 3) Construcciones ----
      {
        id: 'sg3a',
        kind: 'reveal',
        emoji: '⭕',
        prompt: '3) Realizá: una circunferencia de 5 cm de diámetro. ¿Cuánto abrís el compás?',
        hint: 'La abertura del compás es siempre el radio. ¿Qué relación hay entre el radio y el diámetro?',
        options: [
          {
            text: '2,5 cm',
            correct: true,
            why: '¡Correcto! El radio es la mitad del diámetro: 5 ÷ 2 = 2,5 cm.',
          },
          {
            text: '5 cm',
            why: 'Incorrecto. Si abrís 5 cm, ese es el radio y la circunferencia tendría 10 cm de diámetro.',
          },
          {
            text: '10 cm',
            why: 'Incorrecto. Duplicaste. El radio es la MITAD del diámetro.',
          },
        ],
      },
      {
        id: 'sg3b',
        kind: 'reveal',
        emoji: '⭕',
        prompt: '3) Realizá: una circunferencia de 2 cm de radio. ¿Cuánto abrís el compás?',
        options: [
          {
            text: '2 cm (y su diámetro va a medir 4 cm)',
            correct: true,
            why: '¡Correcto! Te dan el radio, así que abrís el compás 2 cm. El diámetro es el doble: 4 cm.',
          },
          {
            text: '1 cm',
            why: 'Incorrecto. Eso sería si te dieran el diámetro. Acá te dan el radio: se abre 2 cm.',
          },
          {
            text: '4 cm',
            why: 'Incorrecto. 4 cm es el diámetro. El compás se abre la medida del radio.',
          },
        ],
      },

      // ---- 4) Medí y clasificá cada ángulo ----
      {
        id: 'sg4-azul',
        kind: 'reveal',
        image: 'mate-angulos',
        prompt: '4) Medí y clasificá cada ángulo. El AZUL (el primero): ¿cuánto mide y qué ángulo es?',
        hint: 'Apoyá el centro del transportador en el vértice y el 0 sobre el lado de abajo. Antes de leer, fijate: ¿es más abierto o más cerrado que una esquina?',
        options: [
          {
            text: 'Mide unos 60°: es agudo.',
            correct: true,
            why: '¡Correcto! Mide alrededor de 60°: menos de 90°, así que es agudo.',
          },
          {
            text: 'Mide unos 120°: es obtuso.',
            why: 'Incorrecto. Leíste la otra escala del transportador (180 − 60 = 120). Es más cerrado que una esquina: mide menos de 90°.',
          },
          { text: 'Mide 90°: es recto.', why: 'Incorrecto. Es más cerrado que la esquina de una hoja.' },
        ],
      },
      {
        id: 'sg4-naranja',
        kind: 'reveal',
        image: 'mate-angulos',
        prompt: '4) El NARANJA (el del medio): ¿cuánto mide y qué ángulo es?',
        hint: '¡Ojo con este! Está muy cerca de una esquina. Medilo con cuidado.',
        options: [
          {
            text: 'Mide unos 85°: es agudo (le falta poquito para ser recto).',
            correct: true,
            why: '¡Correcto! Mide alrededor de 85°: un poquito menos de 90°, así que es agudo.',
          },
          {
            text: 'Mide unos 95°: es obtuso.',
            why: 'Incorrecto. Mide un poquito MENOS de 90°, no más.',
          },
          {
            text: 'Mide unos 130°: es obtuso.',
            why: 'Incorrecto. Leíste la escala equivocada del transportador. Es casi una esquina.',
          },
        ],
      },
      {
        id: 'sg4-rojo',
        kind: 'reveal',
        image: 'mate-angulos',
        prompt: '4) El ROJO (el último): ¿cuánto mide y qué ángulo es?',
        hint: 'Está «dado vuelta»: girá la hoja o el transportador para que un lado quede sobre el 0.',
        options: [
          {
            text: 'Mide unos 40°: es agudo.',
            correct: true,
            why: '¡Correcto! Mide alrededor de 40°: es el más cerrado de los tres. Aunque esté girado, sigue siendo agudo.',
          },
          {
            text: 'Mide unos 140°: es obtuso.',
            why: 'Incorrecto. Leíste la otra escala (180 − 40 = 140). Es muy cerrado: mide menos de 90°.',
          },
          {
            text: 'Mide 180°: es llano.',
            why: 'Incorrecto. Un ángulo llano es una línea recta, y este es muy cerrado.',
          },
        ],
      },
      {
        id: 'sg4a',
        kind: 'reveal',
        image: 'mate-transportador-125',
        prompt:
          '4) a. Trazá sobre el transportador el lado que falta del ángulo para que tenga la amplitud que se indica (mide 125°). ¿Hasta qué número trazás el lado?',
        hint: 'El lado rojo está sobre el 0 de la derecha. Usá la escala que empieza en 0 de ese lado.',
        options: [
          {
            text: 'Hasta el 125 de la escala de afuera (la que empieza en 0 a la derecha): queda del lado izquierdo, pasando el 90.',
            correct: true,
            why: '¡Correcto! Se sigue la escala que tiene el 0 sobre el lado rojo: la de afuera. 125° es obtuso, así que el lado tiene que quedar más abierto que el 90.',
          },
          {
            text: 'Hasta el 125 de la escala de adentro: queda del lado derecho.',
            why: 'Incorrecto. La escala de adentro empieza en 0 a la izquierda. Ahí ese punto mide 55° desde el lado rojo: te quedaría agudo.',
          },
          {
            text: 'Hasta el 90.',
            why: 'Incorrecto. 90° es un ángulo recto; 125° es más grande.',
          },
        ],
      },
      {
        id: 'sg4b',
        kind: 'classify',
        prompt: '4) b. Construí en tu carpeta un ángulo de 80°, uno de 35° y otro de 164°. ¿Qué clase de ángulo es cada uno?',
        hint: 'Para construirlo: trazá un lado, apoyá el centro del transportador en el vértice con el 0 sobre el lado, marcá la medida y uní el vértice con la marca.',
        keepOrder: true,
        categories: ['Agudo', 'Recto', 'Obtuso'],
        items: [
          { text: '80°', category: 'Agudo' },
          { text: '35°', category: 'Agudo' },
          { text: '164°', category: 'Obtuso' },
        ],
        explanation:
          'Agudo: menos de 90°. Obtuso: entre 90° y 180°. Controlá tus dibujos: el de 164° tiene que verse casi como una línea recta.',
      },
      {
        id: 'sg4c1',
        kind: 'reveal',
        emoji: '🔺',
        prompt: '4) c. Construí un triángulo con tres lados distintos. Ahora clasificalo según sus lados: ¿cómo se llama?',
        options: [
          { text: 'Escaleno', correct: true, why: '¡Correcto! Escaleno: sus tres lados miden distinto.' },
          { text: 'Isósceles', why: 'Incorrecto. El isósceles tiene DOS lados iguales.' },
          { text: 'Equilátero', why: 'Incorrecto. El equilátero tiene sus TRES lados iguales.' },
        ],
      },
      {
        id: 'sg4c2',
        kind: 'reveal',
        emoji: '🔺',
        prompt: '4) c. Construí un triángulo con dos lados iguales. Ahora clasificalo según sus lados: ¿cómo se llama?',
        options: [
          { text: 'Isósceles', correct: true, why: '¡Correcto! Isósceles: dos lados iguales y uno distinto.' },
          { text: 'Escaleno', why: 'Incorrecto. El escaleno tiene los tres lados distintos.' },
          {
            text: 'Rectángulo',
            why: 'Incorrecto. «Rectángulo» es una clasificación según los ÁNGULOS (tiene uno recto), no según los lados.',
          },
        ],
      },
    ],
  },
]
