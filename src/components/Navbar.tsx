import { useNavigate } from 'react-router-dom'

export function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">TableUI</span>
        <span className="navbar-title">Hierarchical Records</span>
      </div>
      <div className="navbar-actions">
        <button type="button" className="btn btn-nav" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
