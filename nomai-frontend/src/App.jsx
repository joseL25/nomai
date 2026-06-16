import { useState } from 'react'
import SimSessionForm from './components/SimSessionForm.jsx'
import SimSessionList from './components/SimSessionList.jsx'
import UserForm from './components/UserForm.jsx'
import UserList from './components/UserList.jsx'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [usersRefresh, setUsersRefresh] = useState(0)

  function handleCreated() {
    setRefreshKey((current) => current + 1)
  }

  return (
    <main style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: '960px', margin: '0 auto' }}>
      <header>
        <h1 style={{ margin: 0 }}>NomAI Frontend</h1>
        {/* <p style={{ color: '#4b5563', marginTop: '8px' }}>
          Conecta con el backend en <code>/api</code> a través del proxy de Vite.
        </p> */}
      </header>

      <div style={{ display: 'grid', gap: '24px', marginTop: '24px' }}>
        <div style={{ display: 'grid', gap: '12px' }}>
          <SimSessionForm onCreated={handleCreated} />
          <div>
            <h2 style={{ marginBottom: '16px' }}>Simulaciones</h2>
            <SimSessionList refreshKey={refreshKey} />
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          <UserForm onCreated={() => setUsersRefresh((s) => s + 1)} />
          <div>
            <h2 style={{ marginBottom: '16px' }}>Usuarios</h2>
            <UserList refreshKey={usersRefresh} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
