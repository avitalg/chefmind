import { useCallback, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function fetchRecipeIdeas(ingredients: string[]): Promise<string[]> {
  if (ingredients.length === 0) {
    return [];
  }
  
  const ingredientsParam = ingredients.map((i) => i.trim()).join(',');
  const url = `${API_BASE_URL}/api/recipes/ideas?ingredients=${encodeURIComponent(ingredientsParam)}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || 'Could not load recipe ideas. Please try again.');
  }
  
  const data = (await response.json()) as string[];
  return data;
}

export default function RecipeIdeas() {
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [titles, setTitles] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = useCallback(() => {
    const value = ingredientInput.trim();
    if (value && !ingredients.includes(value)) {
      setIngredients((prev) => [...prev, value]);
      setIngredientInput('');
      setTitles(null);
      setError(null);
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
    setTitles(null);
    setError(null);
  }, []);

  const handleGetIdeas = useCallback(async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setError(null);
    setTitles(null);
    try {
      const result = await fetchRecipeIdeas(ingredients);
      setTitles(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, [ingredients]);

  return (
    <div className="space-y-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Recipe ideas</h1>
        <p className="text-gray-600 mb-6">
          Enter ingredients you have and we&apos;ll suggest 5 recipes you can make (titles only).
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. chicken, garlic"
            className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Add ingredient"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Add
          </button>
        </div>

        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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
          <p className="text-sm text-gray-500 mb-4">Add at least one ingredient, then click Get ideas.</p>
        )}

        <button
          type="button"
          onClick={handleGetIdeas}
          disabled={ingredients.length === 0 || loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none transition-colors"
        >
          {loading ? 'Loading…' : 'Get 5 recipe ideas'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {titles !== null && titles.length === 0 && !loading && (
          <p className="mt-4 text-gray-600">No recipe ideas found for these ingredients.</p>
        )}

        {titles !== null && titles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">5 recipe ideas</h2>
            <ul className="list-decimal list-inside space-y-2 text-gray-700">
              {titles.map((title, i) => (
                <li key={`${title}-${i}`}>{title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
