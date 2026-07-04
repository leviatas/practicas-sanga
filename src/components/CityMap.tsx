// Mapa de ciudad dibujado en SVG (self-contained, sin imágenes externas).
// Se usa como apoyo visual en la práctica de "Direcciones".
//
// Convención: se arranca en START (abajo) mirando hacia arriba (norte).
//   - Recto (straight on): PARK, al final de la calle.
//   - A la derecha (right): BANK.
//   - A la izquierda (left): HOSPITAL.
//   - En el cruce, a la izquierda: SCHOOL; a la derecha: SHOP.

export default function CityMap() {
  return (
    <svg
      className="city-map"
      viewBox="0 0 340 300"
      role="img"
      aria-label="Mapa: empezás en START mirando hacia arriba. Recto está el parque; a la derecha el banco; a la izquierda el hospital. En el cruce, a la izquierda la escuela y a la derecha el negocio."
    >
      {/* Calles */}
      <g className="city-map__road">
        <rect x="153" y="28" width="34" height="244" rx="6" />
        <rect x="14" y="123" width="312" height="34" rx="6" />
      </g>
      {/* Líneas centrales */}
      <g className="city-map__lane">
        <line x1="170" y1="34" x2="170" y2="266" strokeDasharray="8 8" />
        <line x1="20" y1="140" x2="320" y2="140" strokeDasharray="8 8" />
      </g>

      {/* Compás */}
      <g className="city-map__compass">
        <text x="318" y="20" textAnchor="middle">N</text>
        <text x="318" y="34" textAnchor="middle">↑</text>
      </g>

      {/* Edificios: rect + emoji + etiqueta */}
      {/* PARK (recto, arriba) */}
      <g>
        <rect className="city-map__bldg" x="140" y="2" width="60" height="24" rx="6" />
        <text className="city-map__emoji" x="152" y="20">🌳</text>
        <text className="city-map__label" x="176" y="19">Park</text>
      </g>

      {/* SCHOOL (cruce, izquierda) */}
      <g>
        <rect className="city-map__bldg" x="18" y="92" width="74" height="24" rx="6" />
        <text className="city-map__emoji" x="26" y="110">🏫</text>
        <text className="city-map__label" x="50" y="109">School</text>
      </g>

      {/* SHOP (cruce, derecha) */}
      <g>
        <rect className="city-map__bldg" x="250" y="92" width="72" height="24" rx="6" />
        <text className="city-map__emoji" x="258" y="110">🏬</text>
        <text className="city-map__label" x="282" y="109">Shop</text>
      </g>

      {/* HOSPITAL (izquierda de la calle) */}
      <g>
        <rect className="city-map__bldg" x="40" y="196" width="90" height="24" rx="6" />
        <text className="city-map__emoji" x="48" y="214">🏥</text>
        <text className="city-map__label" x="72" y="213">Hospital</text>
      </g>

      {/* BANK (derecha de la calle) */}
      <g>
        <rect className="city-map__bldg" x="210" y="196" width="72" height="24" rx="6" />
        <text className="city-map__emoji" x="218" y="214">🏦</text>
        <text className="city-map__label" x="242" y="213">Bank</text>
      </g>

      {/* START: flecha hacia arriba + etiqueta */}
      <g>
        <polygon className="city-map__start" points="170,236 180,252 160,252" />
        <text className="city-map__start-label" x="170" y="286" textAnchor="middle">
          START
        </text>
      </g>
    </svg>
  )
}
