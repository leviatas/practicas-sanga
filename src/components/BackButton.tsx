import { useBackTo } from '../lib/backNav'

// Botón «Volver» grande que sube un nivel en la jerarquía (ver lib/backNav).
// `label` aclara adónde vuelve (ej: «Volver a Matemática»).
export default function BackButton({
  to,
  label,
  className = '',
}: {
  to: string
  label: string
  className?: string
}) {
  const back = useBackTo(to)
  return (
    <button
      type="button"
      className={`back-button ${className}`.trim()}
      onClick={back}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">⬅️</span> Volver
    </button>
  )
}
