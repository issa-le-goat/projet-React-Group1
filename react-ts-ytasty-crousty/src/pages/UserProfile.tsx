import { Link, useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();

  return (
    <section>
      <h1>Profil de l'utilisateur</h1>
      <p>Vous êtes sur la page de l'utilisateur n° {userId ?? 'inconnu'}</p>
      <br />
      <Link to="/userList">Retour à la liste</Link>
    </section>
  );
}

export default UserProfile;