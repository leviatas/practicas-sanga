import type { Practice } from '../types'

// ============================================================================
// 4to GRADO — Matemática
// 2da Trimestral → dos prácticas:
//
// 1) "Estrategias de cálculo de multiplicación y división", que agrupa
//    directamente todas las preguntas:
//      · Multiplicar por 10 y por 100
//      · Descomponer un factor para multiplicar (propiedad distributiva)
//      · Dividir separando el dividendo en partes fáciles
//
// 2) "Relaciones multiplicativas con el cuadro de multiplicaciones": dobles,
//    triples, mitades, sumar columnas y la propiedad conmutativa. Cada
//    pregunta trae además una `hint` (pista plegable) para pensarla antes de
//    tocar una opción.
//
// Dentro de cada práctica van TODAS las preguntas juntas (sin separar por
// tema): la app las baraja en cada ronda.
//
// Formato: kind 'reveal'. La pregunta va de encabezado y abajo las opciones
// SIN indicar cuál es la correcta; al tocar una se despliega su explicación
// (`why`) en verde si es la correcta o en gris si no lo es.
//
// Las consignas y las explicaciones son las de las fichas de práctica
// (carpeta practicaMATE), con los signos × y ÷ bien escritos.
// ============================================================================

export const grade4MatematicaPractices: Practice[] = [
  {
    id: 'estrategias-calculo',
    title: 'Estrategias de cálculo de multiplicación y división',
    description:
      'Multiplicar por 10 y por 100, descomponer para multiplicar y dividir separando el número en partes fáciles.',
    emoji: '🧠',
    questions: [
      {
        id: 'm10-35',
        kind: 'reveal',
        emoji: '⚡',
        prompt: '¿Cómo puedes calcular rápidamente cuánto es 35 por 10?',
        options: [
          {
            text: 'Sumar 10 treinta y cinco veces.',
            why: 'Incorrecto. Aunque da el resultado correcto, sumar tantas veces no es un truco rápido de cálculo mental.',
          },
          {
            text: 'Multiplicar 35 por 5 y luego duplicarlo.',
            why: 'Incorrecto. Esto es un rodeo innecesario; multiplicar por 10 es mucho más directo.',
          },
          {
            text: 'Escribir el número 35 y agregarle un cero al final, quedando 350.',
            correct: true,
            why: '¡Correcto! Al multiplicar un número por 10, sus valores suben de posición y solo necesitamos añadir un cero a la derecha.',
          },
          {
            text: 'Restar 10 a 35.',
            why: 'Incorrecto. Restar no tiene relación con una operación de multiplicación.',
          },
        ],
      },
      {
        id: 'm10-64',
        kind: 'reveal',
        emoji: '🔟',
        prompt:
          'Si tenés que calcular rápidamente cuánto es 64 × 10, ¿cuál es el resultado correcto y cómo lo descubrís?',
        options: [
          {
            text: '604',
            why: '¡Casi! Cuidado al colocar las cifras, recuerda que multiplicar por 10 no es solo intercalar un cero en medio del número.',
          },
          {
            text: '640',
            correct: true,
            why: '¡Excelente! Al multiplicar por 10, cada valor sube una posición y solo necesitamos agregar un cero al final del 64.',
          },
          {
            text: '6400',
            why: '¡Ups! Agregar dos ceros sería multiplicar por 100, no por 10. ¡A seguir practicando!',
          },
          {
            text: '630',
            why: 'Incorrecto. El número inicial era 64, por lo que el resultado debe mantener la base de 64 con su ajuste correspondiente.',
          },
        ],
      },
      {
        id: 'm100-6',
        kind: 'reveal',
        emoji: '💯',
        prompt:
          'Lucas tiene que resolver mentalmente 6 por 100. ¿Cuál es el resultado correcto y el truco para hallarlo?',
        options: [
          {
            text: 'El resultado es 60, porque se le quita un cero.',
            why: 'Incorrecto. Al multiplicar por 100 el valor aumenta, no disminuye ni se le quitan ceros.',
          },
          {
            text: 'El resultado es 106, porque se suma 100 más 6.',
            why: 'Incorrecto. Estás sumando en lugar de multiplicar.',
          },
          {
            text: 'El resultado es 6000, porque se agregan tres ceros.',
            why: 'Incorrecto. Agregar tres ceros sería multiplicar por 1000, no por 100.',
          },
          {
            text: 'El resultado es 600, porque al multiplicar por 100 se le agregan dos ceros al 6.',
            correct: true,
            why: '¡Correcto! Multiplicar por 100 significa que el 6 pasa a valer centenas, lo cual se logra añadiendo dos ceros a su derecha (600).',
          },
        ],
      },
      {
        id: 'm100-7',
        kind: 'reveal',
        emoji: '🚀',
        prompt:
          '¿Cuál es el resultado de resolver mentalmente 7 × 100 y cuál es el secreto para calcularlo al instante?',
        options: [
          {
            text: '70, porque se le quita un cero.',
            why: 'Incorrecto. Al multiplicar por 100 el valor crece muchísimo, no disminuye.',
          },
          {
            text: '107, porque se suma 100 y 7.',
            why: 'Incorrecto. Estás sumando en lugar de multiplicar. ¡Ojo con eso!',
          },
          {
            text: '7000, porque se agregan tres ceros.',
            why: 'Incorrecto. Agregar tres ceros correspondería a multiplicar por 1000.',
          },
          {
            text: '700, porque al multiplicar por 100 se le añaden dos ceros al 7.',
            correct: true,
            why: '¡Genial! Multiplicar por 100 significa que el 7 pasa a las centenas, así que solo agregamos dos ceros a su derecha.',
          },
        ],
      },
      {
        id: 'desc-13x4',
        kind: 'reveal',
        emoji: '🧠',
        prompt:
          'Sofía quiere calcular mentalmente 13 por 4 usando la descomposición. ¿Cómo puede separar el número 13 para hacerlo más fácil?',
        options: [
          {
            text: 'Separarlo en 10 + 3, para calcular (10 por 4) + (3 por 4).',
            correct: true,
            why: '¡Correcto! Separar el 13 en una decena y unidades (10 y 3) nos permite multiplicar por partes de forma muy sencilla: 40 + 12 = 52.',
          },
          {
            text: 'Separarlo en 6 por 7.',
            why: 'Incorrecto. Eso es otra multiplicación, no una descomposición en suma para aplicar la propiedad distributiva.',
          },
          {
            text: 'Separarlo en 3 + 1.',
            why: 'Incorrecto. 3 + 1 suma 4, lo cual cambiaría por completo el número 13 original.',
          },
          {
            text: 'Separarlo en 13 + 0.',
            why: 'Incorrecto. Esto deja el número exactamente igual y no ayuda a simplificar la cuenta.',
          },
        ],
      },
      {
        id: 'desc-14x6',
        kind: 'reveal',
        emoji: '✖️',
        prompt:
          'Si querés resolver mentalmente la multiplicación 14 × 6 usando la estrategia de descomposición en una suma, ¿qué operación representa mejor este truco?',
        options: [
          {
            text: '(14 + 6) × 2',
            why: 'Incorrecto. Esto transforma la operación en una suma de factores antes de multiplicar, lo cual altera el valor original.',
          },
          {
            text: '(10 × 4) + (4 × 6)',
            why: 'Incorrecto. Aquí se mezclaron mal los números de la descomposición y no corresponden a las partes de 14.',
          },
          {
            text: '(10 × 6) + (4 × 6)',
            correct: true,
            why: '¡Muy bien! Descomponemos el 14 en 10 + 4 y multiplicamos cada parte por 6 para sumar fácilmente (60 + 24 = 84).',
          },
          {
            text: '(14 × 10) + (14 × 0)',
            why: 'Incorrecto. Multiplicar por cero no nos ayuda a descomponer el factor 6 de manera útil.',
          },
        ],
      },
      {
        id: 'div-84-4',
        kind: 'reveal',
        emoji: '🍰',
        prompt:
          '¿Cómo puedes dividir mentalmente 84 entre 4 separando el número 84 en dos partes fáciles de dividir?',
        options: [
          {
            text: 'Dividir 40 entre 4 y restarle 44 entre 4.',
            why: 'Incorrecto. Restar cocientes parciales no funciona de esa manera para hallar el total de la división.',
          },
          {
            text: 'Dividir 80 entre 4 (que es 20) y 4 entre 4 (que es 1), y sumar los resultados (20 + 1 = 21).',
            correct: true,
            why: '¡Correcto! Separar 84 en 80 y 4 hace que dividir entre 4 sea muy sencillo, resultando en 20 + 1 = 21.',
          },
          {
            text: 'Dividir 80 entre 2 y 4 entre 2.',
            why: 'Incorrecto. Aquí cambiaste el divisor 4 por un 2 en ambas partes, modificando la división original.',
          },
          {
            text: 'Multiplicar 84 por 4.',
            why: 'Incorrecto. El problema te pide dividir, no multiplicar.',
          },
        ],
      },
      {
        id: 'div-92-4',
        kind: 'reveal',
        emoji: '🧮',
        prompt:
          'Para dividir mentalmente 92 ÷ 4 separando el número 92 en partes más fáciles, ¿qué opción muestra los pasos correctos?',
        options: [
          {
            text: 'Dividir 90 entre 2 y sumarle 2.',
            why: 'Incorrecto. Estás cambiando el divisor original (que es 4) y la operación no es equivalente.',
          },
          {
            text: 'Separar el 92 en 80 y 12, dividir ambos entre 4 (80 ÷ 4 = 20 y 12 ÷ 4 = 3) y sumar 20 + 3 = 23.',
            correct: true,
            why: '¡Excelente! Buscar múltiplos amigables como el 80 que se dividan fácil entre 4 hace que el cálculo sea pan comido.',
          },
          {
            text: 'Restar 4 noventa y dos veces consecutivas.',
            why: 'Incorrecto. Restar de 4 en 4 tantas veces es un método larguísimo y poco eficiente para la mente.',
          },
          {
            text: 'Multiplicar 92 por 4 para hallar la mitad.',
            why: 'Incorrecto. El problema pide realizar una división, no una multiplicación.',
          },
        ],
      },
    ],
  },
  {
    id: 'cuadro-multiplicaciones',
    title: 'Relaciones multiplicativas con el cuadro de multiplicaciones',
    description:
      'Los secretos del cuadro: dobles, triples, mitades, sumar columnas y el orden de los factores.',
    emoji: '🔲',
    questions: [
      {
        id: 'cuadro-dobles',
        kind: 'reveal',
        emoji: '✌️',
        prompt:
          'Si mirás la columna del 2 en tu cuadro de multiplicaciones y sabés que 2 × 6 = 12, ¿cómo podés usar ese resultado para encontrar el de la columna del 4 (4 × 6)?',
        hint: 'Pensá qué relación hay entre el número 2 y el número 4. Si el 4 es el doble de 2, ¿qué va a pasar con sus resultados?',
        options: [
          {
            text: 'Sumándole 2 al resultado, así que 4 × 6 = 14.',
            why: 'Incorrecto. Si sumás 2, estás avanzando en la tabla del 2, no saltando a la tabla del 4.',
          },
          {
            text: 'Calculando el doble de 12, porque la tabla del 4 es el doble de la tabla del 2 (12 + 12 = 24).',
            correct: true,
            why: '¡Excelente! Como 4 es el doble de 2, todos los resultados de la tabla del 4 van a ser exactamente el doble de los de la tabla del 2. ¡Un gran truco!',
          },
          {
            text: 'Calculando la mitad de 12, que es 6.',
            why: 'Incorrecto. La tabla del 4 tiene números más grandes que la del 2, así que el resultado tiene que aumentar, no achicarse.',
          },
          {
            text: 'Multiplicando 12 × 4 = 48.',
            why: 'Incorrecto. Multiplicar el resultado por 4 hace que el número quede demasiado grande y no corresponde a la relación correcta.',
          },
        ],
      },
      {
        id: 'cuadro-triples',
        kind: 'reveal',
        emoji: '🎯',
        prompt:
          'En el cuadro de multiplicaciones, la tabla del 9 está muy ligada a la tabla del 3. Si sabés que 3 × 5 = 15, ¿qué podés hacer para averiguar 9 × 5?',
        hint: 'Contá cuántas veces entra el 3 adentro del 9. Entra 3 veces, ¿no? Entonces buscá el triple del resultado que ya conocías.',
        options: [
          {
            text: 'Sumar 15 + 3 = 18.',
            why: 'Incorrecto. Sumar 3 solo te da el siguiente casillero de la tabla del 3 (3 × 6).',
          },
          {
            text: 'Buscar el doble de 15, que es 30.',
            why: 'Incorrecto. El doble te serviría si estuvieras buscando la tabla del 6, pero estamos buscando la del 9.',
          },
          {
            text: 'Calcular el triple de 15, porque la tabla del 9 es el triple de la tabla del 3 (15 × 3 = 45).',
            correct: true,
            why: '¡Súper bien! Como el 9 es tres veces el 3 (3 × 3 = 9), sus resultados también se triplican. Así que 15 + 15 + 15 = 45.',
          },
          {
            text: 'Restarle 5 a 15.',
            why: 'Incorrecto. Restar da un número menor, y la tabla del 9 tiene que dar un producto mayor que la del 3.',
          },
        ],
      },
      {
        id: 'cuadro-sumar-columnas',
        kind: 'reveal',
        emoji: '➕',
        prompt:
          'Si jugás con el cuadro y sumás los resultados de la columna del 2 con los de la columna del 5 en una misma fila, ¿los resultados de qué otra tabla vas a descubrir?',
        hint: 'Elegí una fila, por ejemplo la del 3. En la columna del 2 hay un 6 y en la del 5 hay un 15. Si sumás 6 + 15, ¿cuánto te da? ¿En qué tabla está ese resultado?',
        options: [
          {
            text: 'Los de la tabla del 3, porque restás 5 − 2.',
            why: 'Incorrecto. La consigna dice que hay que "sumar" las columnas, no restarlas.',
          },
          {
            text: 'Los de la tabla del 10, porque multiplicás 2 × 5.',
            why: 'Incorrecto. Aunque 2 × 5 es 10, al sumar los resultados fila por fila (por ejemplo: 2 + 5 = 7) no obtenemos la tabla del 10.',
          },
          {
            text: 'Los de la tabla del 7, porque 2 + 5 = 7 en los factores.',
            correct: true,
            why: '¡Genial! Esta es una propiedad hermosa del cuadro: si sumás los productos de la columna del 2 y la del 5 en la misma fila (ej: 4 + 10 = 14), obtenés exactamente la columna del 7 (7 × 2 = 14).',
          },
          {
            text: 'Los de la tabla del 4, porque es el doble de 2.',
            why: 'Incorrecto. Sumar la columna del 5 nos lleva mucho más allá de la tabla del 4.',
          },
        ],
      },
      {
        id: 'cuadro-mitades',
        kind: 'reveal',
        emoji: '🍕',
        prompt:
          'Un compañero se olvidó la tabla del 4, pero se acuerda perfecto de la columna del 8. Si sabe que 8 × 7 = 56, ¿cómo puede usarlo para saber cuánto es 4 × 7?',
        hint: 'Compará los números 8 y 4. El 4 es más chico… ¡es justo la mitad! Hacé lo mismo con el resultado final.',
        options: [
          {
            text: 'Duplicando el 56 para obtener 112.',
            why: 'Incorrecto. Si duplicás el resultado de la tabla del 8, obtenés la tabla del 16, no la del 4.',
          },
          {
            text: 'Sumándole 4 a 56.',
            why: 'Incorrecto. Sumar un número suelto rompe la proporción de las filas del cuadro.',
          },
          {
            text: 'Calculando la mitad de 56, que es 28, porque la tabla del 4 es la mitad de la tabla del 8.',
            correct: true,
            why: '¡Así se hace! Como el 4 es exactamente la mitad de 8, el resultado de 4 × 7 va a ser la mitad del resultado de 8 × 7. ¡La mitad de 56 es 28!',
          },
          {
            text: 'Dejando el mismo resultado, 56.',
            why: 'Incorrecto. Dos multiplicaciones con factores diferentes (4 y 8) no pueden dar el mismo producto si el otro número es 7.',
          },
        ],
      },
      {
        id: 'cuadro-conmutativa',
        kind: 'reveal',
        emoji: '🪞',
        prompt:
          'Si buscás en el cuadro de multiplicaciones el casillero donde se cruzan la fila del 6 con la columna del 5, te da 30. ¿Qué pasa si ahora buscás el cruce de la fila del 5 con la columna del 6?',
        hint: 'Pensá si cambia la cantidad de caramelos según tengas 5 bolsas con 6 caramelos cada una o 6 bolsas con 5 caramelos cada una. ¡Es lo mismo!',
        options: [
          {
            text: 'Da un resultado completamente diferente, como 35.',
            why: 'Incorrecto. En el cuadro de multiplicaciones hay mucha simetría: los números no cambian al dar vuelta los factores.',
          },
          {
            text: 'Da exactamente el mismo resultado (30), porque el orden de los números no cambia el producto.',
            correct: true,
            why: '¡Perfecto! Esto se llama propiedad conmutativa ("el orden de los factores no altera el producto"). En el cuadro se ve como un espejo: 6 × 5 es lo mismo que 5 × 6.',
          },
          {
            text: 'Da 0, porque se cancelan al darse vuelta.',
            why: 'Incorrecto. Los números no desaparecen ni se cancelan por cambiar de orden en la cuadrícula.',
          },
          {
            text: 'Da 65, porque se juntan los dos números.',
            why: 'Incorrecto. Juntar las cifras (5 y 6) no tiene ninguna relación matemática con la operación de multiplicar.',
          },
        ],
      },
    ],
  },
]
