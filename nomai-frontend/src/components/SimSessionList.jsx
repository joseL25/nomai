import { useEffect, useState } from 'react'
import { simSessionService } from '../services/simSession.service.js'

const statusColors = {
  pending: '#f59e0b',
  active: '#2563eb',
  completed: '#16a34a',
  abandoned: '#6b7280'
}

const statusLabels = {
  pending: 'Pendiente',
  active: 'En Progreso',
  completed: 'Completado',
  abandoned: 'Abandonado'
}

function SimSessionList({ refreshKey, onEdit, onDeleted }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

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
    return (
      <div style={{ color: '#ccc3d8', margin: '16px 0', textAlign: 'center', padding: '40px 16px' }}>
        <p style={{ margin: 0, fontSize: '16px' }}>Cargando simulaciones...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          margin: '16px 0',
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5'
        }}
      >
        <p style={{ margin: 0, marginBottom: '12px' }}>No se pudieron cargar las simulaciones. Intentá de nuevo.</p>
        <button
          type="button"
          onClick={loadSessions}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: '#7c3aed',
            color: '#ede0ff',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '500',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => (e.target.style.background = '#6d28d9')}
          onMouseOut={(e) => (e.target.style.background = '#7c3aed')}
        >
          Reintentar
        </button>
      </div>
    )
  }

  if (!sessions.length) {
    return (
      <div style={{ color: '#ccc3d8', margin: '16px 0', textAlign: 'center', padding: '40px 16px' }}>
        <p style={{ margin: 0, fontSize: '16px' }}>Todavía no tenés simulaciones. Creá el primero.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      {message && (
        <div
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            color: '#86efac',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            fontSize: '14px'
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}
      >
        {sessions.map((session, index) => (
          <article
            key={session.id}
            style={{
              background: 'rgba(31, 41, 55, 0.7)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transform: 'translateY(0)',
              boxShadow: index === 0 ? '0 0 15px rgba(124, 58, 237, 0.2)' : 'none'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(124, 58, 237, 0.3)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = index === 0 ? '0 0 15px rgba(124, 58, 237, 0.2)' : 'none'
            }}
          >
            {/* Badge tipo categoría */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(31, 30, 22, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#4cd7f6',
                  fontSize: '11px',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  maxWidth: '120px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {session.mode || 'Simulación'}
              </span>
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  color: '#fff',
                  background: statusColors[session.status] || '#6b7280',
                  fontSize: '11px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
              >
                {statusLabels[session.status] || 'Desconocido'}
              </span>
            </div>

            {/* Título */}
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#e8dfee', lineHeight: '1.4' }}>
              {session.project_id}
            </h3>

            {/* Descripción / Cliente */}
            <p style={{ margin: 0, fontSize: '13px', color: '#ccc3d8', lineHeight: '1.5' }}>
              Cliente: <strong>{session.company_id}</strong>
            </p>

            {/* Detalles en grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '12px',
                color: '#ccc3d8',
                marginTop: '4px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Proyecto</span>
                <p style={{ margin: '2px 0 0 0' }}>{session.ai_persona_id}</p>
              </div>
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Dificultad</span>
                <p style={{ margin: '2px 0 0 0' }}>{session.metadata?.difficulty ?? '—'}</p>
              </div>
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Creado</span>
                <p style={{ margin: '2px 0 0 0' }}>{new Date(session.created_at).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Hora</span>
                <p style={{ margin: '2px 0 0 0' }}>{new Date(session.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            {/* Acciones */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '8px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <button
                onClick={() => onEdit?.(session)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(210, 187, 255, 0.3)',
                  background: 'rgba(124, 58, 237, 0.2)',
                  color: '#d2bbff',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 58, 237, 0.4)'
                  e.currentTarget.style.borderColor = 'rgba(210, 187, 255, 0.6)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(124, 58, 237, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(210, 187, 255, 0.3)'
                }}
              >
                Editar
              </button>
              <button
                onClick={async () => {
                  const ok = window.confirm('¿Eliminar esta simulación? Esta acción no se puede deshacer.')
                  if (!ok) return
                  try {
                    await simSessionService.remove(session.id)
                    setMessage('Simulación eliminada correctamente.')
                    onDeleted?.()
                    setTimeout(() => setMessage(''), 3000)
                  } catch (err) {
                    setMessage('No se pudo eliminar la simulación.')
                    setTimeout(() => setMessage(''), 3000)
                  }
                }}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 180, 171, 0.3)',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#fca5a5',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'
                  e.currentTarget.style.borderColor = 'rgba(255, 180, 171, 0.6)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255, 180, 171, 0.3)'
                }}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default SimSessionList
