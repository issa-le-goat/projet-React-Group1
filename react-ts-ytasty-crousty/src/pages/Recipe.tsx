import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toggleFavorite } from '../store/reducers/favorites';
import type { RootState } from '../store/store';

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = recipe ? favorites.some((fav: any) => fav.id === recipe.id) : false;

  useEffect(() => {
    axios.get(`https://dummyjson.com/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <h2 className="text-center">Chargement...</h2>;

  return (
    <div className="page-container page-container-sm">
      <Link to="/">&larr; Retour à l'accueil</Link>
      
      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <button 
          onClick={() => dispatch(toggleFavorite(recipe))}
          className={`btn ${isFavorite ? 'btn-fav-active' : 'btn-fav-inactive'}`}
        >
          {isFavorite ? '❤️ Favori sauvegardé' : '🤍 Ajouter aux favoris'}
        </button>
      </div>

      <img src={recipe.image} alt={recipe.name} className="recipe-img-large" />
      
      <div className="recipe-content">
        <div className="recipe-section">
          <h3>Ingrédients</h3>
          <ul>
            {recipe.ingredients.map((ing: string, i: number) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
        <div className="recipe-section">
          <h3>Instructions</h3>
          <ol>
            {recipe.instructions.map((inst: string, i: number) => <li key={i}>{inst}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}