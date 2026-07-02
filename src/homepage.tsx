import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecipes } from './contexts/RecipeContext';
import { useSEO } from './hooks/useSEO';
import { addUtmToPath } from './utils/utm';
import { HERO_SLIDES } from './constants/foodImages';
import HeroSlider from './components/HeroSlider';
import SectionDivider from './components/SectionDivider';
import SectionSpoonCorner from './components/SectionSpoonCorner';

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
                className={`group bg-paper rounded-md transition-colors border border-border-warm hover:border-teal/50 ${
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
                      className="p-2 text-teal hover:text-teal-dark hover:bg-cream rounded-md transition-colors"
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
    <div className="space-y-8">
      {/* Hero Section — fills first viewport below nav */}
      <section className="relative -mt-6 -mx-4 sm:-mx-6 min-h-[calc(100svh-4rem)] mb-8">
        <SectionSpoonCorner corner="top-left" />
        <div className="card overflow-hidden p-0 h-full min-h-[calc(100svh-4rem)]">
          <div className="flex flex-col md:grid md:grid-cols-2 h-full min-h-[inherit]">
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-warm shrink-0 md:shrink">
            <h1 className="text-3xl sm:text-4xl font-semibold text-ink mb-4 leading-tight">
              {user ? `Welcome back, ${user.displayName}!` : 'Welcome to ChefMind'}
            </h1>
            {user ? (
              <>
                <p className="text-lg text-[#2d5a54] mb-4">
                  Your recipe library is ready — add more anytime.
                </p>
                <p className="text-base text-gray-600 max-w-lg leading-relaxed mb-6">
                  Import recipes from food blogs, Instagram saves, or photos of handwritten cards.
                  ChefMind pulls out ingredients and steps so you can edit, save, and cook from them later.
                </p>
                <div className="space-y-3 mb-8 max-w-lg">
                  <div className="info-box text-sm">
                    <h3 className="font-semibold text-ink mb-1">Paste a recipe URL</h3>
                    <p className="text-[#2d5a54] leading-relaxed">
                      Copy a link from any cooking site — we extract the title, ingredients, and instructions for you.
                    </p>
                  </div>
                  <div className="info-box text-sm">
                    <h3 className="font-semibold text-ink mb-1">Upload a photo</h3>
                    <p className="text-[#2d5a54] leading-relaxed">
                      Snap a cookbook page or family recipe card and we transcribe what we can read.
                    </p>
                  </div>
                </div>
                <button type="button" onClick={scrollToImport} className="btn-primary w-fit py-2.5">
                  Import a recipe
                </button>
              </>
            ) : (
              <>
                <p className="text-lg text-[#2d5a54] mb-3">Your personal recipe collection</p>
                <p className="text-base text-gray-600 max-w-lg leading-relaxed mb-4">
                  Save and organize recipes from anywhere — in one simple library.
                </p>
                <div className="space-y-2 max-w-lg text-base text-gray-600 leading-relaxed">
                  <p>Paste a recipe link or upload a photo — we extract ingredients and steps for you.</p>
                  <p>Create and edit your own recipes, from family favorites to new experiments.</p>
                  <p>Enter what&apos;s in your fridge and get AI-powered dinner ideas in seconds.</p>
                </div>
              </>
            )}
          </div>
          <div className={`relative flex-1 min-h-[320px] md:min-h-0 ${user ? 'flex flex-col bg-cream md:h-full' : ''}`}>
            {user ? (
              <>
                <SectionSpoonCorner corner="top-right" />
                {renderRecipeList(true)}
              </>
            ) : (
              <HeroSlider slides={[...HERO_SLIDES]} />
            )}
          </div>
        </div>
      </div>
      </section>

      <SectionDivider />

      {!user && (
        <div className="card relative">
          <SectionSpoonCorner corner="top-right" />
          <h2 className="card-section-title mb-4">What is ChefMind?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            ChefMind is a simple recipe manager built for home cooks who collect recipes from many places — food blogs, Instagram, handwritten cards from relatives, and old cookbooks. Instead of scattered screenshots and saved tabs, you get one clean library you can search, edit, and cook from.
          </p>
          <ul className="space-y-4 text-[#2d5a54] leading-relaxed">
            <li>
              <h3 className="font-semibold text-ink mb-1">Import from anywhere</h3>
              <p className="text-sm">
                Paste any recipe URL and we pull out the title, ingredients, and instructions. Upload a photo of a recipe card or cookbook page and we transcribe what we can read.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-ink mb-1">Build your own</h3>
              <p className="text-sm">
                Create recipes from scratch — ideal for family favorites, tweaks on classics, or dishes you invent in the kitchen.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-ink mb-1">Edit and organize</h3>
              <p className="text-sm">
                Fix amounts, adjust steps, and keep everything in your personal collection. Recipes stay in your account and sync wherever you sign in.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-ink mb-1">Discover ideas</h3>
              <p className="text-sm">
                Not sure what to cook? Enter ingredients you have and get AI-powered recipe suggestions in seconds.{' '}
                <Link
                  to={addUtmToPath('/recipe-ideas', { utm_content: 'home_discover_ideas' })}
                  className="font-medium text-teal hover:text-teal-dark transition-colors"
                >
                  Try recipe ideas →
                </Link>
              </p>
            </li>
          </ul>
          <div className="mt-8 pt-6 border-t border-border-warm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[#2d5a54] text-sm">
              Free to use. Sign in with Google to save your recipes.
            </p>
            <button type="button" onClick={onSignIn} className="btn-primary py-2.5 shrink-0">
              Get started — Sign in
            </button>
          </div>
        </div>
      )}

      {!user && <SectionDivider />}

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
      {/* Import Recipe Section */}
      <div ref={importSectionRef} id="import-recipe" className="card relative scroll-mt-6 h-full flex flex-col">
        <div className="flex items-center mb-6">
          <div className="icon-box mr-4">
            <svg
              className="w-5 h-5"
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
          </div>
          <h2 className="card-section-title">Import Recipe</h2>
        </div>
        <p className="text-gray-600 mb-6">
          {user 
            ? "Import recipes from any website URL or upload a recipe image. Our AI will automatically extract all the details for you."
            : "Sign in to import recipes from websites or images. Our AI-powered system extracts ingredients, instructions, and all recipe details automatically."}
        </p>

        {/* Import Mode Toggle */}
        <div className="mb-6">
          <div className="flex gap-2 bg-cream rounded-lg p-1 border border-border-warm">
            <button
              type="button"
              onClick={handleSwitchToUrlMode}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                importMode === 'url'
                  ? 'bg-paper text-teal border border-border-warm'
                  : 'text-[#2d5a54] hover:text-ink'
              }`}
            >
              From URL
            </button>
            <button
              type="button"
              onClick={handleSwitchToImageMode}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                importMode === 'image'
                  ? 'bg-paper text-teal border border-border-warm'
                  : 'text-[#2d5a54] hover:text-ink'
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
                  className="w-full p-4 border border-border-warm rounded-md focus:ring-2 focus:ring-teal focus:border-teal transition-colors"
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
      </div>

      {/* Create Recipe Section */}
      <div className="card relative h-full flex flex-col">
        <SectionSpoonCorner corner="bottom-right" />
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="icon-box mr-3 sm:mr-4 flex-shrink-0">
            <svg
              className="w-5 h-5"
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
          </div>
          <h2 className="card-section-title">Create Recipe</h2>
        </div>
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
      </div>
      </div>
    </div>
  )
}
