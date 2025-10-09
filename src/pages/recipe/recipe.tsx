import { Link, useNavigate, useParams } from 'react-router-dom'
import { useRecipes } from '../../contexts/RecipeContext'
import './recipe.css'


export default function Recipe() {
  const { id } = useParams<{ id: string }>()
  const { recipes } = useRecipes()
  const navigate = useNavigate()
  const recipe = id ? recipes[id] : null

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            ← Back to Recipes
          </Link>
        </div>
      </div>
    )
  }

  const textAlign = recipe?.direction === 'rtl' ? 'right' : 'left'

  return (
    <div className="max-w-4xl mx-auto p-6" dir={recipe.direction} style={{ textAlign }}>
      {/* Header */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-4">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Recipes
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">{recipe.title}</h1>

        {recipe.url && (
          <a
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View original recipe
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-green-500"
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
            Ingredients
          </h2>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <span className="font-semibold text-gray-800">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                  <span className="ml-2 text-gray-600">{ingredient.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Instructions
          </h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => navigate(`/edit/${id}`)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Recipe
        </button>
      </div>
    </div>
  )
}
