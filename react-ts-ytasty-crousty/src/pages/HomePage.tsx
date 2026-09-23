import { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteWidget from '../components/QuoteWidget';
import RecipeCard from '../components/RecipeCard'; // Nouvel import

export default function HomePage() {
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/recipes')
      .then(res => setRecipes(res.data.recipes))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <QuoteWidget />
      <h1 className="text-center mt-4">Catalogue de Recettes</h1>
      <div className="grid">
        {recipes.map((recipe: any) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}