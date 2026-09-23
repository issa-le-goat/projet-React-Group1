import { useAppSelector } from '../store/hooks'

// Route protégée : affiche toutes les infos de l'utilisateur connecté,
// déjà disponibles dans Redux (pas de nouvel appel API nécessaire).
export default function Profile() {
  const user = useAppSelector((state) => state.auth.user)

  if (!user) return null

  return (
    <div className="page profile-page">
      <h1>Mon Profil</h1>
      <img src={user.image} alt={user.username} className="avatar" />
      <ul className="profile-details">
        <li><strong>Nom d'utilisateur :</strong> {user.username}</li>
        <li><strong>Nom complet :</strong> {user.firstName} {user.lastName}</li>
        <li><strong>Email :</strong> {user.email}</li>
        {user.age && <li><strong>Âge :</strong> {user.age}</li>}
        {user.gender && <li><strong>Genre :</strong> {user.gender}</li>}
        {user.phone && <li><strong>Téléphone :</strong> {user.phone}</li>}
        {user.birthDate && <li><strong>Date de naissance :</strong> {user.birthDate}</li>}
        {user.address && (
          <li>
            <strong>Adresse :</strong> {user.address.address}, {user.address.city},{' '}
            {user.address.postalCode}, {user.address.country}
          </li>
        )}
        {user.company && (
          <li>
            <strong>Entreprise :</strong> {user.company.name} — {user.company.title}
          </li>
        )}
      </ul>
    </div>
  )
}
