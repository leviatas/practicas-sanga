import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Matemática — Simulacro "Alto en el camino III"
// Basado en el simulacro que dio la seño:
//  1) Leandro y los gastos de las vacaciones (suma, multiplicación, resta).
//  2) Paula y los estantes de libros (multiplicaciones y suma).
//  3) La panadería y las bandejas de masitas (división).
//  Geometría: circunferencias con compás (diámetro y radio), medir, construir
//  y clasificar ángulos con el transportador, y construir y clasificar
//  triángulos según sus lados.
// La práctica 1 usa los mismos datos del simulacro; la 2 es otra vuelta con
// otros números.
// ============================================================================

export const grade4MatematicaSimulacro3Practices: Practice[] = [
  // ==================== 1. EL SIMULACRO, CON SUS DATOS ======================
  {
    id: 'simulacro-problemas',
    title: 'Simulacro 1: problemas del simulacro',
    description:
      'Los problemas del simulacro con sus mismos datos: Leandro de vacaciones, la colección de Paula y las masitas de «Dos Pancitos».',
    emoji: '🧳',
    questions: [
      {
        id: 'sm1a',
        kind: 'reveal',
        emoji: '🏖️',
        prompt:
          'Durante las vacaciones Leandro gastó, cada día, $10.168 en comida, $1.609 en transporte y $20.024 en hospedaje. a) ¿Cuánto dinero gastó por día?',
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
        prompt: 'b) Si sus vacaciones duraron 15 días, ¿cuánto dinero gastó en total?',
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
        prompt: 'c) Si un día salió con $50.000, ¿cuánto dinero le sobró ese día?',
        hint: 'Lo que llevó menos lo que gastó en un día.',
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
            why: 'Incorrecto. Restaste 477.015 − 50.000 (el gasto de los 15 días). La pregunta es por UN día: 50.000 − 31.801.',
          },
        ],
      },
      {
        id: 'sm2a',
        kind: 'classify',
        prompt:
          'Paula completó 12 estantes con 36 libros de terror cada uno, 15 estantes con 28 de ciencia ficción cada uno y 3 estantes con 35 de poesía cada uno. a) ¿Cuántos libros hay de cada género? Uní cada cuenta con su género.',
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
          'Terror: 12 × 36 = 432. Ciencia ficción: 15 × 28 = 420. Poesía: 3 × 35 = 105.',
      },
      {
        id: 'sm2a2',
        kind: 'reveal',
        emoji: '👻',
        prompt: '¿Cuánto es 12 × 36? (los libros de terror)',
        hint: 'Podés partir el 12: 10 × 36 + 2 × 36.',
        options: [
          {
            text: '432',
            correct: true,
            why: '¡Correcto! 10 × 36 = 360 y 2 × 36 = 72; 360 + 72 = 432.',
          },
          {
            text: '48',
            why: 'Incorrecto. Sumaste 12 + 36. Son 12 estantes con 36 libros CADA UNO: se multiplica.',
          },
          {
            text: '360',
            why: 'Casi. Eso es 10 × 36. Faltan los otros 2 estantes (72 libros).',
          },
          {
            text: '396',
            why: 'Incorrecto. Eso es 11 × 36: te quedaste con un estante menos.',
          },
        ],
      },
      {
        id: 'sm2b',
        kind: 'reveal',
        emoji: '📚',
        prompt: 'b) ¿Cuántos libros tiene Paula en total?',
        hint: 'Sumá los libros de los tres géneros: 432 + 420 + 105.',
        options: [
          {
            text: '957 libros',
            correct: true,
            why: '¡Correcto! 432 + 420 + 105 = 957.',
          },
          {
            text: '852 libros',
            why: 'Incorrecto. Te faltó sumar los 105 de poesía.',
          },
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
      {
        id: 'sm3',
        kind: 'reveal',
        emoji: '🧁',
        prompt:
          'En la panadería «Dos Pancitos» quieren presentar las masitas en bandejas iguales. En cada bandeja entran 24 y en total tienen 13.224. ¿Cuántas bandejas necesitan?',
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
      {
        id: 'sm3-op',
        prompt: '¿Qué cuenta verifica que 13.224 ÷ 24 = 551 está bien?',
        options: [
          { text: '551 × 24 = 13.224', correct: true },
          { text: '551 + 24 = 13.224' },
          { text: '13.224 − 551 = 24' },
        ],
        explanation: 'La división se verifica con la multiplicación: cociente × divisor (+ resto) = dividendo.',
      },
    ],
  },

  // ======================== 2. GEOMETRÍA DEL SIMULACRO ======================
  {
    id: 'simulacro-geometria',
    title: 'Simulacro 1: geometría',
    description:
      'Circunferencias con compás, medir y construir ángulos con el transportador y clasificar triángulos según sus lados.',
    emoji: '📐',
    questions: [
      {
        id: 'sg-utiles',
        prompt: 'Para la parte de geometría, ¿qué útiles tenés que tener?',
        options: [
          { text: 'Lápiz con buena punta, compás, transportador y regla.', correct: true },
          { text: 'Lapicera, calculadora y tijera.' },
          { text: 'Solo una regla.' },
        ],
      },
      {
        id: 'sg-c1',
        kind: 'reveal',
        emoji: '⭕',
        prompt: 'Tenés que trazar una circunferencia de 5 cm de DIÁMETRO. ¿Cuánto abrís el compás?',
        hint: 'La abertura del compás es siempre el radio. ¿Qué relación hay entre el radio y el diámetro?',
        options: [
          {
            text: '2,5 cm',
            correct: true,
            why: '¡Correcto! El radio es la mitad del diámetro: 5 ÷ 2 = 2,5 cm. Pinchás el compás en el centro y trazás.',
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
        id: 'sg-c2',
        kind: 'reveal',
        emoji: '⭕',
        prompt: 'Ahora una circunferencia de 2 cm de RADIO. ¿Cuánto abrís el compás y cuánto va a medir su diámetro?',
        options: [
          {
            text: 'Abro 2 cm y el diámetro mide 4 cm.',
            correct: true,
            why: '¡Correcto! El compás se abre la medida del radio (2 cm) y el diámetro es el doble: 4 cm.',
          },
          {
            text: 'Abro 1 cm y el diámetro mide 2 cm.',
            why: 'Incorrecto. Eso sería si te dieran el diámetro. Acá te dan el radio: se abre 2 cm.',
          },
          {
            text: 'Abro 4 cm y el diámetro mide 2 cm.',
            why: 'Incorrecto. Al revés: el diámetro siempre es más largo que el radio (el doble).',
          },
        ],
      },
      {
        id: 'sg-c3',
        kind: 'drag',
        prompt: 'Completá.',
        segments: [
          'El ',
          ' es el segmento que une el centro con cualquier punto de la circunferencia. El ',
          ' pasa por el centro y une dos puntos de la circunferencia: mide el ',
          ' del radio.',
        ],
        blanks: ['radio', 'diámetro', 'doble'],
        bank: ['doble', 'radio', 'diámetro', 'triple', 'mitad'],
      },
      {
        id: 'sg-a1',
        kind: 'reveal',
        emoji: '📐',
        prompt:
          'En el transportador, el lado del ángulo está sobre el 0 de la DERECHA. Hay que trazar el otro lado para que mida 125°. ¿Qué número tenés que buscar y en qué escala?',
        hint: 'El transportador tiene dos filas de números. Usá la que empieza en 0 del lado donde está el lado del ángulo.',
        options: [
          {
            text: 'El 125 de la escala que arranca en 0 a la derecha (la de adentro).',
            correct: true,
            why: '¡Correcto! Se sigue la escala que empieza en 0 sobre el lado ya trazado. 125° queda pasando el 90, del lado izquierdo: es un ángulo obtuso, más «abierto» que una esquina.',
          },
          {
            text: 'El 125 de la otra escala, la que arranca en 0 a la izquierda.',
            why: 'Incorrecto. En esa escala, ese punto marca 55° desde la derecha: te quedaría un ángulo agudo. Fijate: 125° tiene que ser más abierto que 90°.',
          },
          {
            text: 'El 90.',
            why: 'Incorrecto. 90° es un ángulo recto; 125° es más grande.',
          },
        ],
      },
      {
        id: 'sg-a2',
        prompt: 'Si mediste un ángulo y te dio 55°, pero se ve más abierto que una esquina de la hoja, ¿qué pasó?',
        options: [
          { text: 'Leí la escala equivocada: en realidad mide 180° − 55° = 125°.', correct: true },
          { text: 'Está bien, mide 55°.' },
          { text: 'Mide 55° + 90° = 145°.' },
        ],
        explanation: 'Las dos escalas del transportador suman 180°. Siempre controlá: si es más abierto que 90°, tiene que dar más de 90°.',
      },
      {
        id: 'sg-a3',
        kind: 'classify',
        prompt: 'Clasificá los ángulos del simulacro (y algunos más).',
        categories: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
        items: [
          { text: '80°', category: 'Agudo' },
          { text: '35°', category: 'Agudo' },
          { text: '90°', category: 'Recto' },
          { text: '125°', category: 'Obtuso' },
          { text: '164°', category: 'Obtuso' },
          { text: '180°', category: 'Llano' },
        ],
        explanation: 'Agudo: menos de 90°. Recto: 90°. Obtuso: entre 90° y 180°. Llano: 180°.',
      },
      {
        id: 'sg-a4',
        kind: 'reveal',
        emoji: '✏️',
        prompt: 'Para construir un ángulo de 80° en la carpeta, ¿cuál es el orden correcto?',
        options: [
          {
            text: 'Trazo un lado con la regla, apoyo el centro del transportador en el vértice con el 0 sobre el lado, marco 80 y uno el vértice con la marca.',
            correct: true,
            why: '¡Correcto! Ese es el paso a paso. Al final controlá: 80° es agudo, tiene que verse un poco más cerrado que una esquina.',
          },
          {
            text: 'Dibujo dos líneas cualquiera y escribo 80° en el medio.',
            why: 'Incorrecto. Hay que medirlo con el transportador para que realmente mida 80°.',
          },
          {
            text: 'Apoyo el borde del transportador (no el centro) en el vértice.',
            why: 'Incorrecto. El centro del transportador (la marquita del medio) va justo sobre el vértice.',
          },
        ],
      },
      {
        id: 'sg-a5',
        prompt: 'Construiste un ángulo de 164°. ¿Cómo se tiene que ver?',
        options: [
          { text: 'Muy abierto, casi una línea recta.', correct: true },
          { text: 'Como la esquina de una hoja.' },
          { text: 'Muy cerrado, como una V finita.' },
        ],
        explanation: '164° es obtuso y está muy cerca de 180° (llano, una línea recta).',
      },
      {
        id: 'sg-t1',
        kind: 'classify',
        prompt: 'Clasificá los triángulos según sus lados.',
        categories: ['Escaleno', 'Isósceles', 'Equilátero'],
        items: [
          { text: 'tres lados distintos', category: 'Escaleno' },
          { text: 'lados de 3 cm, 4 cm y 6 cm', category: 'Escaleno' },
          { text: 'dos lados iguales', category: 'Isósceles' },
          { text: 'lados de 5 cm, 5 cm y 3 cm', category: 'Isósceles' },
          { text: 'tres lados iguales', category: 'Equilátero' },
          { text: 'lados de 4 cm, 4 cm y 4 cm', category: 'Equilátero' },
        ],
      },
      {
        id: 'sg-t2',
        kind: 'reveal',
        emoji: '🔺',
        prompt: 'El simulacro pide construir un triángulo con tres lados distintos. ¿Cómo se llama?',
        options: [
          { text: 'Escaleno', correct: true, why: '¡Correcto! Escaleno: sus tres lados miden distinto.' },
          { text: 'Isósceles', why: 'Incorrecto. El isósceles tiene DOS lados iguales.' },
          { text: 'Equilátero', why: 'Incorrecto. El equilátero tiene sus TRES lados iguales.' },
        ],
      },
      {
        id: 'sg-t3',
        kind: 'reveal',
        emoji: '🔺',
        prompt: 'Y el triángulo con dos lados iguales, ¿cómo se llama?',
        options: [
          { text: 'Isósceles', correct: true, why: '¡Correcto! Isósceles: dos lados iguales y uno distinto.' },
          { text: 'Escaleno', why: 'Incorrecto. El escaleno tiene los tres lados distintos.' },
          { text: 'Rectángulo', why: 'Incorrecto. «Rectángulo» es una clasificación según los ÁNGULOS (tiene uno recto), no según los lados.' },
        ],
      },
      {
        id: 'sg-t4',
        kind: 'reveal',
        emoji: '🧭',
        prompt: 'Para construir un triángulo isósceles con lados de 6 cm, 4 cm y 4 cm, ¿cómo usás el compás?',
        options: [
          {
            text: 'Trazo el lado de 6 cm; abro el compás 4 cm y hago un arco desde cada punta. Donde se cruzan los arcos está el tercer vértice.',
            correct: true,
            why: '¡Correcto! Los arcos marcan todos los puntos que están a 4 cm de cada punta; donde se cruzan está a 4 cm de las dos.',
          },
          {
            text: 'Abro el compás 6 cm y trazo una circunferencia completa.',
            why: 'Incorrecto. Con una circunferencia no se arma el triángulo: se usan dos arcos que se crucen.',
          },
          {
            text: 'No hace falta el compás: dibujo los lados a ojo.',
            why: 'Incorrecto. Con el compás nos aseguramos de que los lados midan exactamente 4 cm.',
          },
        ],
      },
    ],
  },

  // ===================== 3. OTRA VUELTA, CON OTROS NÚMEROS ==================
  {
    id: 'simulacro-otra-vuelta',
    title: 'Simulacro 2: otra vuelta con otros números',
    description: 'Problemas parecidos a los del simulacro, con otros datos, y más ángulos y circunferencias.',
    emoji: '🔁',
    questions: [
      {
        id: 'so1a',
        kind: 'reveal',
        emoji: '⛰️',
        prompt:
          'En su viaje, Marta gastó cada día $12.450 en comida, $2.380 en transporte y $18.735 en hospedaje. ¿Cuánto gastó por día?',
        options: [
          { text: '$33.565', correct: true, why: '¡Correcto! 12.450 + 2.380 + 18.735 = 33.565.' },
          { text: '$31.185', why: 'Incorrecto. Te faltó sumar el transporte ($2.380).' },
          { text: '$28.805', why: 'Incorrecto. Revisá: hay que sumar los tres gastos.' },
        ],
      },
      {
        id: 'so1b',
        kind: 'reveal',
        emoji: '📅',
        prompt: 'El viaje de Marta duró 12 días. ¿Cuánto gastó en total?',
        hint: '33.565 × 12 = 33.565 × 10 + 33.565 × 2.',
        options: [
          { text: '$402.780', correct: true, why: '¡Correcto! 335.650 + 67.130 = 402.780.' },
          { text: '$335.650', why: 'Casi. Eso es 10 días; faltan 2 días más ($67.130).' },
          { text: '$33.577', why: 'Incorrecto. Sumaste 12 en lugar de multiplicar.' },
        ],
      },
      {
        id: 'so1c',
        kind: 'reveal',
        emoji: '💵',
        prompt: 'Un día Marta salió con $40.000. ¿Cuánto le sobró ese día?',
        options: [
          { text: '$6.435', correct: true, why: '¡Correcto! 40.000 − 33.565 = 6.435.' },
          { text: '$73.565', why: 'Incorrecto. Sumaste; lo que sobra tiene que ser menos de lo que llevó.' },
          { text: '$7.565', why: 'Incorrecto. Revisá los préstamos de la resta. Verificá: 33.565 + 6.435 = 40.000.' },
        ],
      },
      {
        id: 'so2',
        kind: 'reveal',
        emoji: '📚',
        prompt:
          'Tomás tiene 8 estantes con 45 historietas cada uno, 14 estantes con 32 novelas cada uno y 5 estantes con 27 libros de chistes cada uno. ¿Cuántos libros tiene en total?',
        hint: 'Primero calculá cada género por separado y después sumá.',
        options: [
          {
            text: '943 libros',
            correct: true,
            why: '¡Correcto! 8 × 45 = 360; 14 × 32 = 448; 5 × 27 = 135. 360 + 448 + 135 = 943.',
          },
          { text: '104 libros', why: 'Incorrecto. Sumaste un estante de cada uno (45 + 32 + 27). Hay que multiplicar por la cantidad de estantes.' },
          { text: '808 libros', why: 'Incorrecto. Te faltó sumar los 135 libros de chistes.' },
          { text: '27 libros', why: 'Incorrecto. 27 es la cantidad de estantes (8 + 14 + 5).' },
        ],
      },
      {
        id: 'so3',
        kind: 'reveal',
        emoji: '🍫',
        prompt: 'Una fábrica tiene 14.112 alfajores y los guarda en cajas de 18. ¿Cuántas cajas llena?',
        options: [
          { text: '784 cajas', correct: true, why: '¡Correcto! 14.112 ÷ 18 = 784. Verificación: 784 × 18 = 14.112.' },
          { text: '254.016 cajas', why: 'Incorrecto. Multiplicaste. Repartir en cajas es dividir.' },
          { text: '84 cajas', why: 'Casi. Te faltó una cifra en el cociente: 84 × 18 = 1.512.' },
        ],
      },
      {
        id: 'so4',
        prompt: 'Una circunferencia tiene 8 cm de diámetro. ¿Cuánto mide su radio?',
        options: [{ text: '4 cm', correct: true }, { text: '16 cm' }, { text: '8 cm' }],
        explanation: 'El radio es la mitad del diámetro: 8 ÷ 2 = 4 cm.',
      },
      {
        id: 'so5',
        prompt: 'Una circunferencia tiene 3 cm de radio. ¿Cuánto mide su diámetro?',
        options: [{ text: '6 cm', correct: true }, { text: '1,5 cm' }, { text: '3 cm' }],
        explanation: 'El diámetro es el doble del radio: 3 × 2 = 6 cm.',
      },
      {
        id: 'so6',
        kind: 'classify',
        prompt: 'Clasificá los ángulos.',
        categories: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
        items: [
          { text: '45°', category: 'Agudo' },
          { text: '15°', category: 'Agudo' },
          { text: '90°', category: 'Recto' },
          { text: '100°', category: 'Obtuso' },
          { text: '150°', category: 'Obtuso' },
          { text: '180°', category: 'Llano' },
        ],
      },
      {
        id: 'so7',
        prompt: 'Con el transportador mediste 40° en una escala. ¿Cuánto marca la otra escala en ese mismo punto?',
        options: [{ text: '140°', correct: true }, { text: '40°' }, { text: '50°' }],
        explanation: 'Las dos escalas suman 180°: 180 − 40 = 140. Por eso hay que elegir bien la escala.',
      },
      {
        id: 'so8',
        prompt: 'Un triángulo tiene lados de 7 cm, 7 cm y 7 cm. ¿Cómo es según sus lados?',
        options: [{ text: 'Equilátero', correct: true }, { text: 'Isósceles' }, { text: 'Escaleno' }],
      },
      {
        id: 'so9',
        prompt: 'Un triángulo tiene lados de 5 cm, 8 cm y 10 cm. ¿Cómo es según sus lados?',
        options: [{ text: 'Escaleno', correct: true }, { text: 'Isósceles' }, { text: 'Equilátero' }],
      },
    ],
  },
]
