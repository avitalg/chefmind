import { useEffect, useState } from 'react'
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { RecipeProvider, useRecipes } from './contexts/RecipeContext'
import EditRecipe from './editRecipe'
import HomePage from './homepage'
import Recipe from './pages/recipe/recipe'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
  displayName: string
  id: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/me`, { 
        method: 'GET', 
        credentials: 'include' 
      })
      
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const handleSignIn = () => {
    // Redirect to server OAuth
    window.location.href = `${API_BASE_URL}/auth/google`
  }

  const handleSignOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      
      if (response.ok) {
        setUser(null)
        // Double-check auth status to ensure UI updates correctly
        await checkAuthStatus()
      } else {
        console.error('Logout failed:', response.statusText)
        // Still clear user state even if server request fails
        setUser(null)
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Still clear user state even if request fails
      setUser(null)
    }
  }

  return (
    <RecipeProvider user={user}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link to="/" className="flex items-center">
                    <span className="text-xl font-bold text-gray-800">ChefMind</span>
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  {user ? (
                    <>
                      <span className="text-gray-700">{user.displayName}</span>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSignIn}
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Sign in with Google
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/edit/:id" element={<EditRecipeWrapper />} />
              <Route path="/recipe/:id" element={<Recipe />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecipeProvider>
  )
}

// Wrapper component to get recipe data by ID from context
function EditRecipeWrapper() {
  const { id } = useParams<{ id: string }>()
  const { recipes } = useRecipes()
  const navigate = useNavigate()

  const recipe = id ? recipes[id] : null

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return <EditRecipe recipe={recipe} onNavigateHome={() => navigate('/')} />
}

export default App
