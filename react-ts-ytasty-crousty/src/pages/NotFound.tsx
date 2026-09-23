import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function UserProfile() {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return <h2 className="text-center mt-4">Chargement du profil...</h2>;

  return (
    <div className="profile-container">
      <h1>Mon Profil Privé</h1>
      <img src={user.image} alt={user.username} className="profile-avatar" />
      <h2>{user.firstName} {user.lastName}</h2>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Username :</strong> {user.username}</p>
    </div>
  );
}