import { useState, useEffect } from 'react'
import { simSessionService } from '../services/simSession.service.js'

function SimSessionForm({ onCreated, initialData = null, onSaved, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    client_name: '',
    project_type: '',
    difficulty: '',
    description: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const editing = Boolean(initialData)

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.project_id || '',
        client_name: initialData.company_id || '',
        project_type: initialData.ai_persona_id || '',
        difficulty: initialData.metadata?.difficulty || '',
        description: initialData.metadata?.description || ''
      })
    }
  }, [initialData])

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

      if (editing) {
        await simSessionService.update(initialData.id, payload)
        setMessage('Simulación actualizada correctamente.')
        onSaved?.()
      } else {
        await simSessionService.create(payload)
        setMessage('Simulación creada correctamente.')
        setForm({ title: '', client_name: '', project_type: '', difficulty: '', description: '' })
        onCreated?.()
      }
      setTimeout(() => setMessage(''), 3000)
      // exit edit mode if any
      if (editing) onCancel?.()
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
       background: 'rgba(31, 41, 55, 0.7)',
       backdropFilter: 'blur(12px)',
       WebkitBackdropFilter: 'blur(12px)',
       border: '1px solid rgba(255, 255, 255, 0.1)',
       borderRadius: '12px',
       padding: '20px',
       boxShadow: '0 0 15px rgba(124, 58, 237, 0.1)'
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#e8dfee' }}>{editing ? 'Editar simulación' : 'Crear nueva simulación'}</h2>

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

      <div style={{ display: 'grid', gap: '12px' }}>
        <label style={{ display: 'grid', gap: '6px', fontSize: '13px', fontWeight: '500', color: '#d2bbff' }}>
          Título
          <input
            name="title"
            value={form.title}
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
        </label>

        <label style={{ display: 'grid', gap: '6px', fontSize: '13px', fontWeight: '500', color: '#d2bbff' }}>
          Cliente
          <input
            name="client_name"
            value={form.client_name}
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
        </label>

        <label style={{ display: 'grid', gap: '6px', fontSize: '13px', fontWeight: '500', color: '#d2bbff' }}>
          Tipo de proyecto
          <input
            name="project_type"
            value={form.project_type}
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
        </label>

        <label style={{ display: 'grid', gap: '6px', fontSize: '13px', fontWeight: '500', color: '#d2bbff' }}>
          Dificultad
          <input
            name="difficulty"
            value={form.difficulty}
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
        </label>

        <label style={{ display: 'grid', gap: '6px', fontSize: '13px', fontWeight: '500', color: '#d2bbff' }}>
          Descripción
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            style={{ 
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(210, 187, 255, 0.3)',
              background: 'rgba(100, 100, 120, 0.2)',
              color: '#e8dfee',
              fontSize: '14px',
              fontFamily: 'inherit',
              transition: 'all 0.2s ease',
              resize: 'vertical'
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
        </label>

        {error && <p style={{ color: '#fca5a5', margin: 0, fontSize: '14px' }}>{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: 'rgba(124, 58, 237, 0.8)',
            color: '#ede0ff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
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
          {submitting ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear simulación'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => { setForm({ title: '', client_name: '', project_type: '', difficulty: '', description: '' }); setError(''); onCancel?.(); }}
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
    </form>
  )
}

export default SimSessionForm
