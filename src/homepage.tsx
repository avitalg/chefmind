import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecipes } from './contexts/RecipeContext';
import { useSEO } from './hooks/useSEO';
import { addUtmToPath } from './utils/utm';
import { HERO_SLIDES } from './constants/foodImages';
import HeroSlider from './components/HeroSlider';

interface Recipe {
  id: string
  title: string
  ingredients: Array<{ amount: number; unit: string; name: string }>
  instructions: string[]
  url?: string
  _id?: string
  direction: string
}

interface User {
  displayName: string
  id: string
}

interface HomePageProps {
  user: User | null
  onSignIn: () => void
}

export default function HomePage({ user, onSignIn }: HomePageProps) {
  useSEO({
    title: 'Home',
    description: 'Manage your personal recipe collection with ChefMind. Import recipes from any website, create custom recipes, and organize your culinary favorites all in one place.',
    keywords: 'recipe collection, recipe management, import recipes, cooking recipes, recipe organizer',
    url: '/',
  });

  const navigate = useNavigate();
  const importSectionRef = useRef<HTMLDivElement>(null);
  const { recipes, loading, error, clearError, deleteRecipe, addRecipe, addRecipeFromImage } = useRecipes();
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');
  const [importMode, setImportMode] = useState<'url' | 'image'>('url');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleDelete = async (place: number, id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteRecipe(id, place);
      } catch (err) {
        console.error('Failed to delete recipe:', err);
      }
    }
  };

  const handleImport = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsImporting(true);
    setImportError('');
    clearError();

    try {
      let recipe: Recipe;
      
      if (importMode === 'url') {
        // Use addRecipe which handles the import internally
        recipe = await addRecipe({ url: importUrl } as Recipe);
        setImportUrl(''); // Clear the input after successful import
      } else {
        // Import from image
        if (!selectedImage) {
          throw new Error('Please select an image file');
        }
        recipe = await addRecipeFromImage(selectedImage);
        setSelectedImage(null);
        setImagePreview(null);
      }
      
      // Navigate to edit page with the recipe ID
      navigate(`/edit/${recipe.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to import recipe';
      setImportError(message);
      clearError(); // avoid showing same message twice (context also sets error)
    } finally {
      setIsImporting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImportError('');
    }
  };

  const handleSwitchToUrlMode = () => {
    setImportMode('url');
    setImportError('');
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSwitchToImageMode = () => {
    setImportMode('image');
    setImportError('');
    setImportUrl('');
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportUrl(e.target.value);
  };

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedImage(null);
    setImagePreview(null);
    const input = document.getElementById('recipe-image') as HTMLInputElement;
    if (input) input.value = '';
  };

  const handleEditRecipe = (recipeId: string) => {
    navigate(`/edit/${recipeId}`);
  };

  const scrollToImport = () => {
    importSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderRecipeList = (compact = false) => (
    <>
      <div className={`flex items-center gap-3 ${compact ? 'px-5 pt-5 pb-3 border-b border-border-warm' : 'mb-4 sm:mb-6'}`}>
        {!compact && (
          <div className="icon-box flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className={compact ? 'text-lg font-semibold text-ink' : 'card-section-title'}>Your Recipes</h2>
            {recipes.length > 0 && (
              <span className="bg-cream text-ink text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border border-border-warm whitespace-nowrap">
                {recipes.length}
              </span>
            )}
          </div>
          {recipes.length > 0 && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
              {recipes.length === 1 ? 'recipe' : 'recipes'} in your collection
            </p>
          )}
        </div>
      </div>

      <div className={compact ? 'flex-1 overflow-y-auto px-5 pb-5 space-y-3 min-h-0' : 'space-y-4'}>
        {loading ? (
          <div className={`text-center ${compact ? 'py-10' : 'py-12'}`}>
            <div className="inline-flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-teal"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="text-base text-gray-600">Loading your recipes...</span>
            </div>
          </div>
        ) : recipes.length === 0 ? (
          <div className={`text-center ${compact ? 'py-8 px-2' : 'py-12'}`}>
            <div className={`${compact ? 'w-16 h-16' : 'w-24 h-24'} bg-paper rounded-full flex items-center justify-center mx-auto mb-4 border border-border-warm`}>
              <svg className={`${compact ? 'w-8 h-8' : 'w-12 h-12'} text-teal`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-semibold text-gray-800 mb-2`}>No recipes yet</h3>
            <p className="text-sm text-gray-600 mb-4">
              Import your first recipe to start building your collection.
            </p>
            {compact && (
              <button type="button" onClick={scrollToImport} className="btn-primary py-2.5 text-sm">
                Import a recipe
              </button>
            )}
            {!compact && (
              <div className="info-box max-w-md mx-auto text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Get started:</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Find a recipe you love online</li>
                  <li>• Copy the URL and paste it below</li>
                  <li>• We&apos;ll extract all the details for you</li>
                  <li>• Edit and customize as needed</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className={`group bg-paper transition-colors border-b border-border-warm hover:bg-cream ${
                  compact ? 'p-3 sm:p-4' : 'p-5'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <Link
                    to={addUtmToPath(`/recipe/${recipe.id}`, { utm_content: 'home_recipe_card' })}
                    className="flex-1 min-w-0 group-hover:text-teal transition-colors"
                  >
                    <h3 className={`font-semibold text-gray-800 mb-0.5 truncate ${compact ? 'text-base' : 'text-lg'}`}>
                      {recipe.title}
                    </h3>
                    {recipe.url && (
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {new URL(recipe.url).hostname}
                      </p>
                    )}
                  </Link>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => handleEditRecipe(recipe.id)}
                      className="p-2 text-teal hover:bg-cream rounded-lg transition-colors"
                      title="Edit recipe"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(recipes.indexOf(recipe), recipe.id, recipe.title)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete recipe"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="bg-cream rounded-3xl p-6 sm:p-10 lg:p-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-4 leading-tight">
              {user ? `Welcome back, ${user.displayName}!` : 'Welcome to ChefMind'}
            </h1>
            {user ? (
              <>
                <p className="text-lg text-body mb-4 font-medium">
                  Your recipe library is ready — add more anytime.
                </p>
                <p className="text-base text-gray-600 max-w-lg leading-relaxed mb-6">
                  Import recipes from food blogs, Instagram saves, or photos of handwritten cards.
                  ChefMind pulls out ingredients and steps so you can edit, save, and cook from them later.
                </p>
                <ul className="space-y-3 mb-8 max-w-lg text-sm text-body leading-relaxed">
                  <li><strong className="text-ink">Paste a recipe URL</strong> — we extract the title, ingredients, and instructions.</li>
                  <li><strong className="text-ink">Upload a photo</strong> — we transcribe cookbook pages and recipe cards.</li>
                </ul>
                <button type="button" onClick={scrollToImport} className="btn-primary w-fit">
                  Import a recipe
                </button>
              </>
            ) : (
              <>
                <p className="text-lg text-body mb-3 font-medium">Your personal recipe collection</p>
                <p className="text-base text-gray-600 max-w-lg leading-relaxed mb-4">
                  Save and organize recipes from anywhere — in one simple library.
                </p>
                <ul className="space-y-2 max-w-lg text-base text-gray-600 leading-relaxed list-disc pl-5">
                  <li>Paste a recipe link or upload a photo — we extract ingredients and steps for you.</li>
                  <li>Create and edit your own recipes, from family favorites to new experiments.</li>
                  <li>Enter what&apos;s in your fridge and get AI-powered dinner ideas in seconds.</li>
                </ul>
              </>
            )}
          </div>
          <div className={`relative min-h-[320px] md:min-h-[400px] rounded-2xl overflow-hidden shadow-lg ${user ? 'flex flex-col bg-paper' : ''}`}>
            {user ? renderRecipeList(true) : <HeroSlider slides={[...HERO_SLIDES]} />}
          </div>
        </div>
      </section>

      {!user && (
        <section className="card">
          <h2 className="section-heading">What is ChefMind?</h2>
          <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
            ChefMind is a simple recipe manager built for home cooks who collect recipes from many places — food blogs, Instagram, handwritten cards from relatives, and old cookbooks. Instead of scattered screenshots and saved tabs, you get one clean library you can search, edit, and cook from.
          </p>
          <ul className="space-y-5 text-body leading-relaxed max-w-3xl">
            <li>
              <h3 className="font-bold text-teal text-lg mb-1">Import from anywhere</h3>
              <p className="text-sm text-gray-600">
                Paste any recipe URL and we pull out the title, ingredients, and instructions. Upload a photo of a recipe card or cookbook page and we transcribe what we can read.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-teal text-lg mb-1">Build your own</h3>
              <p className="text-sm text-gray-600">
                Create recipes from scratch — ideal for family favorites, tweaks on classics, or dishes you invent in the kitchen.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-teal text-lg mb-1">Edit and organize</h3>
              <p className="text-sm text-gray-600">
                Fix amounts, adjust steps, and keep everything in your personal collection. Recipes stay in your account and sync wherever you sign in.
              </p>
            </li>
            <li>
              <h3 className="font-bold text-teal text-lg mb-1">Discover ideas</h3>
              <p className="text-sm text-gray-600">
                Not sure what to cook? Enter ingredients you have and get AI-powered recipe suggestions in seconds.{' '}
                <Link
                  to={addUtmToPath('/recipe-ideas', { utm_content: 'home_discover_ideas' })}
                  className="font-semibold text-teal hover:text-teal-dark transition-colors"
                >
                  Try recipe ideas →
                </Link>
              </p>
            </li>
          </ul>
          <div className="mt-8 pt-6 border-t border-border-warm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-body text-sm">
              Free to use. Sign in with Google to save your recipes.
            </p>
            <button type="button" onClick={onSignIn} className="btn-primary py-2.5 shrink-0">
              Get started — Sign in
            </button>
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
      {/* Import Recipe Section */}
      <section ref={importSectionRef} id="import-recipe" className="card scroll-mt-6 h-full flex flex-col">
        <h2 className="section-heading">Import Recipe</h2>
        <p className="text-gray-600 mb-6">
          {user 
            ? "Import recipes from any website URL or upload a recipe image. Our AI will automatically extract all the details for you."
            : "Sign in to import recipes from websites or images. Our AI-powered system extracts ingredients, instructions, and all recipe details automatically."}
        </p>

        {/* Import Mode Toggle */}
        <div className="mb-6">
          <div className="flex gap-2 bg-cream rounded-full p-1">
            <button
              type="button"
              onClick={handleSwitchToUrlMode}
              className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                importMode === 'url'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-body hover:text-teal'
              }`}
            >
              From URL
            </button>
            <button
              type="button"
              onClick={handleSwitchToImageMode}
              className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-full transition-colors ${
                importMode === 'image'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-body hover:text-teal'
              }`}
            >
              From Image
            </button>
          </div>
        </div>

        <form onSubmit={handleImport} className="space-y-6">
          {importMode === 'url' ? (
            <div>
              <label htmlFor="recipe-url" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe URL
              </label>
              <div className="relative">
                <input
                  id="recipe-url"
                  type="url"
                  value={importUrl}
                  onChange={handleUrlChange}
                  className="w-full p-4 border border-border-warm rounded-xl focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
                  placeholder="https://example.com/recipe"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="recipe-image" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Image
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    id="recipe-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    required={importMode === 'image'}
                  />
                  <label
                    htmlFor="recipe-image"
                    className="flex flex-col items-center justify-center w-full h-48 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Recipe preview"
                          className="w-full h-full object-contain rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          )}

          {user ? (
            <button
              type="submit"
              disabled={isImporting || (importMode === 'image' && !selectedImage)}
              className="w-full btn-primary py-3 text-base"
            >
              {isImporting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {importMode === 'image' ? 'Processing Image...' : 'Importing Recipe...'}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  {importMode === 'image' ? 'Import from Image' : 'Import Recipe'}
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="btn-primary w-full sm:w-auto py-3"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span className="whitespace-nowrap">Sign in to Import Recipes</span>
            </button>
          )}

          {importError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-700">{importError}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </form>
      </section>

      {/* Create Recipe Section */}
      <section className="card h-full flex flex-col">
        <h2 className="section-heading">Create Recipe</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed flex-1">
          {user 
            ? "Have a family recipe or want to create something new? Build your own recipe from scratch with our intuitive form."
            : "Sign in to create your own recipes from scratch. Perfect for family recipes, experiments, or documenting your culinary creations."}
        </p>
        {user ? (
          <Link
            to={addUtmToPath('/create', { utm_content: 'cta_create' })}
            className="btn-primary w-full sm:w-auto py-3 mt-auto"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Create Recipe</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={onSignIn}
            className="btn-primary w-full sm:w-auto py-3 mt-auto"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span className="whitespace-nowrap">Sign in to Create Recipe</span>
          </button>
        )}
      </section>
      </div>
    </div>
  )
}
