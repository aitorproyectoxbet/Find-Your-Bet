import { useState } from 'react'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const [page, setPage] = useState('landing')
  const [user, setUser] = useState(null)

  const navigate = (p) => {
    setPage(p)
    window.scrollTo(0, 0)
  }

  const login = (userData) => {
    setUser(userData)
    navigate('dashboard')
  }

  const logout = () => {
    setUser(null)
    navigate('landing')
  }

  return (
    <>
      {page === 'landing' && <Landing navigate={navigate} />}
      {page === 'login' && <Login navigate={navigate} login={login} />}
      {page === 'register' && <Register navigate={navigate} login={login} />}
      {page === 'dashboard' && <Dashboard navigate={navigate} user={user} logout={logout} />}
    </>
  )
}

export default App