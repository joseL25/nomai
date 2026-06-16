import { useState } from 'react'
import { userService } from '../services/user.service.js'

function UserForm({ onCreated }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'freelancer',
    status: 'active'
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      // backend expects password_hash field
      const payload = {
        email: form.email,
        password_hash: form.password,
        full_name: form.full_name,
        role: form.role,
        status: form.status
      }
      await userService.create(payload)
      setForm({ email: '', password: '', full_name: '', role: 'freelancer', status: 'active' })
      onCreated?.()
    } catch (err) {
      setError('No se pudo crear el usuario.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '12px', background: '#fff' }}>
      <h3 style={{ marginTop: 0 }}>Crear usuario</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required style={{ padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <input name="full_name" placeholder="Nombre completo" value={form.full_name} onChange={handleChange} required style={{ padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <select name="role" value={form.role} onChange={handleChange} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            <option value="freelancer">freelancer</option>
            <option value="recruiter">recruiter</option>
            <option value="admin">admin</option>
          </select>
          <select name="status" value={form.status} onChange={handleChange} style={{ padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}>
            <option value="active">active</option>
            <option value="suspended">suspended</option>
            <option value="pending_verification">pending_verification</option>
          </select>
        </div>

        {error && <div style={{ color: '#dc2626' }}>{error}</div>}

        <button type="submit" disabled={submitting} style={{ padding: '10px', borderRadius: '8px', background: '#16a34a', color: '#fff', border: 'none' }}>
          {submitting ? 'Creando...' : 'Crear usuario'}
        </button>
      </div>
    </form>
  )
}

export default UserForm
