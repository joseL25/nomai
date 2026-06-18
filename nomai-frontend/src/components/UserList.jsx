import { useEffect, useState } from 'react'
import { userService } from '../services/user.service.js'

function UserList({ refreshKey, onEdit, onDeleted }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadUsers()
  }, [refreshKey])

  async function loadUsers() {
    setLoading(true)
    setError('')
    try {
      const data = await userService.getAll()
      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('No se pudieron cargar los usuarios.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ color: '#ccc3d8', margin: '16px 0', textAlign: 'center', padding: '40px 16px' }}>
        <p style={{ margin: 0, fontSize: '16px' }}>Cargando usuarios...</p>
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
        <p style={{ margin: 0, marginBottom: '12px' }}>No se pudieron cargar los usuarios. Intentá de nuevo.</p>
        <button
          type="button"
          onClick={loadUsers}
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

  if (!users.length) {
    return (
      <div style={{ color: '#ccc3d8', margin: '16px 0', textAlign: 'center', padding: '40px 16px' }}>
        <p style={{ margin: 0, fontSize: '16px' }}>Todavía no tenés usuarios. Creá el primero.</p>
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
        {users.map((u, index) => (
          <article
          key={u.id}
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
            {/* Nombre */}
          <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#e8dfee' }}>{u.full_name}</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#ccc3d8' }}>{u.email}</p>
            </div>

            {/* Detalles */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '12px',
                color: '#ccc3d8',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Role</span>
                <p style={{ margin: '2px 0 0 0', textTransform: 'capitalize' }}>{u.role}</p>
              </div>
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Status</span>
                <p style={{ margin: '2px 0 0 0', textTransform: 'capitalize' }}>{u.status}</p>
              </div>
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Creado</span>
                <p style={{ margin: '2px 0 0 0' }}>{new Date(u.created_at).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <span style={{ color: '#958da1', fontSize: '10px' }}>Actualizado</span>
                <p style={{ margin: '2px 0 0 0' }}>{new Date(u.updated_at).toLocaleDateString('es-ES')}</p>
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
                onClick={() => onEdit?.(u)}
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
                  const ok = window.confirm('¿Eliminar este usuario? Esta acción no se puede deshacer.')
                  if (!ok) return
                  try {
                    await userService.remove(u.id)
                    setMessage('Usuario eliminado correctamente.')
                    onDeleted?.()
                    setTimeout(() => setMessage(''), 3000)
                  } catch (err) {
                    setMessage('No se pudo eliminar el usuario.')
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

export default UserList
