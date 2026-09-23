import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import RecipeCard from '../components/RecipeCard'; // Nouvel import

export default function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.items);

  return (
    <div className="page-container">
      <h1 className="text-center">Mes Recettes Favorites</h1>
      
      {favorites.length === 0 ? (
        <p className="text-center">Aucun favori pour le moment.</p>
      ) : (
        <div className="grid">
          {favorites.map((recipe: any) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}