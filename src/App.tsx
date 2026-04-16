import { useEffect, useMemo, useState } from 'react'

type CaseSummary = {
  id: string
  status: string
  lostAt: string
  urgent: boolean
  pet: {
    species: string
    name: string
    primaryColor?: string | null
    specialMarks?: string | null
  }
  lastSeenLocation?: {
    city?: string | null
    district?: string | null
    address?: string | null
  } | null
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

function App() {
  const [cases, setCases] = useState<CaseSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadCases = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_BASE_URL}/v1/lost-cases`)
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }

        const data = (await response.json()) as CaseSummary[]
        if (!cancelled) {
          setCases(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadCases()

    return () => {
      cancelled = true
    }
  }, [])

  const activeCountLabel = useMemo(() => {
    if (loading) return 'Loading...'
    return `${cases.length} active cases`
  }, [cases.length, loading])

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Liza Alert Web</span>
          <h1>Frontend scaffold is ready for the new web application.</h1>
          <p>
            This project is separated from the backend and already points to the live
            API at <code>{API_BASE_URL}</code>.
          </p>
        </div>

        <div className="hero-card">
          <span className="status-dot" />
          <strong>Backend connectivity</strong>
          <p>{activeCountLabel}</p>
          {error ? <p className="error-text">{error}</p> : null}
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Next frontend steps</h2>
          <ol>
            <li>Set up routing and app layout.</li>
            <li>Extract API client and DTO types.</li>
            <li>Implement list/details views for lost cases.</li>
            <li>Build forms for reports and status updates.</li>
          </ol>
        </article>

        <article className="panel">
          <h2>Live API preview</h2>
          {loading ? <p>Loading cases...</p> : null}
          {!loading && cases.length === 0 ? <p>No active cases yet.</p> : null}
          <div className="case-list">
            {cases.slice(0, 5).map((item) => (
              <div className="case-card" key={item.id}>
                <div className="case-header">
                  <strong>{item.pet.name}</strong>
                  <span className={item.urgent ? 'badge badge-urgent' : 'badge'}>
                    {item.urgent ? 'Urgent' : item.status}
                  </span>
                </div>
                <p>
                  {item.pet.species} • {item.pet.primaryColor ?? 'Color unknown'}
                </p>
                <small>
                  {item.lastSeenLocation?.city ?? 'Unknown city'}
                  {item.lastSeenLocation?.district ? `, ${item.lastSeenLocation.district}` : ''}
                </small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
