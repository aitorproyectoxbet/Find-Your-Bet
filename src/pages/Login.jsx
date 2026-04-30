import { useState } from 'react'

function Login({ navigate, login }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = () => {
    if (!email || !pass) { alert('Omple tots els camps'); return }
    const name = email.split('@')[0]
    login({ name, email, role: 'tipster' })
  }

  return (
    <div style={{ background: '#06080f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>

      {/* NAV */}
      <nav style={{ padding: '16px 32px', borderBottom: '1px solid #1e2530', background: '#0d1117' }}>
        <div onClick={() => navigate('landing')} style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, color: '#fff', cursor: 'pointer' }}>
          FYB<span style={{ color: '#00ff87' }}>.</span>
        </div>
      </nav>

      {/* FORM */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 65px)', padding: '24px' }}>
        <div style={{ background: '#0d1117', border: '1px solid #1e2530', padding: '40px', width: '100%', maxWidth: '420px', borderRadius: '12px' }}>
          
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
            FYB<span style={{ color: '#00ff87' }}>.</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>Benvingut de nou</div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', background: '#161b24', border: '1px solid #2a3140', color: '#e2e8f0', fontFamily: 'Outfit, sans-serif', fontSize: '14px', padding: '12px 14px', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Contrasenya</label>
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              style={{ width: '100%', background: '#161b24', border: '1px solid #2a3140', color: '#e2e8f0', fontFamily: 'Outfit, sans-serif', fontSize: '14px', padding: '12px 14px', borderRadius: '6px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{ width: '100%', background: '#00ff87', border: 'none', color: '#000', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginTop: '8px' }}
          >
            Entrar
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
            No tens compte?{' '}
            <span onClick={() => navigate('register')} style={{ color: '#00ff87', cursor: 'pointer', fontWeight: 500 }}>
              Registra't gratis
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login