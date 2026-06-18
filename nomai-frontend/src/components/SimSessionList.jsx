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
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null, title: '' })

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

  function openConfirmation(session) {
    setConfirmDelete({ open: true, id: session.id, title: session.project_id })
  }

  function closeConfirmation() {
    setConfirmDelete({ open: false, id: null, title: '' })
  }

  async function confirmDeleteSession() {
    if (!confirmDelete.id) return
    try {
      await simSessionService.remove(confirmDelete.id)
      setMessage('Simulación eliminada correctamente.')
      onDeleted?.()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage('No se pudo eliminar la simulación.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      closeConfirmation()
    }
  }

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          margin: '16px 0',
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(31, 41, 55, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#ccc3d8',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>Cargando simulaciones...</p>
        <div style={{ marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#7c3aed', boxShadow: '0 0 12px rgba(124, 58, 237, 0.4)' }} />
          <span style={{ color: '#9ca3af', fontSize: '13px' }}>Espera un momento, estamos obteniendo tus datos.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          margin: '16px 0',
          padding: '20px',
          borderRadius: '16px',
          background: 'rgba(31, 41, 55, 0.8)',
          border: '1px solid rgba(239, 68, 68, 0.25)',
          color: '#fca5a5'
        }}
      >
        <p style={{ margin: 0, marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Error al cargar simulaciones</p>
        <p style={{ margin: 0, color: '#ccc3d8', fontSize: '14px' }}>No se pudieron obtener los datos del servidor. Podés reintentar o verificar la conexión.</p>
        <button
          type="button"
          onClick={loadSessions}
          style={{
            marginTop: '16px',
            padding: '10px 18px',
            borderRadius: '10px',
            border: 'none',
            background: '#7c3aed',
            color: '#ede0ff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
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
      <div
        style={{
          margin: '16px 0',
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(31, 41, 55, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#ccc3d8',
          textAlign: 'center'
        }}
      >
        <p style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Todavía no tenés simulaciones</p>
        <p style={{ margin: '8px 0 0 0', color: '#9ca3af', fontSize: '14px' }}>Crea tu primera simulación para comenzar a entrenar con escenarios reales.</p>
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
                onClick={() => openConfirmation(session)}
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
      {confirmDelete.open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(0, 0, 0, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: 'rgba(31, 41, 55, 0.98)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '18px',
              padding: '24px',
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.35)'
            }}
          >
            <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#e8dfee' }}>Confirmar eliminación</p>
            <p style={{ margin: '12px 0 20px 0', color: '#ccc3d8', lineHeight: 1.6 }}>
              ¿Eliminar a <strong>{confirmDelete.title}</strong>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={closeConfirmation}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: '#ccc3d8',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteSession}
                style={{
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#ef4444',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimSessionList
