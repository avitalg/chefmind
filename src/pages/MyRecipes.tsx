import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useSEO } from '../hooks/useSEO';
import { addUtmToPath } from '../utils/utm';
import type { User } from '../hooks/useAuth';

interface MyRecipesProps {
  user: User | null;
}

export default function MyRecipes({ user }: MyRecipesProps) {
  useSEO({
    title: 'My Recipes',
    description: 'Browse and manage your full ChefMind recipe collection.',
    keywords: 'my recipes, recipe collection, saved recipes',
    url: '/recipes',
  });

  const navigate = useNavigate();
  const { recipes, loading, deleteRecipe } = useRecipes();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleDelete = async (place: number, id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteRecipe(id, place);
      } catch (err) {
        console.error('Failed to delete recipe:', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to={addUtmToPath('/', { utm_content: 'my_recipes_back' })}
          className="inline-flex items-center text-teal hover:text-teal-dark mb-4 text-sm font-medium"
        >
          ← Back to Home
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="card-section-title">My Recipes</h1>
          {recipes.length > 0 && (
            <span className="bg-cream text-ink text-xs font-medium px-3 py-1 rounded-full border border-border-warm">
              {recipes.length}
            </span>
          )}
        </div>
        <p className="text-body mt-2">
          {recipes.length === 0
            ? 'Your collection is empty — import or create a recipe to get started.'
            : `All ${recipes.length === 1 ? 'recipe' : 'recipes'} in your collection.`}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-teal"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-base text-gray-600">Loading your recipes...</span>
          </div>
        </div>
      ) : recipes.length === 0 ? (
        <div className="card text-center py-12">
          <h2 className="text-xl font-semibold text-ink mb-2">No recipes yet</h2>
          <p className="text-body mb-6">Import a recipe from a URL or photo, or create one from scratch.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={addUtmToPath('/#import-recipe', { utm_content: 'my_recipes_empty' })} className="btn-primary">
              Import a recipe
            </Link>
            <Link to={addUtmToPath('/create', { utm_content: 'my_recipes_empty' })} className="btn-secondary">
              Create recipe
            </Link>
          </div>
        </div>
      ) : (
        <div className="card p-0 overflow-hidden">
          <div className="divide-y divide-border-warm">
            {recipes.map((recipe, index) => (
              <div
                key={recipe.id}
                className="group flex items-center justify-between gap-3 p-4 sm:p-5 hover:bg-cream transition-colors"
              >
                <Link
                  to={addUtmToPath(`/recipe/${recipe.id}`, { utm_content: 'my_recipes_card' })}
                  className="flex-1 min-w-0 group-hover:text-teal transition-colors"
                >
                  <h2 className="font-semibold text-ink text-base sm:text-lg truncate">{recipe.title}</h2>
                  {recipe.url && (
                    <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                      {new URL(recipe.url).hostname}
                    </p>
                  )}
                </Link>
                <div className="flex gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => navigate(`/edit/${recipe.id}`)}
                    className="p-2 text-teal hover:bg-paper rounded-lg transition-colors"
                    title="Edit recipe"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index, recipe.id, recipe.title)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete recipe"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
