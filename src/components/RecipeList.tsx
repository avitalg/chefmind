import { useRecipesQuery, useDeleteRecipeMutation } from '../hooks/useRecipes'
import { useNavigate } from 'react-router-dom'

interface User {
  displayName: string
  id: string
}

interface RecipeListProps {
  user: User | null
}

export default function RecipeList({ user }: RecipeListProps) {
  const navigate = useNavigate()
  
  // Use React Query hooks directly
  const { data: recipes = [], isLoading, error } = useRecipesQuery(user)
  const deleteRecipeMutation = useDeleteRecipeMutation()

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteRecipeMutation.mutateAsync({ id, place: 0 })
      } catch (err) {
        console.error('Failed to delete recipe:', err)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-[#EBF4F6] border-t-[#088395] rounded-full animate-spin mx-auto mb-4"></div>
        <span className="text-lg text-gray-600">Loading your recipes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
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
          <p className="text-red-700">Error loading recipes: {error.message}</p>
        </div>
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-[#EBF4F6] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-12 h-12 text-[#088395]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5c1.706 0 3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18c-1.706 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#088395] mb-2">No recipes yet!</h3>
        <p className="text-[#09637E]">Start by importing a recipe from a URL or creating one manually.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="group bg-white rounded-md p-5 transition-colors border border-gray-200 hover:border-gray-300"
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="flex-1 group-hover:text-[#088395] transition-colors text-left"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{recipe.title}</h3>
              {recipe.url && (
                <p className="text-sm text-gray-500 truncate max-w-md">
                  {new URL(recipe.url).hostname}
                </p>
              )}
            </button>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => navigate(`/edit/${recipe.id}`)}
                className="p-2 text-[#088395] hover:text-[#09637E] hover:bg-[#EBF4F6] rounded-lg transition-colors"
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
                onClick={() => handleDelete(recipe.id, recipe.title)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete recipe"
                disabled={deleteRecipeMutation.isPending}
              >
                {deleteRecipeMutation.isPending ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                ) : (
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
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
