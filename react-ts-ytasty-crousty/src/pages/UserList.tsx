import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '../store/store';

export default function UserList() {
  const users = useSelector((state: RootState) => state.auth.usersList);

  return (
    <div className="page-container page-container-sm">
      <h1 className="text-center">Annuaire des Utilisateurs</h1>
      
      {users.length === 0 ? (
        <p className="text-center">Chargement des utilisateurs...</p>
      ) : (
        <ul className="list-unstyled">
          {users.map((user) => (
            <li key={user.id} className="user-card">
              <Link to={`/users/${user.id}`} className="user-link">
                <img src={user.image} alt={user.username} className="user-avatar" />
                <div>
                  <strong className="user-name">{user.firstName} {user.lastName}</strong>
                  <span className="user-handle">@{user.username}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}