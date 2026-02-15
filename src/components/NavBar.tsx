import { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '../hooks/useAuth';

interface NavBarProps {
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

const navLinkClass =
  'text-gray-600 hover:text-gray-800 transition-colors';
const activeNavLinkClass =
  'text-blue-600 font-semibold hover:text-blue-700 transition-colors';
const mobileNavLinkClass =
  'block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md';
const activeMobileNavLinkClass =
  'block px-3 py-2 text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 rounded-md bg-blue-50';

export default function NavBar({ user, onSignIn, onSignOut }: NavBarProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRecipesDropdownOpen, setIsRecipesDropdownOpen] = useState(false);
  const [isMobileRecipesOpen, setIsMobileRecipesOpen] = useState(false);
  const [isStoriesDropdownOpen, setIsStoriesDropdownOpen] = useState(false);
  const [isMobileStoriesOpen, setIsMobileStoriesOpen] = useState(false);

  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileRecipesOpen(false);
    setIsMobileStoriesOpen(false);
  }, [])

  const handleMobileSignIn = useCallback(() => {
    closeMobileMenu();
    onSignIn();
  }, [closeMobileMenu, onSignIn])

  const handleMobileSignOut = useCallback(() => {
    closeMobileMenu();
    onSignOut();
  }, [closeMobileMenu, onSignOut]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 w-full min-w-0">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/chefmind.png" alt="ChefMind" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold text-gray-800">ChefMind</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={isActive('/') ? activeNavLinkClass : navLinkClass}>
              Home
            </Link>
            <Link to="/about" className={isActive('/about') ? activeNavLinkClass : navLinkClass}>
              About
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsRecipesDropdownOpen(true)}
              onMouseLeave={() => setIsRecipesDropdownOpen(false)}
            >
              <span
                className={`${isActive('/recipe-ideas') || isActive('/find') ? activeNavLinkClass : navLinkClass} flex items-center cursor-pointer`}
                aria-expanded={isRecipesDropdownOpen}
              >
                Recipes
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isRecipesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isRecipesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-48 z-50">
                  <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <Link
                      to="/recipe-ideas"
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isActive('/recipe-ideas') ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'}`}
                      onClick={() => setIsRecipesDropdownOpen(false)}
                    >
                      Recipe ideas
                    </Link>
                    {user && (
                      <Link
                        to="/find"
                        className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isActive('/find') ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'}`}
                        onClick={() => setIsRecipesDropdownOpen(false)}
                      >
                        Find by ingredients
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setIsStoriesDropdownOpen(true)}
              onMouseLeave={() => setIsStoriesDropdownOpen(false)}
            >
              <span
                className={`${isActive('/stories') ? activeNavLinkClass : navLinkClass} flex items-center cursor-pointer`}
                aria-expanded={isStoriesDropdownOpen}
              >
                Stories
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isStoriesDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isStoriesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-48 z-50">
                  <div className="bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <Link
                      to="/stories/import-recipe-with-image"
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 ${isActive('/stories/import-recipe-with-image') ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'}`}
                      onClick={() => setIsStoriesDropdownOpen(false)}
                    >
                      Import Recipe with Image
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/company" className={isActive('/company') ? activeNavLinkClass : navLinkClass}>
              Company
            </Link>
            <Link to="/faq" className={isActive('/faq') ? activeNavLinkClass : navLinkClass}>
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-gray-700">{user.displayName}</span>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onSignIn}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 ml-3"
              >
                Sign in with Google
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
              aria-expanded={isMobileMenuOpen}
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

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link 
                to="/" 
                className={isActive('/') ? activeMobileNavLinkClass : mobileNavLinkClass} 
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={isActive('/about') ? activeMobileNavLinkClass : mobileNavLinkClass} 
                onClick={closeMobileMenu}
              >
                About
              </Link>
              <Link 
                to="/company" 
                className={isActive('/company') ? activeMobileNavLinkClass : mobileNavLinkClass} 
                onClick={closeMobileMenu}
              >
                Company
              </Link>
              <Link 
                to="/faq" 
                className={isActive('/faq') ? activeMobileNavLinkClass : mobileNavLinkClass} 
                onClick={closeMobileMenu}
              >
                FAQ
              </Link>
              <div>
                <span
                  onClick={() => setIsMobileRecipesOpen(!isMobileRecipesOpen)}
                  className={`${isActive('/recipe-ideas') || isActive('/find') ? activeMobileNavLinkClass : mobileNavLinkClass} w-full text-left flex items-center justify-between cursor-pointer`}
                >
                  <span>Recipes</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${isMobileRecipesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {isMobileRecipesOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link
                      to="/recipe-ideas"
                      className={isActive('/recipe-ideas') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileRecipesOpen(false);
                      }}
                    >
                      Recipe ideas
                    </Link>
                    {user && (
                      <Link
                        to="/find"
                        className={isActive('/find') ? activeMobileNavLinkClass : mobileNavLinkClass}
                        onClick={() => {
                          closeMobileMenu();
                          setIsMobileRecipesOpen(false);
                        }}
                      >
                        Find by ingredients
                      </Link>
                    )}
                  </div>
                )}
              </div>
              <div>
                <span
                  onClick={() => setIsMobileStoriesOpen(!isMobileStoriesOpen)}
                  className={`${isActive('/stories') ? activeMobileNavLinkClass : mobileNavLinkClass} w-full text-left flex items-center justify-between cursor-pointer`}
                >
                  <span>Stories</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${isMobileStoriesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {isMobileStoriesOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link
                      to="/stories/import-recipe-with-image"
                      className={isActive('/stories/import-recipe-with-image') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileStoriesOpen(false);
                      }}
                    >
                      Import Recipe with Image
                    </Link>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="px-3 py-2">
                    <div className="text-sm text-gray-500 mb-2">Signed in as</div>
                    <div className="text-gray-800 font-medium mb-3">{user.displayName}</div>
                    <button
                      type="button"
                      onClick={handleMobileSignOut}
                      className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleMobileSignIn}
                    className="w-full text-left px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md mt-2"
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
  )
}
