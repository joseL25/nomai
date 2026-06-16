import { useEffect, useState } from 'react'
import { simSessionService } from '../services/simSession.service.js'

const statusColors = {
  pending: '#f59e0b',
  active: '#2563eb',
  completed: '#16a34a',
  abandoned: '#6b7280'
}

function SimSessionList({ refreshKey }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadSessions()
  }, [refreshKey])

  async function loadSessions() {
    setLoading(true)
    setError('')

    try {
      const data = await simSessionService.getAll()
      setSessions(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('No se pudieron cargar las simulaciones.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p style={{ color: '#111', margin: '16px 0' }}>Cargando simulaciones...</p>
  }

  if (error) {
    return <p style={{ color: '#dc2626', margin: '16px 0' }}>{error}</p>
  }

  if (!sessions.length) {
    return <p style={{ color: '#555', margin: '16px 0' }}>No hay simulaciones registradas todavía.</p>
  }

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {sessions.map((session) => (
        <article
          key={session.id}
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)',
            background: '#fff'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{session.project_id}</h2>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                color: '#fff',
                background: statusColors[session.status] || '#6b7280',
                textTransform: 'capitalize',
                fontSize: '0.85rem'
              }}
            >
              {session.status || 'unknown'}
            </span>
          </div>

          <div style={{ display: 'grid', gap: '6px', marginTop: '12px', color: '#374151' }}>
            <p style={{ margin: 0 }}><strong>Cliente:</strong> {session.company_id}</p>
            <p style={{ margin: 0 }}><strong>AI persona / proyecto:</strong> {session.ai_persona_id}</p>
            <p style={{ margin: 0 }}><strong>Modo:</strong> {session.mode}</p>
            <p style={{ margin: 0 }}><strong>Dificultad:</strong> {session.metadata?.difficulty ?? '—'}</p>
            <p style={{ margin: 0 }}><strong>Creado:</strong> {new Date(session.created_at).toLocaleString()}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default SimSessionList
