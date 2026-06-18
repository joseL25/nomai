import { useState, useEffect } from 'react'
import { userService } from '../services/user.service.js'

function UserForm({ onCreated, initialData = null, onSaved, onCancel }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'freelancer',
    status: 'active'
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const editing = Boolean(initialData)

  useEffect(() => {
    if (initialData) {
      setForm({
        email: initialData.email || '',
        password: '',
        full_name: initialData.full_name || '',
        role: initialData.role || 'freelancer',
        status: initialData.status || 'active'
      })
    }
  }, [initialData])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const payload = {
        email: form.email,
        // only send password_hash on create or if user typed a password
        ...(form.password ? { password_hash: form.password } : {}),
        full_name: form.full_name,
        role: form.role,
        status: form.status
      }

      if (editing) {
        await userService.update(initialData.id, payload)
        setMessage('Usuario actualizado correctamente.')
        onSaved?.()
      } else {
        await userService.create(payload)
        setMessage('Usuario creado correctamente.')
        setForm({ email: '', password: '', full_name: '', role: 'freelancer', status: 'active' })
        onCreated?.()
      }

      setTimeout(() => setMessage(''), 3000)
      if (editing) onCancel?.()
    } catch (err) {
      setError('No se pudo crear/actualizar el usuario.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(31, 41, 55, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 0 15px rgba(124, 58, 237, 0.1)'
      }}
    >
      <h3 style={{ marginTop: 0, fontSize: '20px', fontWeight: '600', color: '#e8dfee' }}>{editing ? 'Editar usuario' : 'Crear usuario'}</h3>
      {message && (
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          color: '#86efac',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          marginBottom: '12px',
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}
      <div style={{ display: 'grid', gap: '10px' }}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(210, 187, 255, 0.3)',
            background: 'rgba(100, 100, 120, 0.2)',
            color: '#e8dfee',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(210, 187, 255, 0.6)'
            e.target.style.background = 'rgba(100, 100, 120, 0.3)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(210, 187, 255, 0.3)'
            e.target.style.background = 'rgba(100, 100, 120, 0.2)'
          }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          style={{
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(210, 187, 255, 0.3)',
            background: 'rgba(100, 100, 120, 0.2)',
            color: '#e8dfee',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(210, 187, 255, 0.6)'
            e.target.style.background = 'rgba(100, 100, 120, 0.3)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(210, 187, 255, 0.3)'
            e.target.style.background = 'rgba(100, 100, 120, 0.2)'
          }}
        />
        <input
          name="full_name"
          placeholder="Nombre completo"
          value={form.full_name}
          onChange={handleChange}
          required
          style={{
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(210, 187, 255, 0.3)',
            background: 'rgba(100, 100, 120, 0.2)',
            color: '#e8dfee',
            fontSize: '14px',
            transition: 'all 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(210, 187, 255, 0.6)'
            e.target.style.background = 'rgba(100, 100, 120, 0.3)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(210, 187, 255, 0.3)'
            e.target.style.background = 'rgba(100, 100, 120, 0.2)'
          }}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(210, 187, 255, 0.3)',
              background: 'rgba(100, 100, 120, 0.2)',
              color: '#e8dfee',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="freelancer">freelancer</option>
            <option value="recruiter">recruiter</option>
            <option value="admin">admin</option>
          </select>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(210, 187, 255, 0.3)',
              background: 'rgba(100, 100, 120, 0.2)',
              color: '#e8dfee',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            <option value="active">active</option>
            <option value="suspended">suspended</option>
            <option value="pending_verification">pending_verification</option>
          </select>
        </div>

        {error && <div style={{ color: '#fca5a5', fontSize: '14px' }}>{error}</div>}

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'rgba(124, 58, 237, 0.8)',
              color: '#ede0ff',
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              if (!submitting) {
                e.target.style.background = 'rgba(124, 58, 237, 1)'
                e.target.style.transform = 'translateY(-2px)'
              }
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(124, 58, 237, 0.8)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            {submitting ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear usuario'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => { setForm({ email: '', password: '', full_name: '', role: 'freelancer', status: 'active' }); setError(''); onCancel?.(); }}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(210, 187, 255, 0.3)',
                background: 'transparent',
                color: '#d2bbff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(210, 187, 255, 0.1)'
                e.target.style.borderColor = 'rgba(210, 187, 255, 0.6)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.borderColor = 'rgba(210, 187, 255, 0.3)'
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default UserForm
