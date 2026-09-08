import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecipes } from './contexts/RecipeContext';
import { useSEO } from './hooks/useSEO';
import { HERO_SLIDES } from './constants/foodImages';
import HomeFeatureGrid from './components/home/HomeFeatureGrid';

const HOME_STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'ChefMind',
      url: 'https://www.chefmind.net/',
    },
    {
      '@type': 'Organization',
      name: 'ChefMind',
      url: 'https://www.chefmind.net/',
      logo: 'https://www.chefmind.net/og-image.png',
    },
  ],
};

interface Recipe {
  id: string
  title: string
  ingredients: Array<{ amount: number; unit: string; name: string }>
  instructions: string[]
  notes?: string
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
    fullTitle: 'ChefMind | Save & Organize Your Recipes',
    description: 'Free recipe organizer for home cooks. Import from any website or photo, edit ingredients, and cook from one library — no subscription.',
    keywords: 'recipe collection, recipe management, import recipes, cooking recipes, recipe organizer',
    url: '/',
    structuredData: HOME_STRUCTURED_DATA,
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
    if (!user) {
      onSignIn();
      return;
    }
    setIsImporting(true);
    setImportError('');
    clearError();

    try {
      let recipe: Recipe;

      if (importMode === 'url') {
        recipe = await addRecipe({ url: importUrl } as Recipe);
        setImportUrl('');
      } else {
        if (!selectedImage) {
          throw new Error('Please select an image file');
        }
        recipe = await addRecipeFromImage(selectedImage);
        setSelectedImage(null);
        setImagePreview(null);
      }

      navigate(`/edit/${recipe.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to import recipe';
      setImportError(message);
      clearError();
    } finally {
      setIsImporting(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
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

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      <section className="relative h-[46vh] min-h-[280px] max-h-[520px] overflow-hidden">
        <img
          src={HERO_SLIDES[0].src}
          alt={HERO_SLIDES[0].alt}
          width={1024}
          height={558}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>

      <header className="max-w-3xl mx-auto px-4 pt-12 sm:pt-16 pb-10 text-center rise">
        <p className="text-xs tracking-[0.28em] uppercase text-body mb-4">Home</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink mb-5">
          {user ? `Welcome back, ${user.displayName}` : 'Save and organize recipes from any website'}
        </h1>
        <p className="text-lg text-body max-w-xl mx-auto leading-relaxed mb-8">
          {user
            ? 'Your recipes live here — import another, or cook from what you already saved.'
            : 'A personal recipe collection for home cooks. Save dishes from blogs, photos, and family cards, then cook from one quiet library. ChefMind is free to use — no subscription.'}
        </p>
        <button type="button" onClick={scrollToImport} className="btn-primary">
          {user ? 'Import a recipe' : 'Start collecting'}
        </button>
        {!user && (
          <p className="text-sm text-body mt-4">Always free. Sign in with Google to keep your recipes.</p>
        )}
      </header>

      {!user && (
        <div className="intro-band">
          <p className="max-w-3xl mx-auto text-center text-body leading-relaxed text-base sm:text-lg">
            Built for cooks who gather recipes from everywhere — food blogs, Instagram saves, handwritten cards,
            and old cookbooks. Instead of scattered screenshots and tabs, you get one place to search, edit, and cook from.
          </p>
        </div>
      )}

      <section ref={importSectionRef} id="import-recipe" className="import-band scroll-mt-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.22em] uppercase text-white/70 mb-3">Add a recipe</p>
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-3">
            Search for a recipe you already love
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Paste a URL, or upload a photo of a recipe card. We extract the title, ingredients, and steps.
          </p>

          <div className="flex justify-center gap-6 mb-8 text-sm">
            <button
              type="button"
              onClick={handleSwitchToUrlMode}
              className={`tracking-wide pb-1 ${
                importMode === 'url' ? 'text-white border-b border-white' : 'text-white/70 hover:text-white'
              }`}
            >
              From URL
            </button>
            <button
              type="button"
              onClick={handleSwitchToImageMode}
              className={`tracking-wide pb-1 ${
                importMode === 'image' ? 'text-white border-b border-white' : 'text-white/70 hover:text-white'
              }`}
            >
              From a photo
            </button>
          </div>

          <form onSubmit={handleImport} className="space-y-6">
            {importMode === 'url' ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="recipe-url" className="sr-only">Recipe URL</label>
                <input
                  id="recipe-url"
                  type="url"
                  value={importUrl}
                  onChange={handleUrlChange}
                  className="flex-1 bg-transparent border-b border-white/40 placeholder-white/50 py-3 px-1 focus:outline-none focus:border-white"
                  placeholder="https://example.com/recipe"
                  required
                />
                {user ? (
                  <button
                    type="submit"
                    disabled={isImporting}
                    className="btn-accent shrink-0 self-center sm:self-auto"
                  >
                    {isImporting ? 'Importing…' : 'Import'}
                  </button>
                ) : (
                  <button type="button" onClick={onSignIn} className="btn-accent shrink-0 self-center sm:self-auto">
                    Sign in to import
                  </button>
                )}
              </div>
            ) : (
              <div>
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
                  className="flex flex-col items-center justify-center w-full min-h-36 border border-dashed border-white/40 cursor-pointer hover:border-white/80 transition-colors py-8 px-4"
                >
                  {imagePreview ? (
                    <div className="relative w-full max-w-md mx-auto">
                      <img src={imagePreview} alt="Recipe preview" className="w-full max-h-48 object-contain" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-ink text-white hover:bg-teal-dark"
                        aria-label="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <p className="text-white/80 text-sm">
                      <span className="text-white font-semibold">Choose a photo</span> of a recipe card or cookbook page
                    </p>
                  )}
                </label>
                <div className="mt-6">
                  {user ? (
                    <button
                      type="submit"
                      disabled={isImporting || !selectedImage}
                      className="btn-accent"
                    >
                      {isImporting ? 'Processing image…' : 'Import from photo'}
                    </button>
                  ) : (
                    <button type="button" onClick={onSignIn} className="btn-accent">
                      Sign in to import
                    </button>
                  )}
                </div>
              </div>
            )}

            {(importError || error) && (
              <p className="text-sm text-red-200">{importError || error}</p>
            )}
          </form>

          <p className="mt-8 text-white/80 text-sm">
            Or{' '}
            {user ? (
              <Link
                to={'/create'}
                className="text-white underline underline-offset-4"
              >
                write one from scratch
              </Link>
            ) : (
              <button type="button" onClick={onSignIn} className="text-white underline underline-offset-4">
                write one from scratch
              </button>
            )}
            .
          </p>
        </div>
      </section>

      {user && (
        <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
          <p className="text-xs tracking-[0.2em] uppercase text-body mb-3">Your collection</p>
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <h2 className="font-display text-3xl sm:text-4xl text-ink">Your recipes</h2>
            {recipes.length > 0 && (
              <span className="text-sm text-body">{recipes.length}</span>
            )}
          </div>

          {loading ? (
            <p className="text-body">Loading your recipes…</p>
          ) : recipes.length === 0 ? (
            <div>
              <p className="text-body mb-4">Nothing here yet — import your first recipe to begin.</p>
              <button type="button" onClick={scrollToImport} className="index-link">
                Import your first recipe
              </button>
            </div>
          ) : (
            <>
              <ul>
                {recipes.slice(0, 3).map((recipe) => (
                  <li key={recipe.id} className="py-5 border-b border-border-warm flex items-center justify-between gap-4">
                    <Link
                      to={`/recipe/${recipe.id}`}
                      className="min-w-0 flex-1 group"
                    >
                      <h3 className="font-display text-2xl text-ink group-hover:text-teal transition-colors truncate">
                        {recipe.title}
                      </h3>
                      {recipe.url && (
                        <p className="text-sm text-body truncate mt-1">
                          {new URL(recipe.url).hostname}
                        </p>
                      )}
                    </Link>
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => handleEditRecipe(recipe.id)}
                        className="p-2 text-teal hover:text-teal-dark"
                        title="Edit recipe"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(recipes.indexOf(recipe), recipe.id, recipe.title)}
                        className="p-2 text-body hover:text-red-600"
                        title="Delete recipe"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {recipes.length > 3 && (
                <div className="pt-6">
                  <Link
                    to={'/recipes'}
                    className="index-link"
                  >
                    View all {recipes.length} recipes
                  </Link>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {!user && <HomeFeatureGrid onSignIn={onSignIn} onImport={scrollToImport} />}
    </div>
  );
}
