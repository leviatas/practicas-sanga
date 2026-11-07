import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Matemática — "Alto en el camino III" (18/11)
// Temario del 3er trimestre (libro: capítulos 8, 9, 16 y 17):
//  1) Problemas con varias operaciones y diversidad de datos.
//  2) Circunferencia y círculo: compás, radio y diámetro, figuras con
//     circunferencias, la circunferencia como conjunto de puntos.
//  3) Ángulos: medición con transportador y clasificación.
//  4) Triángulos: construcción a partir de sus lados, propiedad triangular y
//     clasificación según sus lados y sus ángulos.
//
// Igual que la 2da Trimestral, la mayoría son kind 'reveal': al tocar una
// opción se despliega el por qué.
// ============================================================================

export const grade4MatematicaAlto3Practices: Practice[] = [
  // ================== 1. PROBLEMAS CON VARIAS OPERACIONES ==================
  {
    id: 'problemas-varias-operaciones',
    title: 'Problemas con varias operaciones',
    description:
      'Problemas de varios pasos: elegir los datos que sirven y las operaciones que hay que hacer.',
    emoji: '🧮',
    questions: [
      {
        id: 'pr1',
        kind: 'reveal',
        emoji: '🍪',
        prompt:
          'Sofía compró 4 paquetes de galletitas a $350 cada uno y pagó con $2.000. ¿Cuánto le dieron de vuelto?',
        hint: 'Primero calculá cuánto gastó en total y después restalo de lo que pagó.',
        options: [
          {
            text: '$600',
            correct: true,
            why: '¡Correcto! 4 × 350 = 1.400 y 2.000 − 1.400 = 600.',
          },
          {
            text: '$1.400',
            why: 'Incorrecto. $1.400 es lo que gastó, no el vuelto. Falta restarlo de $2.000.',
          },
          {
            text: '$1.650',
            why: 'Incorrecto. Restaste el precio de un solo paquete; compró 4.',
          },
          {
            text: '$3.400',
            why: 'Incorrecto. Sumaste en lugar de restar: el vuelto tiene que ser menos de lo que pagó.',
          },
        ],
      },
      {
        id: 'pr2',
        kind: 'reveal',
        emoji: '🚌',
        prompt:
          'Para una excursión van 96 chicos y 8 maestras. En cada micro entran 26 personas. ¿Cuántos micros hacen falta como mínimo?',
        hint: 'Sumá chicos y maestras, y pensá qué pasa si sobra gente después de dividir.',
        options: [
          {
            text: '4 micros',
            correct: true,
            why: '¡Correcto! 96 + 8 = 104 personas y 104 ÷ 26 = 4 justo.',
          },
          {
            text: '3 micros',
            why: 'Incorrecto. En 3 micros entran 78 personas y son 104.',
          },
          {
            text: '5 micros',
            why: 'Casi. Con 5 alcanza, pero la pregunta es el mínimo: 4 × 26 = 104, ya entran todos.',
          },
          {
            text: '104 micros',
            why: 'Incorrecto. 104 es la cantidad de personas, no de micros.',
          },
        ],
      },
      {
        id: 'pr3',
        kind: 'reveal',
        emoji: '📚',
        prompt:
          'En la biblioteca hay 5 estantes con 48 libros cada uno. Se prestaron 37 libros y llegaron 25 nuevos. ¿Cuántos libros hay ahora?',
        options: [
          {
            text: '228',
            correct: true,
            why: '¡Correcto! 5 × 48 = 240; 240 − 37 = 203; 203 + 25 = 228.',
          },
          {
            text: '240',
            why: 'Incorrecto. Esos eran los libros del principio; faltan los que se prestaron y los que llegaron.',
          },
          {
            text: '252',
            why: 'Incorrecto. Parece que sumaste los prestados en lugar de restarlos, o restaste los que llegaron.',
          },
          {
            text: '203',
            why: 'Casi. Restaste los prestados pero te olvidaste de sumar los 25 nuevos.',
          },
        ],
      },
      {
        id: 'pr4',
        kind: 'reveal',
        emoji: '🎂',
        prompt:
          'Martín tiene 9 años y mide 1,35 m. Su abuela tiene 7 veces su edad. ¿Cuántos años tiene la abuela?',
        hint: 'No todos los datos sirven: ¿hace falta la altura para responder?',
        options: [
          {
            text: '63 años',
            correct: true,
            why: '¡Correcto! 9 × 7 = 63. La altura es un dato que no hace falta para esta pregunta.',
          },
          {
            text: '16 años',
            why: 'Incorrecto. Sumaste 9 + 7; «7 veces» significa multiplicar.',
          },
          {
            text: '9,45 años',
            why: 'Incorrecto. Usaste la altura, que no tiene nada que ver con la edad.',
          },
        ],
      },
      {
        id: 'pr5',
        kind: 'reveal',
        emoji: '🍕',
        prompt:
          'Para un cumpleaños se pidieron 6 pizzas de 8 porciones. Comieron 39 porciones. ¿Cuántas porciones sobraron?',
        options: [
          { text: '9', correct: true, why: '¡Correcto! 6 × 8 = 48 porciones y 48 − 39 = 9.' },
          { text: '33', why: 'Incorrecto. Restaste 39 − 6; primero hay que calcular cuántas porciones había.' },
          { text: '48', why: 'Incorrecto. 48 eran todas las porciones; faltó restar las que comieron.' },
          { text: '87', why: 'Incorrecto. Sumaste 48 + 39: si comieron, tiene que quedar menos.' },
        ],
      },
      {
        id: 'pr6',
        kind: 'reveal',
        emoji: '🖍️',
        prompt:
          'Una caja trae 12 lápices. La maestra tiene 150 lápices para repartir en cajas. ¿Cuántas cajas completa y cuántos lápices sobran?',
        options: [
          {
            text: '12 cajas y sobran 6 lápices',
            correct: true,
            why: '¡Correcto! 12 × 12 = 144 y 150 − 144 = 6. En la división 150 ÷ 12 el cociente es 12 y el resto es 6.',
          },
          {
            text: '13 cajas y no sobra nada',
            why: 'Incorrecto. 13 × 12 = 156: no alcanzan los lápices para 13 cajas.',
          },
          {
            text: '12 cajas y sobran 12 lápices',
            why: 'Incorrecto. Si sobraran 12 lápices se podría llenar otra caja. El resto siempre es menor que el divisor.',
          },
        ],
      },
      {
        id: 'pr7',
        kind: 'reveal',
        emoji: '🧾',
        prompt:
          '¿Qué cálculo resuelve el problema? «Compré 3 cuadernos de $800 y 2 lapiceras de $450.»',
        options: [
          {
            text: '3 × 800 + 2 × 450',
            correct: true,
            why: '¡Correcto! Se calcula lo de los cuadernos (2.400), lo de las lapiceras (900) y se suma: $3.300.',
          },
          {
            text: '3 + 800 + 2 + 450',
            why: 'Incorrecto. La cantidad de cosas se multiplica por su precio, no se suma.',
          },
          {
            text: '(3 + 2) × 800',
            why: 'Incorrecto. Las lapiceras no cuestan $800.',
          },
        ],
      },
      {
        id: 'pr8',
        kind: 'reveal',
        emoji: '🚲',
        prompt:
          'Lucía ahorra $500 por semana para una bici de $9.000. Ya tiene $3.500. ¿Cuántas semanas más tiene que ahorrar?',
        hint: 'Calculá cuánto le falta y después cuántas veces entra 500 en eso.',
        options: [
          {
            text: '11 semanas',
            correct: true,
            why: '¡Correcto! Le faltan 9.000 − 3.500 = 5.500 y 5.500 ÷ 500 = 11.',
          },
          {
            text: '18 semanas',
            why: 'Incorrecto. 9.000 ÷ 500 = 18 sería si no tuviera nada ahorrado; ya tiene $3.500.',
          },
          {
            text: '7 semanas',
            why: 'Incorrecto. 3.500 ÷ 500 = 7 son las semanas que ya ahorró, no las que le faltan.',
          },
        ],
      },
    ],
  },

  // ================== 2. CIRCUNFERENCIA Y CÍRCULO ==========================
  {
    id: 'circunferencia-circulo',
    title: 'Circunferencia, círculo y compás',
    description:
      'Radio y diámetro, uso del compás, diferencia entre círculo y circunferencia y figuras con circunferencias.',
    emoji: '⭕',
    questions: [
      {
        id: 'ci1',
        kind: 'reveal',
        emoji: '⭕',
        prompt: '¿Qué es una circunferencia?',
        options: [
          {
            text: 'La línea formada por todos los puntos que están a la misma distancia de un punto llamado centro.',
            correct: true,
            why: '¡Correcto! Es solo el «borde»: todos sus puntos están a la misma distancia (el radio) del centro.',
          },
          {
            text: 'Toda la superficie, el borde y lo de adentro.',
            why: 'Incorrecto. Eso es el círculo. La circunferencia es solo la línea del borde.',
          },
          {
            text: 'Una figura con muchos lados iguales.',
            why: 'Incorrecto. La circunferencia no tiene lados: es una línea curva cerrada.',
          },
        ],
      },
      {
        id: 'ci2',
        kind: 'reveal',
        emoji: '🟠',
        prompt: '¿Qué es un círculo?',
        options: [
          {
            text: 'La circunferencia junto con todos los puntos de adentro: los que están a una distancia del centro menor o igual que el radio.',
            correct: true,
            why: '¡Correcto! El círculo es la «superficie» y la circunferencia es su borde.',
          },
          {
            text: 'Solo la línea curva del borde.',
            why: 'Incorrecto. Esa es la circunferencia.',
          },
          {
            text: 'Los puntos que están más lejos del centro que el radio.',
            why: 'Incorrecto. Esos puntos están afuera del círculo.',
          },
        ],
      },
      {
        id: 'ci-clas1',
        kind: 'classify',
        prompt: '¿Se parece más a una circunferencia (borde) o a un círculo (superficie)?',
        categories: ['Circunferencia', 'Círculo'],
        items: [
          { text: 'un aro de básquet', category: 'Circunferencia' },
          { text: 'un anillo', category: 'Circunferencia' },
          { text: 'el borde de un vaso', category: 'Circunferencia' },
          { text: 'una moneda', category: 'Círculo' },
          { text: 'una pizza', category: 'Círculo' },
          { text: 'un CD', category: 'Círculo' },
        ],
      },
      {
        id: 'ci3',
        prompt: '¿Qué es el radio?',
        options: [
          { text: 'El segmento que une el centro con cualquier punto de la circunferencia.', correct: true },
          { text: 'El segmento que une dos puntos de la circunferencia pasando por el centro.' },
          { text: 'La línea curva del borde.' },
        ],
      },
      {
        id: 'ci4',
        prompt: '¿Qué es el diámetro?',
        options: [
          { text: 'El segmento que une dos puntos de la circunferencia pasando por el centro.', correct: true },
          { text: 'El segmento que va del centro al borde.' },
          { text: 'El punto del medio.' },
        ],
        explanation: 'El diámetro mide el doble que el radio.',
      },
      {
        id: 'ci5',
        kind: 'reveal',
        emoji: '📏',
        prompt: 'Una circunferencia tiene 4 cm de radio. ¿Cuánto mide su diámetro?',
        options: [
          { text: '8 cm', correct: true, why: '¡Correcto! El diámetro es el doble del radio: 4 × 2 = 8 cm.' },
          { text: '2 cm', why: 'Incorrecto. Calculaste la mitad; el diámetro es el doble del radio.' },
          { text: '4 cm', why: 'Incorrecto. Esa es la medida del radio.' },
        ],
      },
      {
        id: 'ci6',
        kind: 'reveal',
        emoji: '🧭',
        prompt: 'Querés dibujar con el compás una circunferencia de 10 cm de DIÁMETRO. ¿Cuánto tenés que abrir el compás?',
        hint: 'La abertura del compás es la distancia del centro (la punta) al borde (la mina).',
        options: [
          {
            text: '5 cm',
            correct: true,
            why: '¡Correcto! La abertura del compás es el radio, y el radio es la mitad del diámetro: 10 ÷ 2 = 5 cm.',
          },
          {
            text: '10 cm',
            why: 'Incorrecto. Con 10 cm de abertura el radio sería 10 y el diámetro 20 cm.',
          },
          {
            text: '20 cm',
            why: 'Incorrecto. Esa abertura daría una circunferencia enorme, de 40 cm de diámetro.',
          },
        ],
      },
      {
        id: 'ci7',
        prompt: 'Al usar el compás, ¿dónde se apoya la punta de metal (el pinche)?',
        options: [
          { text: 'En el centro de la circunferencia.', correct: true },
          { text: 'En cualquier punto del borde.' },
          { text: 'Afuera de la hoja.' },
        ],
      },
      {
        id: 'ci8',
        kind: 'reveal',
        emoji: '📍',
        prompt:
          'Un punto P está a 3 cm del centro de una circunferencia de 5 cm de radio. ¿Dónde está P?',
        options: [
          {
            text: 'Adentro del círculo, pero no sobre la circunferencia.',
            correct: true,
            why: '¡Correcto! 3 cm es menos que el radio (5 cm), así que el punto queda adentro.',
          },
          {
            text: 'Sobre la circunferencia.',
            why: 'Incorrecto. Para estar sobre la circunferencia tendría que estar a 5 cm exactos del centro.',
          },
          {
            text: 'Afuera del círculo.',
            why: 'Incorrecto. Para estar afuera tendría que estar a más de 5 cm del centro.',
          },
        ],
      },
      {
        id: 'ci-clas2',
        kind: 'classify',
        prompt:
          'Circunferencia de centro O y 3 cm de radio. Clasificá cada punto según su distancia a O.',
        categories: ['Adentro', 'Sobre la circunferencia', 'Afuera'],
        items: [
          { text: 'A, a 1 cm de O', category: 'Adentro' },
          { text: 'B, a 2 cm de O', category: 'Adentro' },
          { text: 'C, a 3 cm de O', category: 'Sobre la circunferencia' },
          { text: 'D, a 3 cm de O', category: 'Sobre la circunferencia' },
          { text: 'E, a 4 cm de O', category: 'Afuera' },
          { text: 'F, a 6 cm de O', category: 'Afuera' },
        ],
      },
      {
        id: 'ci9',
        kind: 'reveal',
        emoji: '🎯',
        prompt:
          'Dentro de un cuadrado de 6 cm de lado se dibuja la circunferencia más grande posible, que toca los 4 lados. ¿Cuánto mide su radio?',
        hint: 'El diámetro entra justo de un lado al otro del cuadrado.',
        options: [
          {
            text: '3 cm',
            correct: true,
            why: '¡Correcto! El diámetro mide lo mismo que el lado (6 cm), así que el radio es 6 ÷ 2 = 3 cm.',
          },
          { text: '6 cm', why: 'Incorrecto. 6 cm es el diámetro; el radio es la mitad.' },
          { text: '12 cm', why: 'Incorrecto. Con ese radio la circunferencia no entraría en el cuadrado.' },
        ],
      },
      {
        id: 'ci10',
        kind: 'reveal',
        emoji: '⚪',
        prompt:
          'Se dibujan 3 circunferencias iguales en fila, cada una tocando a la siguiente. Cada una tiene 2 cm de radio. ¿Cuánto mide la fila de punta a punta?',
        options: [
          {
            text: '12 cm',
            correct: true,
            why: '¡Correcto! Cada diámetro mide 4 cm y son 3: 3 × 4 = 12 cm.',
          },
          { text: '6 cm', why: 'Incorrecto. Sumaste 3 radios; de punta a punta hay 3 diámetros.' },
          { text: '8 cm', why: 'Incorrecto. Revisá: cada circunferencia ocupa un diámetro completo (4 cm).' },
        ],
      },
      {
        id: 'ci11',
        prompt: '¿Cuántos radios se le pueden trazar a una circunferencia?',
        options: [
          { text: 'Infinitos, y todos miden lo mismo.', correct: true },
          { text: 'Solo uno.' },
          { text: 'Cuatro, uno para cada lado.' },
        ],
      },
    ],
  },

  // ================== 3. ÁNGULOS ===========================================
  {
    id: 'angulos-transportador',
    title: 'Ángulos y transportador',
    description: 'Medir con el transportador y clasificar ángulos en agudos, rectos, obtusos y llanos.',
    emoji: '📐',
    questions: [
      {
        id: 'an-clas1',
        kind: 'classify',
        prompt: 'Clasificá cada ángulo según su medida.',
        categories: ['Agudo', 'Recto', 'Obtuso', 'Llano'],
        items: [
          { text: '30°', category: 'Agudo' },
          { text: '75°', category: 'Agudo' },
          { text: '89°', category: 'Agudo' },
          { text: '90°', category: 'Recto' },
          { text: '91°', category: 'Obtuso' },
          { text: '120°', category: 'Obtuso' },
          { text: '160°', category: 'Obtuso' },
          { text: '180°', category: 'Llano' },
        ],
      },
      {
        id: 'an1',
        prompt: '¿Cómo es un ángulo agudo?',
        options: [
          { text: 'Mide menos de 90°.', correct: true },
          { text: 'Mide exactamente 90°.' },
          { text: 'Mide más de 90° y menos de 180°.' },
        ],
      },
      {
        id: 'an2',
        prompt: '¿Cómo es un ángulo obtuso?',
        options: [
          { text: 'Mide más de 90° y menos de 180°.', correct: true },
          { text: 'Mide menos de 90°.' },
          { text: 'Mide 180°.' },
        ],
      },
      {
        id: 'an3',
        prompt: '¿Cuánto mide un ángulo recto?',
        options: [{ text: '90°', correct: true }, { text: '180°' }, { text: '45°' }, { text: '100°' }],
        explanation: 'Es el ángulo de las esquinas de una hoja o de un cuadrado.',
      },
      {
        id: 'an4',
        prompt: '¿Cuánto mide un ángulo llano?',
        options: [{ text: '180°', correct: true }, { text: '90°' }, { text: '360°' }],
        explanation: 'Sus dos lados forman una línea recta.',
      },
      {
        id: 'an5',
        kind: 'reveal',
        emoji: '🕒',
        prompt: 'Las agujas del reloj marcan las 3 en punto. ¿Qué ángulo forman?',
        options: [
          { text: 'Recto (90°)', correct: true, why: '¡Correcto! A las 3 las agujas forman una «L»: un ángulo recto.' },
          { text: 'Llano (180°)', why: 'Incorrecto. El ángulo llano se forma a las 6, cuando las agujas quedan en línea recta.' },
          { text: 'Agudo', why: 'Incorrecto. Un ángulo agudo se forma, por ejemplo, a la 1.' },
        ],
      },
      {
        id: 'an6',
        kind: 'reveal',
        emoji: '📐',
        prompt: '¿Cómo se usa correctamente el transportador para medir un ángulo?',
        options: [
          {
            text: 'Se pone el centro del transportador en el vértice y la línea del 0° sobre uno de los lados; se lee dónde pasa el otro lado.',
            correct: true,
            why: '¡Correcto! Vértice en el centro, un lado sobre el 0° y se lee la medida en la escala que empieza en ese 0°.',
          },
          {
            text: 'Se apoya el transportador en cualquier lugar del ángulo y se lee el número más grande.',
            why: 'Incorrecto. Si el centro no está en el vértice, la medida sale mal.',
          },
          {
            text: 'Se mide el largo de los lados con la regla.',
            why: 'Incorrecto. La medida de un ángulo no depende del largo de sus lados, sino de su abertura.',
          },
        ],
      },
      {
        id: 'an7',
        kind: 'reveal',
        emoji: '🔍',
        prompt:
          'Al medir un ángulo que claramente es agudo, Tomás leyó 140° en el transportador. ¿Qué pasó?',
        hint: 'El transportador tiene dos escalas de números: una de izquierda a derecha y otra al revés.',
        options: [
          {
            text: 'Leyó la escala equivocada: el ángulo mide 40°.',
            correct: true,
            why: '¡Correcto! Las dos escalas suman 180°: 180 − 140 = 40. Si el ángulo es agudo, tiene que medir menos de 90°.',
          },
          {
            text: 'Está bien: los ángulos agudos pueden medir 140°.',
            why: 'Incorrecto. Un ángulo agudo mide menos de 90°.',
          },
          {
            text: 'El ángulo mide 14°.',
            why: 'Incorrecto. No se trata de sacar un cero; leyó la otra escala.',
          },
        ],
      },
      {
        id: 'an8',
        kind: 'reveal',
        emoji: '📏',
        prompt: 'Si alargamos los lados de un ángulo de 50° con la regla, ¿cuánto mide ahora?',
        options: [
          {
            text: 'Sigue midiendo 50°.',
            correct: true,
            why: '¡Correcto! La medida de un ángulo es su abertura; el largo de los lados no la cambia.',
          },
          { text: 'Más de 50°.', why: 'Incorrecto. Los lados más largos no abren más el ángulo.' },
          { text: 'Menos de 50°.', why: 'Incorrecto. La abertura no cambia.' },
        ],
      },
      {
        id: 'an9',
        prompt: '¿Con qué unidad se miden los ángulos?',
        options: [{ text: 'Grados (°)', correct: true }, { text: 'Centímetros (cm)' }, { text: 'Litros (l)' }],
      },
      {
        id: 'an10',
        prompt: '¿Cómo se llama el punto donde se juntan los dos lados de un ángulo?',
        options: [{ text: 'Vértice', correct: true }, { text: 'Centro' }, { text: 'Radio' }],
      },
    ],
  },

  // ================== 4. TRIÁNGULOS ========================================
  {
    id: 'triangulos',
    title: 'Triángulos: construcción, propiedad triangular y clasificación',
    description:
      'Cuándo se puede construir un triángulo con tres lados, y cómo se clasifican según sus lados y sus ángulos.',
    emoji: '🔺',
    questions: [
      {
        id: 'tr1',
        kind: 'reveal',
        emoji: '🔺',
        prompt: '¿Qué dice la propiedad triangular?',
        options: [
          {
            text: 'Cada lado tiene que ser MENOR que la suma de los otros dos.',
            correct: true,
            why: '¡Correcto! Si un lado es igual o más largo que los otros dos juntos, los otros dos no llegan a tocarse y no se forma el triángulo.',
          },
          {
            text: 'Los tres lados tienen que ser iguales.',
            why: 'Incorrecto. Hay muchos triángulos con lados distintos.',
          },
          {
            text: 'Un lado tiene que ser más largo que la suma de los otros dos.',
            why: 'Incorrecto. Es al revés: cada lado tiene que ser menor que la suma de los otros dos.',
          },
        ],
      },
      {
        id: 'tr-clas1',
        kind: 'classify',
        prompt: '¿Se puede construir un triángulo con estos tres lados?',
        categories: ['Se puede', 'No se puede'],
        items: [
          { text: '3 cm, 4 cm, 5 cm', category: 'Se puede' },
          { text: '6 cm, 6 cm, 6 cm', category: 'Se puede' },
          { text: '5 cm, 5 cm, 8 cm', category: 'Se puede' },
          { text: '2 cm, 3 cm, 7 cm', category: 'No se puede' },
          { text: '4 cm, 4 cm, 8 cm', category: 'No se puede' },
          { text: '1 cm, 2 cm, 10 cm', category: 'No se puede' },
        ],
      },
      {
        id: 'tr2',
        kind: 'reveal',
        emoji: '🤔',
        prompt: '¿Se puede construir un triángulo con lados de 4 cm, 4 cm y 8 cm?',
        hint: 'Sumá los dos lados más cortos y comparalos con el más largo.',
        options: [
          {
            text: 'No, porque 4 + 4 = 8 y no es mayor que el lado de 8 cm.',
            correct: true,
            why: '¡Correcto! Los lados cortos quedarían «acostados» sobre el lado largo y no se forma ninguna punta.',
          },
          {
            text: 'Sí, porque tiene dos lados iguales.',
            why: 'Incorrecto. Tener lados iguales no alcanza: hay que verificar la propiedad triangular.',
          },
          {
            text: 'Sí, cualquier medida sirve.',
            why: 'Incorrecto. No con cualquier medida se puede formar un triángulo.',
          },
        ],
      },
      {
        id: 'tr3',
        kind: 'reveal',
        emoji: '🧭',
        prompt:
          'Para construir un triángulo de lados 6 cm, 4 cm y 5 cm con regla y compás, ¿cuál es el procedimiento correcto?',
        options: [
          {
            text: 'Trazo el lado de 6 cm; desde un extremo abro el compás 4 cm y desde el otro 5 cm; donde se cruzan los arcos está el tercer vértice.',
            correct: true,
            why: '¡Correcto! El punto donde se cruzan los arcos está a 4 cm de un extremo y a 5 cm del otro: es el vértice que falta.',
          },
          {
            text: 'Trazo los tres lados con la regla en cualquier dirección.',
            why: 'Incorrecto. Así los lados casi nunca coinciden en las puntas.',
          },
          {
            text: 'Dibujo una circunferencia de 6 cm de radio y listo.',
            why: 'Incorrecto. Con una sola circunferencia no se ubica el tercer vértice.',
          },
        ],
      },
      {
        id: 'tr-clas2',
        kind: 'classify',
        prompt: 'Clasificá los triángulos según sus LADOS.',
        categories: ['Equilátero', 'Isósceles', 'Escaleno'],
        items: [
          { text: '5 cm, 5 cm, 5 cm', category: 'Equilátero' },
          { text: '3 cm, 3 cm, 3 cm', category: 'Equilátero' },
          { text: '6 cm, 6 cm, 4 cm', category: 'Isósceles' },
          { text: '7 cm, 3 cm, 7 cm', category: 'Isósceles' },
          { text: '3 cm, 4 cm, 5 cm', category: 'Escaleno' },
          { text: '6 cm, 8 cm, 9 cm', category: 'Escaleno' },
        ],
      },
      {
        id: 'tr4',
        prompt: '¿Cómo es un triángulo equilátero?',
        options: [
          { text: 'Tiene los tres lados iguales.', correct: true },
          { text: 'Tiene dos lados iguales.' },
          { text: 'Tiene los tres lados distintos.' },
        ],
      },
      {
        id: 'tr5',
        prompt: '¿Cómo es un triángulo isósceles?',
        options: [
          { text: 'Tiene al menos dos lados iguales.', correct: true },
          { text: 'Tiene los tres lados distintos.' },
          { text: 'Tiene un ángulo recto.' },
        ],
      },
      {
        id: 'tr6',
        prompt: '¿Cómo es un triángulo escaleno?',
        options: [
          { text: 'Tiene los tres lados distintos.', correct: true },
          { text: 'Tiene los tres lados iguales.' },
          { text: 'Tiene dos lados iguales.' },
        ],
      },
      {
        id: 'tr-clas3',
        kind: 'classify',
        prompt: 'Clasificá los triángulos según sus ÁNGULOS.',
        categories: ['Acutángulo', 'Rectángulo', 'Obtusángulo'],
        items: [
          { text: '60°, 60°, 60°', category: 'Acutángulo' },
          { text: '70°, 50°, 60°', category: 'Acutángulo' },
          { text: '90°, 45°, 45°', category: 'Rectángulo' },
          { text: '90°, 30°, 60°', category: 'Rectángulo' },
          { text: '120°, 30°, 30°', category: 'Obtusángulo' },
          { text: '100°, 50°, 30°', category: 'Obtusángulo' },
        ],
      },
      {
        id: 'tr7',
        kind: 'reveal',
        emoji: '📐',
        prompt: '¿Qué es un triángulo rectángulo?',
        options: [
          { text: 'Un triángulo que tiene un ángulo recto (90°).', correct: true, why: '¡Correcto! Como la esquina de una escuadra.' },
          { text: 'Un triángulo con forma de rectángulo.', why: 'Incorrecto. Un triángulo tiene 3 lados; el nombre viene de su ángulo recto.' },
          { text: 'Un triángulo con los tres ángulos agudos.', why: 'Incorrecto. Ese es el acutángulo.' },
        ],
      },
      {
        id: 'tr8',
        kind: 'reveal',
        emoji: '🔺',
        prompt: '¿Qué es un triángulo obtusángulo?',
        options: [
          { text: 'Un triángulo que tiene un ángulo obtuso (más de 90°).', correct: true, why: '¡Correcto! Tiene un ángulo «abierto», de más de 90°.' },
          { text: 'Un triángulo con los tres ángulos obtusos.', why: 'Incorrecto. Un triángulo solo puede tener UN ángulo obtuso.' },
          { text: 'Un triángulo con un ángulo de 90°.', why: 'Incorrecto. Ese es el rectángulo.' },
        ],
      },
      {
        id: 'tr9',
        kind: 'reveal',
        emoji: '🔢',
        prompt: '¿Cuánto suman los tres ángulos de cualquier triángulo?',
        options: [
          { text: '180°', correct: true, why: '¡Correcto! En todos los triángulos, los tres ángulos suman 180°.' },
          { text: '360°', why: 'Incorrecto. 360° suman los ángulos de un cuadrilátero.' },
          { text: '90°', why: 'Incorrecto. 90° es solo un ángulo recto.' },
        ],
      },
      {
        id: 'tr10',
        kind: 'reveal',
        emoji: '❓',
        prompt: 'Un triángulo tiene ángulos de 90° y 40°. ¿Cuánto mide el tercer ángulo?',
        hint: 'Los tres ángulos tienen que sumar 180°.',
        options: [
          { text: '50°', correct: true, why: '¡Correcto! 90 + 40 = 130 y 180 − 130 = 50.' },
          { text: '130°', why: 'Incorrecto. 130° es lo que suman los dos ángulos que ya conocés.' },
          { text: '230°', why: 'Incorrecto. Ningún ángulo de un triángulo puede medir más de 180°.' },
        ],
      },
      {
        id: 'tr11',
        kind: 'reveal',
        emoji: '🔺',
        prompt: 'Un triángulo equilátero, ¿cómo es según sus ángulos?',
        options: [
          {
            text: 'Acutángulo: sus tres ángulos miden 60°.',
            correct: true,
            why: '¡Correcto! Los tres ángulos son iguales y suman 180°: 180 ÷ 3 = 60°, que es agudo.',
          },
          { text: 'Rectángulo.', why: 'Incorrecto. Ninguno de sus ángulos mide 90°.' },
          { text: 'Obtusángulo.', why: 'Incorrecto. Ninguno de sus ángulos mide más de 90°.' },
        ],
      },
      {
        id: 'tr12',
        prompt: 'Un triángulo tiene lados de 5 cm, 5 cm y 8 cm y un ángulo de 106°. ¿Cómo se clasifica?',
        options: [
          { text: 'Isósceles obtusángulo', correct: true },
          { text: 'Escaleno rectángulo' },
          { text: 'Equilátero acutángulo' },
        ],
        explanation: 'Tiene dos lados iguales (isósceles) y un ángulo de más de 90° (obtusángulo).',
      },
    ],
  },
]
