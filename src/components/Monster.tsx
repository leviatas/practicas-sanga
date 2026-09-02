// El personaje del juego "En construcción": un monstruito peludo azul de tres
// ojos, con cuernos y brazos naranjas y patas rayadas, dibujado en SVG (así
// escala sin pixelarse y no depende de ninguna imagen con derechos).
// Con `waving` los brazos van levantados, saludando.

export default function Monster({
  className,
  waving = true,
}: {
  className?: string
  waving?: boolean
}) {
  const fur = '#2fa7d9'
  const furDark = '#1d7fb0'
  const orange = '#f7a21b'
  const orangeDark = '#d97a06'
  const stripe = '#ffcf5c'

  // Puntas de pelo alrededor del cuerpo (un polígono "erizado").
  const spikes: string[] = []
  const cx = 100
  const cy = 118
  const rx = 66
  const ry = 78
  const n = 34
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const r = i % 2 === 0 ? 1 : 0.9
    spikes.push(
      `${(cx + Math.cos(a) * rx * r).toFixed(1)},${(cy + Math.sin(a) * ry * r).toFixed(1)}`,
    )
  }

  const armY = waving ? -40 : 30
  return (
    <svg
      className={className}
      viewBox="0 0 200 230"
      role="img"
      aria-label="Monstruito azul saludando"
    >
      {/* Brazos */}
      <g stroke={orangeDark} strokeWidth="3" strokeLinejoin="round">
        <path
          d={`M48 100 Q 20 ${70 + armY} 14 ${40 + armY} l 8 -4 l 4 10 l 8 -6 l 2 10 l 10 -4 Q 36 ${76 + armY} 62 112 Z`}
          fill={orange}
        />
        <path
          d={`M152 100 Q 180 ${70 + armY} 186 ${40 + armY} l -8 -4 l -4 10 l -8 -6 l -2 10 l -10 -4 Q 164 ${76 + armY} 138 112 Z`}
          fill={orange}
        />
      </g>
      {/* Cuernos */}
      <g stroke={orangeDark} strokeWidth="3" strokeLinejoin="round">
        <path d="M62 52 Q 50 30 58 18 Q 72 36 80 50 Z" fill={orange} />
        <path d="M138 52 Q 150 30 142 18 Q 128 36 120 50 Z" fill={orange} />
        <path d="M58 30 q 6 -2 10 4" fill="none" stroke={stripe} strokeWidth="2.5" />
        <path d="M142 30 q -6 -2 -10 4" fill="none" stroke={stripe} strokeWidth="2.5" />
      </g>
      {/* Patas rayadas */}
      <g stroke={orangeDark} strokeWidth="3">
        <rect x="64" y="176" width="26" height="42" rx="10" fill={orange} />
        <rect x="110" y="176" width="26" height="42" rx="10" fill={orange} />
        <path d="M66 190 h22 M66 204 h22 M112 190 h22 M112 204 h22" stroke={stripe} strokeWidth="5" />
        <path d="M60 218 q 17 12 34 0 M106 218 q 17 12 34 0" fill="#fff4dc" />
      </g>
      {/* Cuerpo peludo */}
      <polygon points={spikes.join(' ')} fill={fur} stroke={furDark} strokeWidth="3" strokeLinejoin="round" />
      {/* Mechón de arriba */}
      <path d="M84 44 l6 -18 l8 12 l4 -20 l6 20 l8 -12 l4 20 Z" fill={fur} stroke={furDark} strokeWidth="3" strokeLinejoin="round" />
      {/* Manchitas */}
      <g fill="#7fd0f2" opacity="0.8">
        <circle cx="62" cy="150" r="3" />
        <circle cx="140" cy="160" r="2.5" />
        <circle cx="132" cy="142" r="2" />
      </g>
      {/* Ojos */}
      <g>
        <circle cx="72" cy="84" r="13" fill="#fff" stroke="#cfd8e3" strokeWidth="2" />
        <circle cx="100" cy="82" r="14" fill="#fff" stroke="#cfd8e3" strokeWidth="2" />
        <circle cx="128" cy="84" r="13" fill="#fff" stroke="#cfd8e3" strokeWidth="2" />
        <circle cx="73" cy="86" r="7" fill="#2b2650" />
        <circle cx="101" cy="84" r="7.5" fill="#2b2650" />
        <circle cx="129" cy="86" r="7" fill="#2b2650" />
        <circle cx="75" cy="83" r="2.2" fill="#fff" />
        <circle cx="103" cy="81" r="2.4" fill="#fff" />
        <circle cx="131" cy="83" r="2.2" fill="#fff" />
      </g>
      {/* Boca sonriente con dientes */}
      <path d="M62 112 Q 100 100 138 112 Q 136 150 100 152 Q 64 150 62 112 Z" fill="#e0304a" stroke="#8f1b2c" strokeWidth="3" strokeLinejoin="round" />
      <path d="M66 114 Q 100 106 134 114 L 132 122 Q 100 116 68 122 Z" fill="#fff" />
      <path d="M76 142 Q 100 148 124 142 L 122 136 Q 100 140 78 136 Z" fill="#fff" />
      <ellipse cx="100" cy="134" rx="16" ry="6" fill="#b41d33" />
    </svg>
  )
}
