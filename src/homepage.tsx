import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useRecipes } from './contexts/RecipeContext';
import { useSEO } from './hooks/useSEO';

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

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-[#088395] to-[#09637E] rounded-2xl text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4 leading-tight">Welcome to ChefMind</h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 px-4">
          {user ? `Hello, ${user.displayName}!` : 'Your Intelligent Recipe Companion'}
        </p>
        <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto px-4">
          {user
            ? 'Import recipes from URLs or images, create your own, and discover new dishes - all in one beautiful, organized place.'
            : 'Transform how you collect and organize recipes. Import from websites, upload images, or create your own - all with AI-powered intelligence.'}
        </p>
      </div>

      {/* Import Recipe Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-[#EBF4F6] rounded-full mr-4">
            <svg
              className="w-6 h-6 text-[#088395]"
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Import Recipe</h2>
        </div>
        <p className="text-gray-600 mb-6">
          {user 
            ? "Import recipes from any website URL or upload a recipe image. Our AI will automatically extract all the details for you."
            : "Sign in to import recipes from websites or images. Our AI-powered system extracts ingredients, instructions, and all recipe details automatically."}
        </p>

        {/* Import Mode Toggle */}
        <div className="mb-6">
          <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={handleSwitchToUrlMode}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                importMode === 'url'
                  ? 'bg-white text-[#088395] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              From URL
            </button>
            <button
              type="button"
              onClick={handleSwitchToImageMode}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                importMode === 'image'
                  ? 'bg-white text-[#088395] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
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
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#088395] focus:border-transparent transition-all duration-200"
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
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
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
              className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center bg-[#088395] hover:bg-[#09637E] text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-full py-4 px-6 rounded-[18px] font-semibold transition-all duration-200 flex items-center justify-center bg-[#FF6500] hover:bg-[#E55A00] active:bg-[#CC5000] text-white shadow-lg hover:shadow-xl cursor-pointer"
              style={{ fontSize: '15px' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign in to Import Recipes
            </button>
          )}

          {importError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
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
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
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

          {!user && (
            <div className="bg-[#EBF4F6] border border-[#7AB2B2] rounded-xl p-4">
              <div className="flex">
                <svg
                  className="w-5 h-5 text-[#088395] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-[#09637E]">Sign in to save and manage your recipes</p>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Create Recipe Section */}
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
        <div className="flex items-center mb-4 sm:mb-6">
          <div className="p-2 sm:p-2.5 md:p-3 bg-[#EBF4F6] rounded-full mr-3 sm:mr-4 flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#088395]"
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
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">Create Recipe</h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {user 
            ? "Have a family recipe or want to create something new? Build your own recipe from scratch with our intuitive form."
            : "Sign in to create your own recipes from scratch. Perfect for family recipes, experiments, or documenting your culinary creations."}
        </p>
        {user ? (
          <Link
            to="/create"
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-[#088395] text-white rounded-xl hover:bg-[#09637E] transition-colors font-semibold text-sm sm:text-base !text-white shadow-sm hover:shadow-md"
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FF6500] text-white rounded-[18px] hover:bg-[#E55A00] active:bg-[#CC5000] transition-all shadow-md hover:shadow-lg cursor-pointer font-semibold text-sm sm:text-base"
            style={{ fontSize: '15px' }}
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

      {/* Recipes Section */}
      <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
              <div className="p-2 sm:p-2.5 md:p-3 bg-[#EBF4F6] rounded-full flex-shrink-0">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#088395]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">Your Recipes</h2>
                  {user && recipes.length > 0 && (
                    <span className="bg-[#088395] text-white text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-sm whitespace-nowrap">
                      {recipes.length}
                    </span>
                  )}
                </div>
                {user && recipes.length > 0 && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                    {recipes.length === 1 ? 'recipe' : 'recipes'} in your collection
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {!user ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Sign in to view your recipes
              </h3>
              <p className="text-gray-500 mb-6">
                Your saved recipes will appear here once you sign in
              </p>
              <div className="bg-[#EBF4F6] border border-[#7AB2B2] rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-[#09637E] mb-2">What you can do:</h4>
                <ul className="text-[#09637E] text-sm space-y-1">
                  <li>• Import recipes from any website</li>
                  <li>• Upload images of recipes</li>
                  <li>• Create your own recipes from scratch</li>
                  <li>• Edit and customize recipes</li>
                  <li>• Access your recipes from anywhere</li>
                </ul>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#088395]"
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
                <span className="text-lg text-gray-600">Loading your recipes...</span>
              </div>
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No recipes yet</h3>
              <p className="text-gray-500 mb-6">
                Start by importing your first recipe from any website
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
                <h4 className="font-semibold text-green-800 mb-2">Get started:</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Find a recipe you love online</li>
                  <li>• Copy the URL and paste it above</li>
                  <li>• We'll extract all the details for you</li>
                  <li>• Edit and customize as needed</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="flex-1 group-hover:text-[#088395] transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{recipe.title}</h3>
                      {recipe.url && (
                        <p className="text-sm text-gray-500 truncate max-w-md">
                          {new URL(recipe.url).hostname}
                        </p>
                      )}
                    </Link>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditRecipe(recipe.id)}
                        className="p-2 text-[#088395] hover:text-[#09637E] hover:bg-[#EBF4F6] rounded-lg transition-colors"
                        title="Edit recipe"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(recipes.indexOf(recipe), recipe.id, recipe.title)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete recipe"
                      >
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
      </div>
    </div>
  )
}
