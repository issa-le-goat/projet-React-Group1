import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosInstance'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addFavorite, removeFavorite } from '../store/reducers/favoritesSlice'
import type { Recipe as RecipeType } from '../types'

export default function Recipe() {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<RecipeType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector((state) => state.favorites.ids)
  const isFavorite = recipe ? favoriteIds.includes(recipe.id) : false

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        const response = await api.get<RecipeType>(`/recipes/${id}`)
        setRecipe(response.data)
        setError(null)
      } catch {
        setError('Recette introuvable.')
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  const toggleFavorite = () => {
    if (!recipe) return
    if (isFavorite) {
      dispatch(removeFavorite(recipe.id))
    } else {
      dispatch(addFavorite(recipe.id))
    }
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p className="error">{error}</p>
  if (!recipe) return null

  return (
    <div className="page recipe-page">
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <h1>{recipe.name}</h1>
      <button onClick={toggleFavorite} className={isFavorite ? 'favorite active' : 'favorite'}>
        {isFavorite ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
      </button>

      <p>
        {recipe.cuisine} · {recipe.difficulty} · {recipe.servings} portions
      </p>

      <h2>Ingrédients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Étapes</h2>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
