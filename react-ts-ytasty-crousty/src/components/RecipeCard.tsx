import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/reducers/favorites';
import type { RootState } from '../store/store';

interface RecipeCardProps {
  recipe: any;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((fav: any) => fav.id === recipe.id);

  return (
    <div className="card">
      <Link to={`/recipe/${recipe.id}`} className="card-link">
        <img src={recipe.image} alt={recipe.name} className="card-img" />
        <h3>{recipe.name}</h3>
        <p>⏱ {recipe.prepTimeMinutes} min</p>
      </Link>
      <button 
        onClick={() => dispatch(toggleFavorite(recipe))}
        className={`btn ${isFavorite ? 'btn-fav-active' : 'btn-fav-inactive'}`}
      >
        {isFavorite ? '❤️ Retirer' : '🤍 Ajouter aux favoris'}
      </button>
    </div>
  );
}