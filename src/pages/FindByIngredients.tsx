import { useCallback, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecipes } from '../contexts/RecipeContext';
import { useSEO } from '../hooks/useSEO';
import type { Recipe } from '../hooks/useRecipes';
import { addUtmToPath } from '../utils/utm';

function normalizeIngredient(name: string): string {
  return name.trim().toLowerCase();
}

function recipeContainsIngredient(recipe: Recipe, searchTerm: string): boolean {
  const normalized = normalizeIngredient(searchTerm);
  if (!normalized) return false;
  return recipe.ingredients.some((ing) =>
    normalizeIngredient(ing.name).includes(normalized) ||
    normalized.includes(normalizeIngredient(ing.name))
  );
}

function getMatchingRecipes(recipes: Recipe[], ingredients: string[]): Recipe[] {
  const normalized = ingredients
    .map(normalizeIngredient)
    .filter((name) => name.length > 0);
  if (normalized.length === 0) return [];
  return recipes.filter((recipe) =>
    normalized.every((term) => recipeContainsIngredient(recipe, term))
  );
}

export default function FindByIngredients() {
  useSEO({
    title: 'Find Recipes by Ingredients',
    description: 'Search your recipe collection by ingredients. Find recipes that use specific ingredients you have available with ChefMind\'s ingredient-based search.',
    keywords: 'find recipes by ingredients, ingredient search, recipe search, cooking with ingredients',
    url: '/find',
  });

  const navigate = useNavigate();
  const { recipes, loading, error } = useRecipes();
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const matchingRecipes = useMemo(
    () => getMatchingRecipes(recipes, ingredients),
    [recipes, ingredients]
  );

  const handleAddIngredient = useCallback(() => {
    const value = ingredientInput.trim();
    if (value && !ingredients.includes(value)) {
      setIngredients((prev) => [...prev, value]);
      setIngredientInput('');
    }
  }, [ingredientInput, ingredients]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddIngredient();
      }
    },
    [handleAddIngredient]
  );

  const handleRemoveIngredient = useCallback((index: number) => {
    setIngredients((prev) => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  }, []);

  const handleRecipeClick = useCallback(
    (id: string) => {
      navigate(`/recipe/${id}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-[#cbf3f0] border-t-[#2ec4b6] rounded-full animate-spin mx-auto mb-4" />
        <span className="text-lg text-gray-600">Loading recipes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-700">Error loading recipes: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 leading-tight">
          What can I make?
        </h1>
        <p className="text-gray-600 mb-6">
          Add ingredients you have. We&apos;ll show recipes that use all of them.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. chicken, garlic"
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
            aria-label="Add ingredient"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-4 py-2 bg-[#2ec4b6] text-white rounded-lg hover:bg-[#1fa396] transition-colors"
          >
            Add
          </button>
        </div>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {ingredients.map((ing, index) => (
              <span
                key={`${ing}-${index}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {ing}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-1 text-gray-500 hover:text-red-600 focus:outline-none"
                  aria-label={`Remove ${ing}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {ingredients.length === 0 && (
          <p className="text-sm text-gray-500 mb-6">
            Add at least one ingredient to find matching recipes.
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {ingredients.length === 0
            ? 'Your recipes'
            : matchingRecipes.length === 0
              ? 'No matching recipes'
              : `${matchingRecipes.length} recipe${matchingRecipes.length === 1 ? '' : 's'} you can make`}
        </h2>

        {ingredients.length > 0 && matchingRecipes.length === 0 && (
          <p className="text-gray-600">
            No recipes in your collection use all of these ingredients. Try
            fewer or different ingredients.
          </p>
        )}

        {ingredients.length === 0 && recipes.length === 0 && (
          <p className="text-gray-600">
            You don&apos;t have any recipes yet. Import or create recipes to find
            what you can make with your ingredients.
          </p>
        )}

        {matchingRecipes.length > 0 && (
          <div className="grid gap-4">
            {matchingRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => handleRecipeClick(recipe.id)}
                  className="w-full text-left group-hover:text-[#2ec4b6] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {recipe.title}
                  </h3>
                  {recipe.url && (
                    <p className="text-sm text-gray-500 truncate max-w-md">
                      {new URL(recipe.url).hostname}
                    </p>
                  )}
                </button>
                <div className="mt-2 flex gap-2">
                  <Link
                    to={addUtmToPath(`/recipe/${recipe.id}`, { utm_content: 'find_view_recipe' })}
                    className="text-sm text-[#2ec4b6] hover:underline"
                  >
                    View recipe
                  </Link>
                  <Link
                    to={addUtmToPath(`/edit/${recipe.id}`, { utm_content: 'find_edit' })}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
