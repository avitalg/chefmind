import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecipes } from './contexts/RecipeContext'

interface Recipe {
  id: string
  title: string
  ingredients: Array<{ amount: number; unit: string; name: string }>
  instructions: string[]
  url?: string
  _id?: string
  direction: string
}

interface User {
  displayName: string
  id: string
}

interface HomePageProps {
  user: User | null
}

export default function HomePage({ user }: HomePageProps) {
  const navigate = useNavigate()
  const { recipes, loading, error, clearError, deleteRecipe, addRecipe } = useRecipes()
  const [importUrl, setImportUrl] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importError, setImportError] = useState('')

  const handleDelete = async (place: number, id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteRecipe(id, place)
      } catch (err) {
        console.error('Failed to delete recipe:', err)
      }
    }
  }

  const handleImport = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsImporting(true)
    setImportError('')
    clearError()

    try {
      // Use addRecipe which handles the import internally
      const recipe = await addRecipe({ url: importUrl } as Recipe)
      
      // Navigate to edit page with the recipe ID
      navigate(`/edit/${recipe.id}`)
      setImportUrl('') // Clear the input after successful import
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to import recipe'
      setImportError(message)
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ChefMind</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {user ? `Hello, ${user.displayName}!` : 'Your Personal Recipe Collection'}
        </p>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          {user
            ? 'Import, organize, and manage your favorite recipes in one place.'
            : 'Sign in to start building your personal recipe collection and never lose a great recipe again.'}
        </p>
      </div>

      {/* Import Recipe Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Import New Recipe</h2>
        </div>

        <form onSubmit={handleImport} className="space-y-6">
          <div>
            <label htmlFor="recipe-url" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe URL
            </label>
            <div className="relative">
              <input
                id="recipe-url"
                type="url"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/recipe"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isImporting || !user}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center ${
              user
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isImporting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Importing Recipe...
              </>
            ) : user ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Import Recipe
              </>
            ) : (
              'Sign in to Import Recipes'
            )}
          </button>

          {importError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-700">{importError}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {!user && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-blue-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-blue-700">Sign in to save and manage your recipes</p>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Recipes Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Recipes</h2>
          </div>
          {user && recipes.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {!user ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Sign in to view your recipes
              </h3>
              <p className="text-gray-500 mb-6">
                Your saved recipes will appear here once you sign in
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-blue-800 mb-2">What you can do:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Import recipes from any website</li>
                  <li>• Organize and categorize your collection</li>
                  <li>• Edit and customize recipes</li>
                  <li>• Access your recipes from anywhere</li>
                </ul>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-lg text-gray-600">Loading your recipes...</span>
              </div>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
              <p className="text-gray-500 mb-6">
                Start by importing your first recipe from any website
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-green-800 mb-2">Get started:</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Find a recipe you love online</li>
                  <li>• Copy the URL and paste it above</li>
                  <li>• We'll extract all the details for you</li>
                  <li>• Edit and customize as needed</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="flex-1 group-hover:text-blue-600 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{recipe.title}</h3>
                      {recipe.url && (
                        <p className="text-sm text-gray-500 truncate max-w-md">
                          {new URL(recipe.url).hostname}
                        </p>
                      )}
                    </Link>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => navigate(`/edit/${recipe.id}`)}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit recipe"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(recipes.indexOf(recipe), recipe.id, recipe.title)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete recipe"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
