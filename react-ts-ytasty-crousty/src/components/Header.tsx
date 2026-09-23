import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/reducers/user";

export default function Header() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-logo">Ytasty Crousty</div>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/users">Annuaire</Link></li>
          <li><Link to="/posts">Blog</Link></li>
          
          {token ? (
            <>
              <li><Link to="/profile">Mon Profil</Link></li>
              <li><Link to="/favoris">Mes Favoris</Link></li>
              <li><button onClick={handleLogout} className="btn-logout">Déconnexion</button></li>
            </>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}