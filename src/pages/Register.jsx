import { useState } from 'react'

function Register({ navigate, login }) {
  const [role, setRole] = useState('tipster')
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleRegister = () => {
    if (!name || !email || !pass) { alert('Omple tots els camps'); return }
    login({ name, user, email, role })
  }

  const inputStyle = {
    width: '100%', background: '#161b24', border: '1px solid #2a3140',
    color: '#e2e8f0', fontFamily: 'Outfit, sans-serif', fontSize: '14px',
    padding: '12px 14px', borderRadius: '6px', outline: 'none', boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'
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
          <div style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Crea el teu compte — és gratis</div>

          {/* ROLE SELECTOR */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {[
              { id: 'tipster', icon: '📊', name: 'Tipster', desc: 'Publico apuestas' },
              { id: 'bettor', icon: '🔍', name: 'Apostador', desc: 'Busco tipsters' },
            ].map(r => (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  background: role === r.id ? 'rgba(0,255,135,0.1)' : '#161b24',
                  border: role === r.id ? '2px solid #00ff87' : '2px solid #2a3140',
                  padding: '16px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{r.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }}>{r.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>{r.desc}</div>
              </div>
            ))}
          </div>

          {/* FIELDS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
            <div>
              <label style={labelStyle}>Nom</label>
              <input type="text" placeholder="El teu nom" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Usuari</label>
              <input type="text" placeholder="@usuari" value={user} onChange={e => setUser(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Email</label>
            <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={labelStyle}>Contrasenya</label>
            <input type="password" placeholder="Mínim 8 caràcters" value={pass} onChange={e => setPass(e.target.value)} style={inputStyle} />
          </div>

          <button
            onClick={handleRegister}
            style={{ width: '100%', background: '#00ff87', border: 'none', color: '#000', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, marginTop: '8px' }}
          >
            Crear compte
          </button>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
            Ja tens compte?{' '}
            <span onClick={() => navigate('login')} style={{ color: '#00ff87', cursor: 'pointer', fontWeight: 500 }}>
              Inicia sessió
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register