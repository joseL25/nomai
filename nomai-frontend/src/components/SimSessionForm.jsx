import { useState } from 'react'
import { simSessionService } from '../services/simSession.service.js'

function SimSessionForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '',
    client_name: '',
    project_type: '',
    difficulty: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      // Build payload according to backend model:
      // required: user_id, project_id, company_id, ai_persona_id, status, mode
      const payload = {
        user_id: 'user-123',
        project_id: form.title || `project-${Date.now()}`,
        company_id: form.client_name || `company-${Date.now()}`,
        ai_persona_id: form.project_type || 'persona-default',
        status: 'pending',
        mode: 'learning',
        metadata: {
          difficulty: form.difficulty,
          description: form.description
        }
      }

      await simSessionService.create(payload)
      setForm({
        title: '',
        client_name: '',
        project_type: '',
        difficulty: '',
        description: ''
      })
      onCreated?.()
    } catch (err) {
      setError('No se pudo crear la simulación. Intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '18px',
        background: '#fff',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.05)'
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '14px' }}>Crear nueva simulación</h2>

      <div style={{ display: 'grid', gap: '12px' }}>
        <label style={{ display: 'grid', gap: '4px', fontSize: '0.95rem' }}>
          Título
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </label>

        <label style={{ display: 'grid', gap: '4px', fontSize: '0.95rem' }}>
          Cliente
          <input
            name="client_name"
            value={form.client_name}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </label>

        <label style={{ display: 'grid', gap: '4px', fontSize: '0.95rem' }}>
          Tipo de proyecto
          <input
            name="project_type"
            value={form.project_type}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </label>

        <label style={{ display: 'grid', gap: '4px', fontSize: '0.95rem' }}>
          Dificultad
          <input
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </label>

        <label style={{ display: 'grid', gap: '4px', fontSize: '0.95rem' }}>
          Descripción
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          />
        </label>

        {error && <p style={{ color: '#dc2626', margin: 0 }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 16px',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? 'Guardando...' : 'Crear simulación'}
        </button>
      </div>
    </form>
  )
}

export default SimSessionForm
