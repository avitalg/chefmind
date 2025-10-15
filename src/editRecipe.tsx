import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipes } from './contexts/RecipeContext'

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

interface EditRecipeProps {
  recipe: Recipe
  onNavigateHome: () => void
}

export default function EditRecipe({ recipe: initialRecipe }: EditRecipeProps) {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe)
  const [error, setError] = useState('')
  const { updateRecipe } = useRecipes()
  const navigate = useNavigate()

  const handleSave = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setError('')

    try {
      await updateRecipe(recipe)
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update recipe'
      setError(message)
    }
  }

  if (!recipe) return <div>Loading...</div>

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-blue-500 hover:text-blue-700"
        >
          ← Back to Recipes
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>

        <fieldset>
          <legend className="block mb-2">Ingredients:</legend>
          <div className="space-y-2">
            {recipe.ingredients.map((ing: Ingredient, index: number) => (
              <div key={index} className="flex space-x-2">
                <input
                  type="number"
                  value={ing.amount}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients]
                    newIngredients[index] = { ...ing, amount: parseFloat(e.target.value) }
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="w-24 p-2 border rounded"
                  step="0.1"
                />
                <input
                  type="text"
                  value={ing.unit}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients]
                    newIngredients[index] = { ...ing, unit: e.target.value }
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="w-24 p-2 border rounded"
                />
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => {
                    const newIngredients = [...recipe.ingredients]
                    newIngredients[index] = { ...ing, name: e.target.value }
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newIngredients = recipe.ingredients.filter((_, i) => i !== index)
                    setRecipe({ ...recipe, ingredients: newIngredients })
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend className="block mb-2">Instructions:</legend>
          <div className="space-y-2">
            {recipe.instructions.map((instruction: string, index: number) => (
              <div key={index} className="flex space-x-2">
                <textarea
                  value={instruction}
                  onChange={(e) => {
                    const newInstructions = [...recipe.instructions]
                    newInstructions[index] = e.target.value
                    setRecipe({ ...recipe, instructions: newInstructions })
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newInstructions = recipe.instructions.filter((_, i) => i !== index)
                    setRecipe({ ...recipe, instructions: newInstructions })
                  }}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Instruction
          </button>
        </fieldset>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Recipe
        </button>
      </form>
    </div>
  )
}
