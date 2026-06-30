import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Landing() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glow — top */}
      <div style={{
        position: 'absolute',
        top: '-180px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Hero content */}
      <div style={{
        maxWidth: '680px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
      }}>
        {/* Eyebrow */}
        <span style={{
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#4cd7f6',
          marginBottom: '20px',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(76,215,246,0.2)',
          background: 'rgba(76,215,246,0.06)'
        }}>
          Simulaciones para freelancers
        </span>

        {/* Headline */}
        <h1 style={{
          margin: '0 0 20px 0',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#e8dfee'
        }}>
          Aprendé haciendo{' '}
          <span style={{ color: '#d2bbff' }}>proyectos reales</span>
        </h1>

        {/* Subheading */}
        <p style={{
          margin: '0 auto 40px auto',
          maxWidth: '520px',
          fontSize: '17px',
          lineHeight: 1.65,
          color: '#958da1'
        }}>
          NomAI te enfrenta a clientes simulados, requisitos ambiguos y deadlines reales.
          Practicá tus habilidades técnicas y blandas antes de tu primer proyecto freelance.
        </p>

        {/* CTA with beacon */}
        <div style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Pulse ring */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '14px',
            border: '2px solid rgba(124,58,237,0.35)',
            animation: 'beacon 2.4s ease-out infinite',
            pointerEvents: 'none'
          }} />
          <button
            onClick={() => navigate('/sim-sessions')}
            style={{
              position: 'relative',
              padding: '14px 36px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: '#fff',
              background: '#7c3aed',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background 0.25s ease, box-shadow 0.25s ease',
              boxShadow: '0 0 24px rgba(124,58,237,0.25)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#6d28d9'
              e.currentTarget.style.boxShadow = '0 0 32px rgba(124,58,237,0.45)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#7c3aed'
              e.currentTarget.style.boxShadow = '0 0 24px rgba(124,58,237,0.25)'
            }}
          >
            Comenzar simulación
          </button>
        </div>
      </div>

      {/* Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '720px',
        width: '100%',
        marginTop: '72px',
        position: 'relative',
        zIndex: 1,
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s'
      }}>
        <Pillar
          label="Clientes simulados"
          description="Interactuás con perfiles de clientes generados por IA que plantean escenarios reales."
        />
        <Pillar
          label="Evaluación integral"
          description="Feedback sobre código, comunicación, gestión del tiempo y resolución de problemas."
        />
        <Pillar
          label="Crecimiento medible"
          description="Seguí tu progreso sesión a sesión y llegá preparado a tu primer proyecto real."
        />
      </div>

      {/* Beacon animation keyframes */}
      <style>{`
        @keyframes beacon {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.45);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

function Pillar({ label, description }) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '14px',
      background: 'rgba(31,41,55,0.45)',
      border: '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      <p style={{
        margin: '0 0 8px 0',
        fontSize: '14px',
        fontWeight: 600,
        color: '#d2bbff'
      }}>
        {label}
      </p>
      <p style={{
        margin: 0,
        fontSize: '13px',
        lineHeight: 1.55,
        color: '#958da1'
      }}>
        {description}
      </p>
    </div>
  )
}

export default Landing
