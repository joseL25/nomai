import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SimSessionForm from './components/SimSessionForm.jsx'
import SimSessionList from './components/SimSessionList.jsx'
import UserForm from './components/UserForm.jsx'
import UserList from './components/UserList.jsx'
import Nav from './components/Nav.jsx'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [usersRefresh, setUsersRefresh] = useState(0)
  const [editingSim, setEditingSim] = useState(null)
  const [editingUser, setEditingUser] = useState(null)

  function handleCreated() {
    setRefreshKey((current) => current + 1)
  }

  function handleSimSaved() {
    setRefreshKey((current) => current + 1)
    setEditingSim(null)
  }

  function handleUserSaved() {
    setUsersRefresh((s) => s + 1)
    setEditingUser(null)
  }

  return (
      <main style={{ 
        padding: '24px', 
        fontFamily: 'Inter, system-ui, sans-serif', 
        maxWidth: '1200px', 
        margin: '0 auto',
        background: '#15121b',
        color: '#e8dfee',
        minHeight: '100vh'
      }}>
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '32px',
            fontWeight: '700',
            lineHeight: '40px',
            letterSpacing: '-0.02em',
            color: '#d2bbff'
          }}>NomAI</h1>
        </header>

      <Nav />

      <div style={{ marginTop: '24px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/sim-sessions" replace />} />

          <Route
            path="/sim-sessions"
            element={
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <SimSessionForm onCreated={handleCreated} initialData={editingSim} onSaved={handleSimSaved} onCancel={() => setEditingSim(null)} />
                  <div>
                      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600', color: '#e8dfee' }}>Simulaciones</h2>
                    <SimSessionList refreshKey={refreshKey} onEdit={(s) => setEditingSim(s)} onDeleted={() => setRefreshKey((c) => c + 1)} />
                  </div>
                </div>
              </div>
            }
          />

          <Route
            path="/users"
            element={
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <UserForm onCreated={() => setUsersRefresh((s) => s + 1)} initialData={editingUser} onSaved={handleUserSaved} onCancel={() => setEditingUser(null)} />
                  <div>
                      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600', color: '#e8dfee' }}>Usuarios</h2>
                    <UserList refreshKey={usersRefresh} onEdit={(u) => setEditingUser(u)} onDeleted={() => setUsersRefresh((s) => s + 1)} />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </main>
  )
}

export default App
