import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface Ingredient {
  amount: number
  unit: string
  name: string
}

export interface Recipe {
  id: string
  title: string
  ingredients: Ingredient[]
  instructions: string[]
  url?: string
  _id?: string
  direction: string
}

// Query keys for consistent cache management
export const recipeKeys = {
  all: ['recipes'] as const,
  lists: () => [...recipeKeys.all, 'list'] as const,
  list: (filters: string) => [...recipeKeys.lists(), { filters }] as const,
  details: () => [...recipeKeys.all, 'detail'] as const,
  detail: (id: string) => [...recipeKeys.details(), id] as const,
}

// Fetch all recipes for the authenticated user
export const useRecipesQuery = (user: { id: string } | null) => {
  return useQuery({
    queryKey: recipeKeys.lists(),
    queryFn: async (): Promise<Recipe[]> => {
      if (!user) return []
      
      const response = await fetch(`${API_BASE_URL}/api/recipes`, {
        credentials: 'include',
      })
      
      if (response.status === 401) {
        return []
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      
      return response.json()
    },
    enabled: !!user, // Only run query when user is authenticated
  })
}

// Fetch a single recipe by ID
export const useRecipeQuery = (id: string, user: { id: string } | null) => {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: async (): Promise<Recipe> => {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        credentials: 'include',
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe')
      }
      
      return response.json()
    },
    enabled: !!user && !!id, // Only run query when user is authenticated and ID exists
  })
}

// Import recipe from URL
export const useImportRecipeMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (url: string): Promise<Recipe> => {
      const response = await fetch(`${API_BASE_URL}/api/recipes/import`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to add recipes.')
        }
        throw new Error('Failed to import recipe')
      }

      return response.json()
    },
    onSuccess: (newRecipe) => {
      // Invalidate and refetch recipes list
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() })
      
      // Add the new recipe to the cache
      queryClient.setQueryData(recipeKeys.detail(newRecipe.id), newRecipe)
    },
  })
}

// Import recipe from image
export const useImportRecipeFromImageMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (imageFile: File): Promise<Recipe> => {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await fetch(`${API_BASE_URL}/api/recipes/import-image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to add recipes.')
        }
        const errorData = await response.json().catch(() => ({ error: 'Failed to import recipe from image' }))
        throw new Error(errorData.error || 'Failed to import recipe from image')
      }

      return response.json()
    },
    onSuccess: (newRecipe) => {
      // Invalidate and refetch recipes list
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() })
      
      // Add the new recipe to the cache
      queryClient.setQueryData(recipeKeys.detail(newRecipe.id), newRecipe)
    },
  })
}

// Create manual recipe
export const useCreateRecipeMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (recipe: Recipe): Promise<Recipe> => {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(recipe),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to create recipes.')
        }
        throw new Error('Failed to create recipe')
      }

      return recipe // Return the recipe as-is since server doesn't return it
    },
    onSuccess: (newRecipe) => {
      // Invalidate and refetch recipes list
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() })
      
      // Add the new recipe to the cache
      queryClient.setQueryData(recipeKeys.detail(newRecipe.id), newRecipe)
    },
  })
}

// Update recipe
export const useUpdateRecipeMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (recipe: Recipe): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${recipe.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(recipe),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please sign in to update recipes.')
        }
        throw new Error('Failed to update recipe')
      }
    },
    onSuccess: (_, updatedRecipe) => {
      // Update the recipe in the cache
      queryClient.setQueryData(recipeKeys.detail(updatedRecipe.id), updatedRecipe)
      
      // Invalidate and refetch recipes list to ensure consistency
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() })
    },
  })
}

// Delete recipe
export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id }: { id: string; place: number }): Promise<void> => {
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
    },
    onSuccess: (_, { id }) => {
      // Remove the recipe from the cache
      queryClient.removeQueries({ queryKey: recipeKeys.detail(id) })
      
      // Invalidate and refetch recipes list
      queryClient.invalidateQueries({ queryKey: recipeKeys.lists() })
    },
  })
}
