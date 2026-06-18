import { Link, useLocation } from 'react-router-dom'

function Nav() {
  const { pathname } = useLocation()

  const linkStyle = (path) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: pathname === path ? '#ede0ff' : '#ccc3d8',
    background: pathname === path ? 'rgba(124, 58, 237, 0.3)' : 'transparent',
    border: pathname === path ? '1px solid rgba(210, 187, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    fontSize: '13px'
  })

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '8px', 
      marginTop: '16px',
      padding: '12px 16px',
      borderRadius: '12px',
      background: 'rgba(31, 41, 55, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      width: 'fit-content'
    }}>
      <Link to="/sim-sessions" style={linkStyle('/sim-sessions')}>Simulaciones</Link>
      <Link to="/users" style={linkStyle('/users')}>Usuarios</Link>
    </nav>
  )
}

export default Nav
