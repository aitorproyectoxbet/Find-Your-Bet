import { useState } from 'react'

function Dashboard({ user, logout }) {
  const [tab, setTab] = useState('apuestas')
  const [bets, setBets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ event: '', pick: '', odds: '', stake: 5, date: '', sport: 'Fútbol', market: '1X2', analysis: '' })

  const inputStyle = {
    width: '100%', background: '#161b24', border: '1px solid #2a3140',
    color: '#e2e8f0', fontFamily: 'Outfit, sans-serif', fontSize: '14px',
    padding: '12px 14px', borderRadius: '6px', outline: 'none', boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 600, color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'
  }

  const submitBet = () => {
    if (!form.event || !form.pick || !form.odds || !form.date) { alert('Omple tots els camps obligatoris'); return }
    const newBet = { ...form, id: Date.now(), odds: parseFloat(form.odds), status: 'pending' }
    setBets([newBet, ...bets])
    setShowModal(false)
    setForm({ event: '', pick: '', odds: '', stake: 5, date: '', sport: 'Fútbol', market: '1X2', analysis: '' })
  }

  const resolveBet = (id, result) => {
    setBets(bets.map(b => b.id === id ? { ...b, status: result } : b))
  }

  const resolved = bets.filter(b => b.status !== 'pending')
  const won = bets.filter(b => b.status === 'won')
  const lost = bets.filter(b => b.status === 'lost')
  let yieldVal = 0
  if (resolved.length > 0) {
    let profit = 0, stakeSum = 0
    resolved.forEach(b => {
      stakeSum += b.stake
      if (b.status === 'won') profit += b.stake * (b.odds - 1)
      else profit -= b.stake
    })
    yieldVal = stakeSum > 0 ? (profit / stakeSum) * 100 : 0
  }
  const avgOdds = bets.length > 0 ? (bets.reduce((s, b) => s + b.odds, 0) / bets.length).toFixed(2) : '—'

  const RANKING = [
    { name: 'ElTipster10', user: '@tipster10', bets: 312, yield: 18.4, wl: '198/114', odds: 1.92 },
    { name: 'BetMaster', user: '@betmaster', bets: 241, yield: 14.2, wl: '152/89', odds: 2.10 },
    { name: 'ValueKing', user: '@valueking', bets: 189, yield: 11.8, wl: '118/71', odds: 2.35 },
    { name: 'Pronos_CR', user: '@pronocr', bets: 445, yield: 9.1, wl: '267/178', odds: 1.78 },
    { name: 'SharpBets', user: '@sharpbets', bets: 98, yield: 7.3, wl: '60/38', odds: 2.88 },
  ]

  return (
    <div style={{ background: '#06080f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Outfit, sans-serif' }}>

      {/* MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,15,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#0d1117', border: '1px solid #2a3140', borderRadius: '12px', padding: '36px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 700, color: '#fff' }}>Nova Aposta</div>
              <button onClick={() => setShowModal(false)} style={{ background: '#161b24', border: '1px solid #1e2530', color: '#64748b', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', fontSize: '18px' }}>×</button>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Esdeveniment</label>
              <input type="text" placeholder="ex. Real Madrid vs Barcelona" value={form.event} onChange={e => setForm({ ...form, event: e.target.value })} style={inputStyle} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={labelStyle}>Esport</label>
                <select value={form.sport} onChange={e => setForm({ ...form, sport: e.target.value })} style={inputStyle}>
                  <option>Fútbol</option>
                  <option>Baloncesto</option>
                  <option>Tenis</option>
                  <option>MMA / Boxeo</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Mercat</label>
                <select value={form.market} onChange={e => setForm({ ...form, market: e.target.value })} style={inputStyle}>
                  <option>1X2</option>
                  <option>Hàndicap</option>
                  <option>Over/Under</option>
                  <option>Ambdós marquen</option>
                  <option>Altre</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={labelStyle}>Selecció</label>
                <input type="text" placeholder="ex. Real Madrid" value={form.pick} onChange={e => setForm({ ...form, pick: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Quota</label>
                <input type="number" placeholder="ex. 1.85" step="0.01" min="1.01" value={form.odds} onChange={e => setForm({ ...form, odds: e.target.value })} style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Data</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Stake (1–10): {form.stake}</label>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '48px', fontWeight: 800, color: '#00ff87', textAlign: 'center', lineHeight: 1, margin: '8px 0 4px' }}>{form.stake}</div>
              <input type="range" min="1" max="10" value={form.stake} onChange={e => setForm({ ...form, stake: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#00ff87' }} />
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={labelStyle}>Anàlisi (opcional)</label>
              <textarea rows="3" placeholder="Explica breument el teu raonament..." value={form.analysis} onChange={e => setForm({ ...form, analysis: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <button onClick={submitBet} style={{ width: '100%', background: '#00ff87', border: 'none', color: '#000', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
              📤 Publicar Aposta
            </button>
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', background: '#0d1117', borderBottom: '1px solid #1e2530', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, color: '#fff' }}>FYB<span style={{ color: '#00ff87' }}>.</span></div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { id: 'apuestas', label: 'Les Meves Apostes' },
              { id: 'ranking', label: 'Ranking' },
              { id: 'ingresos', label: 'Ingressos' },
            ].map(t => (
              <div key={t.id} onClick={() => setTab(t.id)} style={{ padding: '8px 16px', fontSize: '13px', color: tab === t.id ? '#00ff87' : '#64748b', background: tab === t.id ? 'rgba(0,255,135,0.1)' : 'transparent', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
                {t.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#161b24', border: '1px solid #1e2530', padding: '8px 16px 8px 8px', borderRadius: '100px', fontSize: '13px' }}>
            <div style={{ width: '28px', height: '28px', background: '#00ff87', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#000' }}>
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
            <span>{user?.name || 'Usuari'}</span>
          </div>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid #2a3140', color: '#94a3b8', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Sortir</button>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* TAB: APUESTAS */}
        {tab === 'apuestas' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '4px' }}>Panel de Tipster</h2>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Gestiona i publica les teves apostes. El teu historial és públic i auditable.</p>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Yield', value: yieldVal.toFixed(2) + '%', color: yieldVal >= 0 ? '#00ff87' : '#ff4560' },
                { label: 'W / L', value: `${won.length} / ${lost.length}`, color: '#fff' },
                { label: 'Total Apostes', value: bets.length, color: '#fff' },
                { label: 'Quota Mitjana', value: avgOdds, color: '#ffd60a' },
              ].map((k, i) => (
                <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2530', padding: '20px 24px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', fontWeight: 600 }}>{k.label}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1, color: k.color }}>{k.value}</div>
                </div>
              ))}
            </div>

            {/* BETS TABLE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Historial d'Apostes</div>
              <button onClick={() => setShowModal(true)} style={{ background: '#00ff87', border: 'none', color: '#000', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>+ Nova Aposta</button>
            </div>

            <div style={{ background: '#0d1117', border: '1px solid #1e2530', borderRadius: '10px', overflow: 'hidden' }}>
              {bets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 24px', color: '#64748b' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', color: '#94a3b8', marginBottom: '8px' }}>Sense apostes encara</div>
                  <div style={{ fontSize: '13px', marginBottom: '24px' }}>Publica la teva primera aposta per començar a construir el teu historial auditable.</div>
                  <button onClick={() => setShowModal(true)} style={{ background: '#00ff87', border: 'none', color: '#000', padding: '10px 22px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>+ Publicar aposta</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '12px 20px', background: '#161b24', borderBottom: '1px solid #1e2530', fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                    <span>Esdeveniment</span><span>Quota</span><span>Stake</span><span>Estat</span><span>Resoldre</span>
                  </div>
                  {bets.map(b => (
                    <div key={b.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '14px 20px', borderBottom: '1px solid #1e2530', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '14px' }}>{b.event}</div>
                        <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{b.sport} · {b.market} · <strong style={{ color: '#e2e8f0' }}>{b.pick}</strong></div>
                      </div>
                      <span style={{ fontWeight: 600, fontFamily: 'Syne, sans-serif' }}>{b.odds.toFixed(2)}</span>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>S{b.stake}</span>
                      <span>
                        {b.status === 'won' && <span style={{ background: 'rgba(0,255,135,0.1)', color: '#00ff87', border: '1px solid rgba(0,255,135,0.2)', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>Guanyada ✓</span>}
                        {b.status === 'lost' && <span style={{ background: 'rgba(255,69,96,0.1)', color: '#ff4560', border: '1px solid rgba(255,69,96,0.2)', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>Perduda ✗</span>}
                        {b.status === 'pending' && <span style={{ background: 'rgba(100,116,139,0.1)', color: '#94a3b8', border: '1px solid #1e2530', padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>Pendent</span>}
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => resolveBet(b.id, 'won')} style={{ background: 'rgba(0,255,135,0.1)', color: '#00ff87', border: '1px solid rgba(0,255,135,0.2)', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>✓ Win</button>
                            <button onClick={() => resolveBet(b.id, 'lost')} style={{ background: 'rgba(255,69,96,0.1)', color: '#ff4560', border: '1px solid rgba(255,69,96,0.2)', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>✗ Loss</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: RANKING */}
        {tab === 'ranking' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '4px' }}>Ranking Global</h2>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Classificació per Yield. Mínim 5 apostes resoltes per aparèixer.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {RANKING.map((t, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 100px 100px 100px', alignItems: 'center', gap: '16px', padding: '16px 20px', background: '#0d1117', border: '1px solid #1e2530', borderRadius: '8px' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '22px', fontWeight: 800, textAlign: 'center', color: i === 0 ? '#ffd60a' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7c3c' : '#64748b' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{t.user} · {t.bets} apostes</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700, color: '#00ff87' }}>+{t.yield}%</div>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Yield</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>{t.wl}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>W/L</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>{t.odds}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Quota mitjana</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INGRESOS */}
        {tab === 'ingresos' && (
          <div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: '4px' }}>Ingressos i Comissions</h2>
              <p style={{ color: '#64748b', fontSize: '14px' }}>Seguiment del que guanyes a FYB.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Subscriptors', value: '0', color: '#fff' },
                { label: 'Ingressos Bruts', value: '€0.00', color: '#00ff87' },
                { label: 'Ingressos Nets', value: '€0.00', color: '#00ff87' },
                { label: 'Proper Tier', value: '50', color: '#ffd60a' },
              ].map((k, i) => (
                <div key={i} style={{ background: '#0d1117', border: '1px solid #1e2530', padding: '20px 24px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px', fontWeight: 600 }}>{k.label}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '32px', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1, color: k.color }}>{k.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard