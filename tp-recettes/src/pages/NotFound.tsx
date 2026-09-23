import { Link } from 'react-router-dom'

// Vue affichée via errorElement du routeur (route inconnue ou erreur de chargement)
export default function NotFound() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>La page que tu cherches n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  )
}
