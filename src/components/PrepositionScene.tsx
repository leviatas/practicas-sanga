// Escena que ilustra una preposición.
// - Movimiento (4to grado): foto de un gato y un tronco, recortada SIN la
//   etiqueta de texto para no revelar la respuesta (ver prepImages).
// - Estáticas (1er grado): escena SVG (caja + pelota) self-contained.
// La imagen muestra la relación espacial, así el alumno sabe qué preposición va.
import { prepImages } from './prepImages'

function Box() {
  return <rect className="prep-box" x={70} y={72} width={60} height={40} rx={8} />
}

function Ball({ cx, cy }: { cx: number; cy: number }) {
  return <circle className="prep-ball" cx={cx} cy={cy} r={11} />
}

// Flecha recta de (x1,y1) a (x2,y2).
function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line className="prep-arrow" x1={x1} y1={y1} x2={x2} y2={y2} markerEnd="url(#ph)" />
}

// Flecha curva (para over / round) siguiendo un path.
function ArrowPath({ d }: { d: string }) {
  return <path className="prep-arrow" d={d} fill="none" markerEnd="url(#ph)" />
}

export default function PrepositionScene({ name }: { name: string }) {
  // Si hay una foto para esta preposición, la mostramos (sin texto que delate
  // la respuesta). El alt es neutro a propósito para no revelarla.
  const photo = prepImages[name]
  if (photo) {
    return (
      <img
        className="prep-photo"
        src={photo}
        alt="Un gato y un tronco: ¿qué preposición muestra?"
      />
    )
  }

  let content: React.ReactNode

  switch (name) {
    // ---- Estáticas (in / on / under / next to) ----
    case 'on':
      content = <>{<Box />}<Ball cx={100} cy={61} /></>
      break
    case 'in':
      content = (
        <>
          <rect className="prep-box" x={70} y={72} width={60} height={40} rx={8} fill="none" />
          <Ball cx={100} cy={94} />
        </>
      )
      break
    case 'under':
      content = <>{<Box />}<Ball cx={100} cy={134} /></>
      break
    case 'next-to':
      content = <>{<Box />}<Ball cx={150} cy={92} /></>
      break

    // ---- De movimiento (con flecha) ----
    case 'into':
      content = <>{<Box />}<Ball cx={100} cy={34} /><Arrow x1={100} y1={46} x2={100} y2={70} /></>
      break
    case 'out-of':
      content = <>{<Box />}<Ball cx={100} cy={34} /><Arrow x1={100} y1={92} x2={100} y2={44} /></>
      break
    case 'onto':
      content = <>{<Box />}<Ball cx={44} cy={44} /><ArrowPath d="M52 50 Q 80 40 100 60" /></>
      break
    case 'off':
      content = <>{<Box />}<Ball cx={100} cy={60} /><ArrowPath d="M104 60 Q 140 70 156 104" /></>
      break
    case 'over':
      content = <>{<Box />}<ArrowPath d="M52 112 Q 100 12 148 112" /></>
      break
    case 'across':
      content = (
        <>
          <rect className="prep-river" x={92} y={30} width={16} height={90} />
          <Arrow x1={40} y1={75} x2={160} y2={75} />
        </>
      )
      break
    case 'through':
      content = (
        <>
          <rect className="prep-box" x={80} y={56} width={40} height={72} rx={8} />
          <Arrow x1={30} y1={92} x2={170} y2={92} />
        </>
      )
      break
    case 'up':
      content = <><Arrow x1={100} y1={126} x2={100} y2={30} /></>
      break
    case 'down':
      content = <><Arrow x1={100} y1={30} x2={100} y2={126} /></>
      break
    case 'round':
      content = (
        <>
          <Box />
          <ArrowPath d="M100 44 A 42 34 0 1 1 62 66" />
        </>
      )
      break
    default:
      content = <Box />
  }

  return (
    <svg
      className="prep-scene"
      viewBox="0 0 200 150"
      role="img"
      aria-label={`Escena de la preposición ${name}`}
    >
      <defs>
        <marker id="ph" markerWidth="10" markerHeight="10" refX="7" refY="3.2"
          orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L8,3.2 L0,6.4 Z" className="prep-arrowhead" />
        </marker>
      </defs>
      {content}
    </svg>
  )
}
