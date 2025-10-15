import type React from 'react'
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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

interface RecipeContextType {
  recipes: Recipe[]
  loading: boolean
  error: string
  fetchRecipes: () => Promise<void>
  saveRecipe: (recipe: Recipe) => Promise<void>
  deleteRecipe: (id: string, place: number) => Promise<void>
  clearError: () => void
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

interface User {
  displayName: string
  id: string
}

interface RecipeProviderProps {
  children: ReactNode
  user: User | null
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children, user }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchRecipes = useCallback(async () => {
    if (!user) {
      setRecipes([])
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes`, { credentials: 'include' })
      if (response.status === 401) {
        setRecipes([])
        return
      }
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      const data = await response.json()
      setRecipes(data)
    } catch (err) {
      setError('Failed to load recipes')
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  const saveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(recipe),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to save recipes.')
        }
        throw new Error('Failed to save recipe')
      }

      // Update local state
      setRecipes((prev) =>
        prev.map((r) => (r.id === recipe.id ? recipe : r))
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save recipe'
      setError(message)
      throw err
    }
  }

  const deleteRecipe = async (id: string, place: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to delete recipes.')
        }
        throw new Error('Failed to delete recipe')
      }

      // Update local state
      setRecipes((prev) => prev.filter((_, index) => index !== place))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete recipe'
      setError(message)
      throw err
    }
  }

  const clearError = () => setError('')

  // Fetch recipes when user changes
  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  const value: RecipeContextType = {
    recipes,
    loading,
    error,
    fetchRecipes,
    saveRecipe,
    deleteRecipe,
    clearError,
  }

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
}

export const useRecipes = (): RecipeContextType => {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider')
  }
  return context
}
