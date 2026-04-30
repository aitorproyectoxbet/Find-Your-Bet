import { useState } from 'react'
import './Dashboard.css'

function Dashboard({ user, logout }) {
  const [tab, setTab] = useState('apuestas')
  const [bets, setBets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ event: '', pick: '', odds: '', stake: 5, date: '', sport: 'Fútbol', market: '1X2', analysis: '' })

  const submitBet = () => {
    if (!form.event || !form.pick || !form.odds || !form.date) { alert('Rellena todos los campos obligatorios'); return }
    setBets([{ ...form, id: Date.now(), odds: parseFloat(form.odds), status: 'pending' }, ...bets])
    setShowModal(false)
    setForm({ event: '', pick: '', odds: '', stake: 5, date: '', sport: 'Fútbol', market: '1X2', analysis: '' })
  }

  const resolveBet = (id, result) => setBets(bets.map(b => b.id === id ? { ...b, status: result } : b))

  const resolved = bets.filter(b => b.status !== 'pending')
  const won = bets.filter(b => b.status === 'won')
  const lost = bets.filter(b => b.status === 'lost')
  let yieldVal = 0
  if (resolved.length > 0) {
    let profit = 0, stakeSum = 0
    resolved.forEach(b => { stakeSum += b.stake; if (b.status === 'won') profit += b.stake * (b.odds - 1); else profit -= b.stake })
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
    <div className="dashboard">

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Nueva Apuesta</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="form-group">
              <label className="form-label">Evento</label>
              <input type="text" className="form-input" placeholder="ej. Real Madrid vs Barcelona" value={form.event} onChange={e => setForm({ ...form, event: e.target.value })} />
            </div>

            <div className="form-row-modal">
              <div>
                <label className="form-label">Deporte</label>
                <select className="form-input" value={form.sport} onChange={e => setForm({ ...form, sport: e.target.value })}>
                  <option>Fútbol</option><option>Baloncesto</option><option>Tenis</option><option>MMA / Boxeo</option><option>Otro</option>
                </select>
              </div>
              <div>
                <label className="form-label">Mercado</label>
                <select className="form-input" value={form.market} onChange={e => setForm({ ...form, market: e.target.value })}>
                  <option>1X2</option><option>Hándicap</option><option>Over/Under</option><option>Ambos marcan</option><option>Otro</option>
                </select>
              </div>
            </div>

            <div className="form-row-modal">
              <div>
                <label className="form-label">Selección</label>
                <input type="text" className="form-input" placeholder="ej. Real Madrid" value={form.pick} onChange={e => setForm({ ...form, pick: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Cuota</label>
                <input type="number" className="form-input" placeholder="ej. 1.85" step="0.01" min="1.01" value={form.odds} onChange={e => setForm({ ...form, odds: e.target.value })} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Stake (1–10)</label>
              <div className="stake-display">{form.stake}</div>
              <div className="stake-sub">% del bankroll recomendado</div>
              <input type="range" min="1" max="10" value={form.stake} onChange={e => setForm({ ...form, stake: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#0F6E56' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Análisis (opcional)</label>
              <textarea className="form-input" rows="3" placeholder="Explica brevemente tu razonamiento..." value={form.analysis} onChange={e => setForm({ ...form, analysis: e.target.value })} style={{ resize: 'vertical' }} />
            </div>

            <button className="btn-submit-modal" onClick={submitBet}>📤 Publicar Apuesta</button>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="dash-nav">
        <div className="dash-nav-left">
          <div className="dash-logo">FindYour<span>Bet</span></div>
          <div className="dash-nav-tabs">
            {[
              { id: 'apuestas', label: 'Mis Apuestas' },
              { id: 'ranking', label: 'Ranking' },
              { id: 'ingresos', label: 'Ingresos' },
            ].map(t => (
              <button key={t.id} className={`dash-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>
        <div className="dash-nav-right">
          <div className="user-chip">
            <div className="user-avatar">{(user?.name || 'U')[0].toUpperCase()}</div>
            <span>{user?.name || 'Usuario'}</span>
          </div>
          <button className="btn-logout" onClick={logout}>Salir</button>
        </div>
      </nav>

      {/* BODY */}
      <div className="dash-body">

        {/* TAB: APUESTAS */}
        {tab === 'apuestas' && (
          <div>
            <div className="page-header">
              <h2>Panel de Tipster</h2>
              <p>Gestiona y publica tus apuestas. Tu historial es público y auditable.</p>
            </div>

            <div className="kpi-grid">
              {[
                { label: 'Yield', value: yieldVal.toFixed(2) + '%', cls: yieldVal >= 0 ? 'green' : 'red', sub: 'Beneficio sobre lo apostado' },
                { label: 'W / L', value: `${won.length} / ${lost.length}`, cls: 'white', sub: 'Ganadas / Perdidas' },
                { label: 'Total Apuestas', value: bets.length, cls: 'white', sub: 'Historial completo' },
                { label: 'Cuota Media', value: avgOdds, cls: 'yellow', sub: 'Promedio de cuotas' },
              ].map((k, i) => (
                <div key={i} className="kpi-card">
                  <div className="kpi-label">{k.label}</div>
                  <div className={`kpi-value ${k.cls}`}>{k.value}</div>
                  <div className="kpi-sub">{k.sub}</div>
                </div>
              ))}
            </div>

            <div className="section-head">
              <div className="section-title">Historial de Apuestas</div>
              <button className="btn-new" onClick={() => setShowModal(true)}>+ Nueva Apuesta</button>
            </div>

            <div className="bets-table">
              {bets.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <div className="empty-title">Sin apuestas todavía</div>
                  <div className="empty-sub">Publica tu primera apuesta para empezar a construir tu historial auditable.</div>
                  <button className="btn-new" onClick={() => setShowModal(true)}>+ Publicar apuesta</button>
                </div>
              ) : (
                <>
                  <div className="table-header">
                    <span>Evento</span><span>Cuota</span><span>Stake</span><span>Estado</span><span>Resolver</span>
                  </div>
                  {bets.map(b => (
                    <div key={b.id} className="table-row">
                      <div>
                        <div className="event-name">{b.event}</div>
                        <div className="event-market">{b.sport} · {b.market} · <strong>{b.pick}</strong></div>
                      </div>
                      <span className="odds-val">{b.odds.toFixed(2)}</span>
                      <span className="stake-val">S{b.stake}</span>
                      <span>
                        {b.status === 'won' && <span className="badge badge-green">Ganada ✓</span>}
                        {b.status === 'lost' && <span className="badge badge-red">Perdida ✗</span>}
                        {b.status === 'pending' && <span className="badge badge-gray">Pendiente</span>}
                      </span>
                      <div className="resolve-btns">
                        {b.status === 'pending' && (
                          <>
                            <button className="btn-win" onClick={() => resolveBet(b.id, 'won')}>✓ Win</button>
                            <button className="btn-loss" onClick={() => resolveBet(b.id, 'lost')}>✗ Loss</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB: RANKING */}
        {tab === 'ranking' && (
          <div>
            <div className="page-header">
              <h2>Ranking Global</h2>
              <p>Clasificación por Yield. Mínimo 5 apuestas resueltas para aparecer.</p>
            </div>
            <div className="ranking-list">
              {RANKING.map((t, i) => (
                <div key={i} className="ranking-item">
                  <div className={`rank-pos ${i === 0 ? 'top1' : i === 1 ? 'top2' : i === 2 ? 'top3' : ''}`}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>
                  <div>
                    <div className="tipster-name-rank">{t.name}</div>
                    <div className="tipster-user">{t.user} · {t.bets} apuestas</div>
                  </div>
                  <div className="rank-metric">
                    <div className="rank-metric-val green">+{t.yield}%</div>
                    <div className="rank-metric-label">Yield</div>
                  </div>
                  <div className="rank-metric">
                    <div className="rank-metric-val">{t.wl}</div>
                    <div className="rank-metric-label">W/L</div>
                  </div>
                  <div className="rank-metric">
                    <div className="rank-metric-val">{t.odds}</div>
                    <div className="rank-metric-label">Cuota media</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INGRESOS */}
        {tab === 'ingresos' && (
          <div>
            <div className="page-header">
              <h2>Ingresos y Comisiones</h2>
              <p>Seguimiento de lo que ganas en FindYourBet.</p>
            </div>
            <div className="commission-banner">
              <div className="commission-text">
                <h3>Comisión FYB este mes</h3>
                <p>Tier actual: <strong>Nuevo</strong> — 30% de comisión sobre suscripciones</p>
              </div>
              <div className="commission-amount">€0.00</div>
            </div>
            <div className="kpi-grid">
              {[
                { label: 'Suscriptores', value: '0', cls: 'white', sub: 'Clientes activos' },
                { label: 'Ingresos Brutos', value: '€0.00', cls: 'green', sub: 'Antes de comisión' },
                { label: 'Ingresos Netos', value: '€0.00', cls: 'green', sub: 'Después de comisión' },
                { label: 'Próximo Tier', value: '50', cls: 'yellow', sub: 'Apuestas necesarias' },
              ].map((k, i) => (
                <div key={i} className="kpi-card">
                  <div className="kpi-label">{k.label}</div>
                  <div className={`kpi-value ${k.cls}`}>{k.value}</div>
                  <div className="kpi-sub">{k.sub}</div>
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