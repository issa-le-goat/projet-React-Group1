import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/reducers/authSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const token = useAppSelector((state) => state.auth.token)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Accueil</Link>
        <Link to="/users">Annuaire</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <nav className="nav nav-auth">
        {token ? (
          <>
            <Link to="/profile">Mon Profil</Link>
            <Link to="/favorites">Mes Favoris</Link>
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </nav>
    </header>
  )
}
