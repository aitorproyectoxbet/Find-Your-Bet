import { useState } from 'react'
import './Login.css'

function Login({ navigate, login }) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = () => {
    if (!email || !pass) { alert('Rellena todos los campos'); return }
    login({ name: email.split('@')[0], email, role: 'tipster' })
  }

  return (
    <div className="login-page">

      <nav className="login-nav">
        <div className="login-logo" onClick={() => navigate('landing')}>
          FindYour<span>Bet</span>
        </div>
      </nav>

      <div className="login-wrapper">
        <div className="login-box">

          <div className="login-box-logo">FindYour<span>Bet</span></div>
          <div className="login-subtitle">Bienvenido de nuevo</div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="tu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
          </div>

          <button className="btn-submit" onClick={handleLogin}>
            Iniciar sesión
          </button>

          <div className="auth-switch">
            ¿No tienes cuenta?{' '}
            <a onClick={() => navigate('register')}>Regístrate gratis</a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login