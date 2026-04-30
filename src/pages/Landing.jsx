function Landing({ navigate }) {
  return (
    <div style={{ background: '#06080f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>
      
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', borderBottom: '1px solid #1e2530', background: 'rgba(6,8,15,0.8)' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, color: '#fff' }}>
          FYB<span style={{ color: '#00ff87' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('login')} style={{ background: 'transparent', border: '1px solid #2a3140', color: '#94a3b8', padding: '10px 22px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
            Iniciar sessió
          </button>
          <button onClick={() => navigate('register')} style={{ background: '#00ff87', border: 'none', color: '#000', padding: '10px 22px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
            Començar gratis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ textAlign: 'center', padding: '100px 24px 80px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(0,255,135,0.1)', border: '1px solid rgba(0,255,135,0.2)', padding: '6px 16px', borderRadius: '100px', fontSize: '12px', color: '#00ff87', marginBottom: '32px' }}>
          Beta — Plataforma per a Tipsters
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '-2px', color: '#fff', marginBottom: '24px' }}>
          Find Your<br /><span style={{ color: '#00ff87' }}>Bet</span>
        </h1>
        <p style={{ fontSize: '19px', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.6, fontWeight: 300 }}>
          La primera plataforma on els tipsters competeixen per transparència. Rankings auditats, apuestas verificades, zero trampa.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <button onClick={() => navigate('register')} style={{ background: '#00ff87', border: 'none', color: '#000', padding: '14px 32px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: 600 }}>
            Soc Tipster — Crear canal
          </button>
          <button onClick={() => navigate('register')} style={{ background: 'transparent', border: '1px solid #2a3140', color: '#e2e8f0', padding: '14px 32px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px' }}>
            Buscar Tipsters
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid #1e2530' }}>
        {[
          { num: '0%', label: 'Trampa permesa' },
          { num: '100%', label: 'Historial auditable' },
          { num: '∞', label: 'Tipsters benvinguts' },
          { num: '24/7', label: 'Rankings en viu' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, maxWidth: '200px', padding: '28px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid #1e2530' : 'none' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, color: '#00ff87' }}>{s.num}</div>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Landing