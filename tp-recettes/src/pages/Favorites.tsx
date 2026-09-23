import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAppSelector } from '../store/hooks'
import type { Recipe } from '../types'

export default function Favorites() {
  const favoriteIds = useAppSelector((state) => state.favorites.ids)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (favoriteIds.length === 0) {
        setRecipes([])
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        // L'API ne propose pas de "GET par liste d'IDs" : on fait un appel
        // par recette favorite et on attend tout en parallèle.
        const responses = await Promise.all(
          favoriteIds.map((id) => api.get<Recipe>(`/recipes/${id}`))
        )
        setRecipes(responses.map((r) => r.data))
        setError(null)
      } catch {
        setError('Impossible de charger les favoris.')
      } finally {
        setLoading(false)
      }
    }

    fetchFavoriteRecipes()
  }, [favoriteIds])

  return (
    <div className="page favorites-page">
      <h1>Mes Favoris</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && recipes.length === 0 && <p>Aucune recette favorite pour le moment.</p>}

      <div className="grid">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recettes/${recipe.id}`} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
