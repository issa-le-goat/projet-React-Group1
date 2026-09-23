import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axiosInstance'
import QuoteWidget from '../components/QuoteWidget'
import type { Recipe } from '../types'

// Nom affiché en titre de la page, conformément à la consigne du TP.
const STUDENT_NAME = 'Enzo'

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const response = await api.get<{ recipes: Recipe[] }>('/recipes')
        setRecipes(response.data.recipes)
        setError(null)
      } catch {
        setError('Impossible de charger les recettes.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  return (
    <div className="page home-page">
      <h1>{STUDENT_NAME}</h1>
      <QuoteWidget />

      <h2>Recettes</h2>
      {loading && <p>Chargement des recettes...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recettes/${recipe.id}`} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
