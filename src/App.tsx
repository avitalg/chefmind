import { useCallback } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecipeProvider, useRecipes } from './contexts/RecipeContext';
import { queryClient } from './lib/queryClient';
import { useAuth } from './hooks/useAuth';
import ReactQueryDevTools from './components/ReactQueryDevTools';
import NavBar from './components/NavBar';
import EditRecipe from './editRecipe';
import HomePage from './homepage';
import Recipe from './pages/recipe/recipe';
import About from './pages/About';
import Company from './pages/Company';
import FAQ from './pages/FAQ';
import CreateRecipe from './pages/CreateRecipe';
import FindByIngredients from './pages/FindByIngredients';
import RecipeIdeas from './pages/RecipeIdeas';
import ImportRecipeWithImage from './pages/stories/ImportRecipeWithImage';
import './App.css';

function App() {
  const { user, signIn, signOut } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <RecipeProvider user={user}>
        <Router>
          <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">
            <NavBar user={user} onSignIn={signIn} onSignOut={signOut} />
            <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8 w-screen min-w-0">
              <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/about" element={<About />} />
                <Route path="/company" element={<Company />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/create" element={<CreateRecipe />} />
                <Route path="/find" element={user ? <FindByIngredients /> : <Navigate to="/" replace />} />
                <Route path="/recipe-ideas" element={<RecipeIdeas />} />
                <Route path="/stories/import-recipe-with-image" element={<ImportRecipeWithImage />} />
                <Route path="/edit/:id" element={<EditRecipeWrapper />} />
                <Route path="/recipe/:id" element={<Recipe />} />
              </Routes>
            </main>
          </div>
        </Router>
        {import.meta.env.DEV && <ReactQueryDevTools />}
        <Analytics />
      </RecipeProvider>
    </QueryClientProvider>
  )
}

function EditRecipeWrapper() {
  const { id } = useParams<{ id: string }>();
  const { recipes } = useRecipes();
  const navigate = useNavigate();

  const recipe = id ? recipes.find((r) => r.id === id) : null

  const handleNavigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <EditRecipe recipe={recipe} onNavigateHome={handleNavigateHome} />;
}

export default App;
