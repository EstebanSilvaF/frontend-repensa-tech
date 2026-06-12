import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { paths } from '../../routes/paths'
import ChatIcon from '../icons/ChatIcon'
import CubeLogoIcon from '../icons/CubeLogoIcon'
import UserIcon from '../icons/UserIcon'
import './AppNavbar.css'

const navLinks = [
  { label: 'Inicio', to: paths.gallery },
  { label: 'Publicar producto', to: paths.publish },
  { label: 'Historial', to: paths.history },
]

export default function AppNavbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  function handleLogout() {
    logout()
    navigate(paths.home)
  }

  return (
    <header className="app-navbar">
      <Link
        to={paths.gallery}
        className="app-navbar__logo"
        aria-label="Re-Pensa Tech inicio"
      >
        <CubeLogoIcon />
      </Link>

      <nav className="app-navbar__nav" aria-label="Navegación principal">
        {navLinks.map((link) => {
          const isActive = pathname === link.to

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`app-navbar__link${isActive ? ' app-navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="app-navbar__actions">
        <button type="button" className="app-navbar__icon-btn" aria-label="Chat">
          <ChatIcon />
        </button>
        {isAuthenticated ? (
          <button
            type="button"
            className="app-navbar__icon-btn"
            aria-label={user ? `Cerrar sesión de ${user.full_name}` : 'Cerrar sesión'}
            onClick={handleLogout}
          >
            <UserIcon />
          </button>
        ) : (
          <Link
            to={paths.login}
            className="app-navbar__icon-btn"
            aria-label="Iniciar sesión"
          >
            <UserIcon />
          </Link>
        )}
      </div>
    </header>
  )
}
