import { useEffect, useState } from 'react'
import { userService } from '../services/user.service.js'

function UserList({ refreshKey }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  if (loading) return <p style={{ margin: '16px 0' }}>Cargando usuarios...</p>
  if (error) return <p style={{ color: '#dc2626', margin: '16px 0' }}>{error}</p>
  if (!users.length) return <p style={{ color: '#555', margin: '16px 0' }}>No hay usuarios.</p>

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      {users.map((u) => (
        <div
          key={u.id}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{u.full_name}</div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{u.email}</div>
            <div style={{ marginTop: '6px', color: '#374151', fontSize: '0.9rem' }}>
              <strong>Role:</strong> {u.role} • <strong>Status:</strong> {u.status}
            </div>
          </div>
          <div style={{ textAlign: 'right', color: '#6b7280', fontSize: '0.85rem' }}>
            <div>Creado: {new Date(u.created_at).toLocaleDateString()}</div>
            <div>Actualizado: {new Date(u.updated_at).toLocaleDateString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserList
