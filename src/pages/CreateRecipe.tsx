import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipes } from '../contexts/RecipeContext'
import { useSEO } from '../hooks/useSEO'

interface Ingredient {
  amount: number
  unit: string
  name: string
}

interface Recipe {
  id: string
  title: string
  ingredients: Ingredient[]
  instructions: string[]
  url?: string
  _id?: string
  direction: string
}

export default function CreateRecipe() {
  useSEO({
    title: 'Create Recipe',
    description: 'Create a new recipe from scratch with ChefMind. Add ingredients, instructions, and customize your recipe to build your perfect recipe collection.',
    keywords: 'create recipe, new recipe, recipe builder, custom recipe, recipe creator',
    url: '/create',
  });

  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    title: '',
    ingredients: [{ amount: 0, unit: '', name: '' }],
    instructions: [''],
    direction: 'ltr'
  })
  const [error, setError] = useState('')
  const { createManualRecipe } = useRecipes()
  const navigate = useNavigate()

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError('')

    // Validate required fields
    if (!recipe.title.trim()) {
      setError('Recipe title is required')
      return
    }

    const validIngredients = recipe.ingredients.filter(ing => 
      ing.name.trim() && ing.amount > 0
    )
    if (validIngredients.length === 0) {
      setError('At least one ingredient is required')
      return
    }

    const validInstructions = recipe.instructions.filter(inst => inst.trim())
    if (validInstructions.length === 0) {
      setError('At least one instruction is required')
      return
    }

    try {
      // Generate a unique ID for the new recipe
      const newRecipe = {
        ...recipe,
        id: `manual-${Date.now()}`,
        ingredients: validIngredients,
        instructions: validInstructions
      }

      // Create the manual recipe
      await createManualRecipe(newRecipe)
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create recipe'
      setError(message)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-[#2ec4b6] hover:text-[#1fa396]"
        >
          ← Back to Recipes
        </button>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 leading-tight">Create New Recipe</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-medium text-gray-700">
            Recipe Title *
          </label>
          <input
            id="title"
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
            placeholder="Enter recipe title"
            required
          />
        </div>

        <fieldset>
          <legend className="block mb-2 font-medium text-gray-700">Ingredients *</legend>
          <div className="space-y-3">
            {recipe.ingredients.map((ing: Ingredient, index: number) => (
              <div key={index} className="flex space-x-3">
                <input
                  type="number"
                  value={ing.amount}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients]
                    newIngredients[index] = { ...ing, amount: parseFloat(e.target.value) || 0 }
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
                  step="0.1"
                  min="0"
                  placeholder="0"
                />
                <input
                  type="text"
                  value={ing.unit}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients]
                    newIngredients[index] = { ...ing, unit: e.target.value }
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="w-24 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
                  placeholder="cup"
                />
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients]
                    newIngredients[index] = { ...ing, name: e.target.value }
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
                  placeholder="ingredient name"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newIngredients = recipe.ingredients.filter((_, i) => i !== index)
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setRecipe({
                ...recipe,
                ingredients: [...recipe.ingredients, { amount: 0, unit: '', name: '' }],
              })
            }}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            + Add Ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend className="block mb-2 font-medium text-gray-700">Instructions *</legend>
          <div className="space-y-3">
            {recipe.instructions.map((instruction: string, index: number) => (
              <div key={index} className="flex space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-[#2ec4b6] text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                  {index + 1}
                </span>
                <textarea
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...recipe.instructions]
                    newInstructions[index] = e.target.value
                    setRecipe({ ...recipe, instructions: newInstructions })
                  }}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
                  rows={3}
                  placeholder="Enter instruction step"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newInstructions = recipe.instructions.filter((_, i) => i !== index)
                    setRecipe({ ...recipe, instructions: newInstructions })
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors self-start"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setRecipe({
                ...recipe,
                instructions: [...recipe.instructions, ''],
              })
            }}
            className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            + Add Instruction
          </button>
        </fieldset>

        <div>
          <label htmlFor="direction" className="block mb-2 font-medium text-gray-700">
            Text Direction
          </label>
          <select
            id="direction"
            value={recipe.direction}
            onChange={(e) => setRecipe({ ...recipe, direction: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2ec4b6] focus:border-[#2ec4b6]"
          >
            <option value="ltr">Left to Right (LTR)</option>
            <option value="rtl">Right to Left (RTL)</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-[#2ec4b6] text-white rounded-lg hover:bg-[#1fa396] transition-colors font-medium"
          >
            Create Recipe
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
