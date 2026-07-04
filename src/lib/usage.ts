// ============================================================================
// Registro de uso — habla con el backend (Node + SQLite).
// Cada evento queda guardado en el servidor con la IP del visitante.
// ============================================================================

export function logEvent(type: string, data: Record<string, unknown> = {}) {
  try {
    fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...data }),
      keepalive: true,
    }).catch(() => {
      // Sin conexión con el backend: no rompemos la app.
    })
  } catch {
    // Ignoramos.
  }
}

export interface LogsByIp {
  ip: string
  events: number
  opens: number
  answers: number
  correct: number
  last: number
}

export interface LogsByPractice {
  title: string
  grade: string
  starts: number
  answers: number
  correct: number
}

export interface RecentEvent {
  ts: number
  ip: string
  type: string
  grade: string | null
  title: string | null
  practice: string | null
  correct: number | null
}

export interface LogsResponse {
  summary: {
    opens: number
    answers: number
    correct: number
    completes: number
    uniqueIps: number
    last: number
    pct: number
    byIp: LogsByIp[]
    byPractice: LogsByPractice[]
  }
  recent: RecentEvent[]
}

/** Trae los logs del backend. Lanza 'unauthorized' si la contraseña es incorrecta. */
export async function fetchLogs(password: string): Promise<LogsResponse> {
  const res = await fetch('/api/logs', {
    headers: { 'X-Logs-Password': password },
  })
  if (res.status === 401) throw new Error('unauthorized')
  if (!res.ok) throw new Error('error')
  return res.json()
}
