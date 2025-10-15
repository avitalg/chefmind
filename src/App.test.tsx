import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

// Mock the RecipeProvider
vi.mock('./contexts/RecipeContext', () => ({
  RecipeProvider: ({ children, user }: { children: React.ReactNode; user: any }) => (
    <div data-testid="recipe-provider" data-user={user?.id || 'null'}>
      {children}
    </div>
  ),
  useRecipes: () => ({
    recipes: {},
    loading: false,
    error: '',
    fetchRecipes: vi.fn(),
    addRecipe: vi.fn(),
    updateRecipe: vi.fn(),
    deleteRecipe: vi.fn(),
    clearError: vi.fn(),
  }),
}))

// Mock the other components
vi.mock('./homepage', () => ({
  default: ({ user }: { user: any }) => (
    <div data-testid="homepage" data-user={user?.id || 'null'}>
      Homepage
    </div>
  ),
}))

vi.mock('./editRecipe', () => ({
  default: () => <div data-testid="edit-recipe">Edit Recipe</div>,
}))

vi.mock('./pages/recipe/recipe', () => ({
  default: () => <div data-testid="recipe-page">Recipe Page</div>,
}))

const mockFetch = vi.mocked(fetch)

describe('App Component - Logout Functionality', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should show sign in button when user is not authenticated', async () => {
    // Mock /api/me to return 401 (not authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'No token provided' }),
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    })

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument()
  })

  it('should show sign out button when user is authenticated', async () => {
    const mockUser = {
      id: '123',
      displayName: 'Test User',
    }

    // Mock /api/me to return user data (authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument()
      expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    expect(screen.queryByText('Sign in with Google')).not.toBeInTheDocument()
  })

  it('should handle successful logout', async () => {
    const mockUser = {
      id: '123',
      displayName: 'Test User',
    }

    // Mock initial /api/me to return user data (authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    // Mock logout endpoint to return success
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    } as Response)

    // Mock /api/me after logout to return 401 (not authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'No token provided' }),
    } as Response)

    // Click sign out button
    const signOutButton = screen.getByText('Sign out')
    fireEvent.click(signOutButton)

    // Wait for logout to complete
    await waitFor(() => {
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    })

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument()
    expect(screen.queryByText('Test User')).not.toBeInTheDocument()

    // Verify logout API was called
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/auth/logout',
      {
        method: 'POST',
        credentials: 'include',
      }
    )

    // Verify auth check was called after logout
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/me',
      {
        method: 'GET',
        credentials: 'include',
      }
    )
  })

  it('should handle logout API failure gracefully', async () => {
    const mockUser = {
      id: '123',
      displayName: 'Test User',
    }

    // Mock initial /api/me to return user data (authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    // Mock logout endpoint to return failure
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    // Click sign out button
    const signOutButton = screen.getByText('Sign out')
    fireEvent.click(signOutButton)

    // Should still clear user state even if API fails
    await waitFor(() => {
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    })

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument()
  })

  it('should handle logout with non-ok response', async () => {
    const mockUser = {
      id: '123',
      displayName: 'Test User',
    }

    // Mock initial /api/me to return user data (authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Sign out')).toBeInTheDocument()
    })

    // Mock logout endpoint to return non-ok response
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    } as Response)

    // Click sign out button
    const signOutButton = screen.getByText('Sign out')
    fireEvent.click(signOutButton)

    // Should still clear user state even if API returns error
    await waitFor(() => {
      expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    })

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument()
  })

  it('should redirect to Google OAuth when sign in is clicked', () => {
    // Mock /api/me to return 401 (not authenticated)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({ error: 'No token provided' }),
    } as Response)

    render(<App />)

    const signInButton = screen.getByText('Sign in with Google')
    fireEvent.click(signInButton)

    // Should redirect to Google OAuth
    expect(window.location.href).toBe('http://localhost:3001/auth/google')
  })
})
