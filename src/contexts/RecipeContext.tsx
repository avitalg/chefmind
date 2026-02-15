import type React from 'react'
import { createContext, type ReactNode, useContext, useState } from 'react'
import { 
  useRecipesQuery, 
  useImportRecipeMutation,
  useImportRecipeFromImageMutation,
  useCreateRecipeMutation, 
  useUpdateRecipeMutation, 
  useDeleteRecipeMutation,
  type Recipe
} from '../hooks/useRecipes'

interface RecipeContextType {
  recipes: Recipe[]
  loading: boolean
  error: string
  fetchRecipes: () => void
  addRecipe: (recipe: Recipe) => Promise<Recipe>
  addRecipeFromImage: (imageFile: File) => Promise<Recipe>
  createManualRecipe: (recipe: Recipe) => Promise<Recipe>
  updateRecipe: (recipe: Recipe) => Promise<void>
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
  const [error, setError] = useState('')

  // Use React Query hooks
  const { data: recipes = [], isLoading, error: queryError } = useRecipesQuery(user)
  const importRecipeMutation = useImportRecipeMutation()
  const importRecipeFromImageMutation = useImportRecipeFromImageMutation()
  const createRecipeMutation = useCreateRecipeMutation()
  const updateRecipeMutation = useUpdateRecipeMutation()
  const deleteRecipeMutation = useDeleteRecipeMutation()

  // Combine query error with local error state
  const combinedError = queryError?.message || error

  const fetchRecipes = () => {
    // React Query handles refetching automatically
    // This is kept for backward compatibility
  }

  const addRecipe = async (recipe: Recipe) => {
    try {
      if (!recipe.url) {
        throw new Error('URL is required for importing recipes')
      }
      
      const result = await importRecipeMutation.mutateAsync(recipe.url)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add recipe'
      setError(message)
      throw err
    }
  }

  const addRecipeFromImage = async (imageFile: File) => {
    try {
      const result = await importRecipeFromImageMutation.mutateAsync(imageFile)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to import recipe from image'
      setError(message)
      throw err
    }
  }

  const createManualRecipe = async (recipe: Recipe) => {
    try {
      const result = await createRecipeMutation.mutateAsync(recipe)
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create recipe'
      setError(message)
      throw err
    }
  }

  const updateRecipe = async (recipe: Recipe) => {
    try {
      await updateRecipeMutation.mutateAsync(recipe)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update recipe'
      setError(message)
      throw err
    }
  }

  const deleteRecipe = async (id: string, place: number) => {
    try {
      await deleteRecipeMutation.mutateAsync({ id, place })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete recipe'
      setError(message)
      throw err
    }
  }

  const clearError = () => setError('')

  const value: RecipeContextType = {
    recipes,
    loading: isLoading,
    error: combinedError,
    fetchRecipes,
    addRecipe,
    addRecipeFromImage,
    createManualRecipe,
    updateRecipe,
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