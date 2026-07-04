// Mapa de ciudad más complejo (SVG, self-contained) para los ejercicios de
// direcciones con arrastrar y soltar. Reutiliza las clases CSS de .city-map.
//
// Se arranca en START (abajo) mirando hacia arriba (norte). Subiendo:
//   - Primer cruce: School (izq) / Supermarket (der).
//   - Después: Bank (izq) / Café (der).
//   - Segundo cruce: Library (izq) / Cinema (der).
//   - Al final, recto: Park.

export default function CityMapBig() {
  return (
    <svg
      className="city-map"
      viewBox="0 0 360 384"
      role="img"
      aria-label="Mapa: empezás en START mirando hacia arriba. En el primer cruce, a la izquierda la escuela y a la derecha el supermercado. Después, a la izquierda el banco y a la derecha el café. En el segundo cruce, a la izquierda la biblioteca y a la derecha el cine. Al final, recto, el parque."
    >
      {/* Calles */}
      <g className="city-map__road">
        <rect x="157" y="30" width="36" height="322" rx="6" />
        <rect x="20" y="222" width="320" height="36" rx="6" />
        <rect x="20" y="92" width="320" height="36" rx="6" />
      </g>
      {/* Líneas centrales */}
      <g className="city-map__lane">
        <line x1="175" y1="36" x2="175" y2="346" strokeDasharray="8 8" />
        <line x1="24" y1="240" x2="336" y2="240" strokeDasharray="8 8" />
        <line x1="24" y1="110" x2="336" y2="110" strokeDasharray="8 8" />
      </g>

      {/* Compás */}
      <g className="city-map__compass">
        <text x="345" y="18" textAnchor="middle">N</text>
        <text x="345" y="32" textAnchor="middle">↑</text>
      </g>

      {/* PARK (recto, arriba) */}
      <g>
        <rect className="city-map__bldg" x="145" y="4" width="66" height="22" rx="6" />
        <text className="city-map__emoji" x="152" y="21">🌳</text>
        <text className="city-map__label" x="176" y="20">Park</text>
      </g>

      {/* Segundo cruce: LIBRARY (izq) / CINEMA (der) */}
      <g>
        <rect className="city-map__bldg" x="6" y="70" width="84" height="22" rx="6" />
        <text className="city-map__emoji" x="13" y="87">📚</text>
        <text className="city-map__label" x="37" y="86">Library</text>
      </g>
      <g>
        <rect className="city-map__bldg" x="252" y="70" width="84" height="22" rx="6" />
        <text className="city-map__emoji" x="259" y="87">🎬</text>
        <text className="city-map__label" x="283" y="86">Cinema</text>
      </g>

      {/* Medio: BANK (izq) / CAFÉ (der) */}
      <g>
        <rect className="city-map__bldg" x="72" y="168" width="70" height="22" rx="6" />
        <text className="city-map__emoji" x="79" y="185">🏦</text>
        <text className="city-map__label" x="103" y="184">Bank</text>
      </g>
      <g>
        <rect className="city-map__bldg" x="208" y="168" width="66" height="22" rx="6" />
        <text className="city-map__emoji" x="215" y="185">☕</text>
        <text className="city-map__label" x="239" y="184">Café</text>
      </g>

      {/* Primer cruce: SCHOOL (izq) / SUPERMARKET (der) */}
      <g>
        <rect className="city-map__bldg" x="6" y="264" width="84" height="22" rx="6" />
        <text className="city-map__emoji" x="13" y="281">🏫</text>
        <text className="city-map__label" x="37" y="280">School</text>
      </g>
      <g>
        <rect className="city-map__bldg" x="220" y="264" width="116" height="22" rx="6" />
        <text className="city-map__emoji" x="227" y="281">🛒</text>
        <text className="city-map__label" x="251" y="280">Supermarket</text>
      </g>

      {/* START */}
      <g>
        <polygon className="city-map__start" points="175,326 185,342 165,342" />
        <text className="city-map__start-label" x="175" y="368" textAnchor="middle">
          START
        </text>
      </g>
    </svg>
  )
}
