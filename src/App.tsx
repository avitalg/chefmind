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
import About from './pages/About'
import Company from './pages/Company'
import CreateRecipe from './pages/CreateRecipe'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface User {
  displayName: string
  id: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                   <img src="/chefmind.png" alt="ChefMind" className="w-8 h-8 mr-2" />
                  <span className="text-xl font-bold text-gray-800">ChefMind</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/about" className="text-gray-600 hover:text-gray-800 transition-colors">
                    About
                  </Link>
                  <Link to="/company" className="text-gray-600 hover:text-gray-800 transition-colors">
                    Company
                  </Link>
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-3">
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

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              {isMobileMenuOpen && (
                <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
                    <Link
                      to="/about"
                      className="block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      to="/company"
                      className="block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Company
                    </Link>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      {user ? (
                        <div className="px-3 py-2">
                          <div className="text-sm text-gray-500 mb-2">Signed in as</div>
                          <div className="text-gray-800 font-medium mb-3">{user.displayName}</div>
                          <button
                            type="button"
                            onClick={() => {
                              handleSignOut()
                              setIsMobileMenuOpen(false)
                            }}
                            className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                          >
                            Sign out
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleSignIn()
                            setIsMobileMenuOpen(false)
                          }}
                          className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                        >
                          Sign in with Google
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

              <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<HomePage user={user} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/create" element={<CreateRecipe />} />
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

  const recipe = id ? recipes.find(r => r.id === id) : null

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  return <EditRecipe recipe={recipe} onNavigateHome={() => navigate('/')} />
}

export default App
