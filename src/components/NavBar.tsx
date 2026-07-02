import { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { User } from '../hooks/useAuth';
import { addUtmToPath } from '../utils/utm';

interface NavBarProps {
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

const navLinkClass =
  'text-xs text-[#2d5a54] hover:text-ink transition-colors';
const activeNavLinkClass =
  'text-xs text-teal font-semibold hover:text-teal-dark transition-colors';
const mobileNavLinkClass =
  'block px-3 py-2 text-[#2d5a54] hover:text-ink hover:bg-cream rounded-md';
const activeMobileNavLinkClass =
  'block px-3 py-2 text-teal font-semibold hover:text-teal-dark hover:bg-cream rounded-md bg-cream';

export default function NavBar({ user, onSignIn, onSignOut }: NavBarProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRecipesDropdownOpen, setIsRecipesDropdownOpen] = useState(false);
  const [isMobileRecipesOpen, setIsMobileRecipesOpen] = useState(false);
  const [isStoriesDropdownOpen, setIsStoriesDropdownOpen] = useState(false);
  const [isMobileStoriesOpen, setIsMobileStoriesOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);

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
    setIsMobileCompanyOpen(false);
  }, [])


  return (
    <nav className="bg-paper border-b border-border-warm">
      <div className="max-w-6xl mx-auto px-4 w-full min-w-0">
        <div className="flex justify-between items-center h-16">
          <Link to={addUtmToPath('/', { utm_content: 'header' })} className="flex items-center">
            <img src="/favicon10.svg" alt="ChefMind" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold text-ink">ChefMind</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to={addUtmToPath('/', { utm_content: 'header' })} className={isActive('/') ? activeNavLinkClass : navLinkClass}>
              Home
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
                  <div className="bg-paper rounded-md py-1 border border-border-warm shadow-sm">
                    <Link
                      to={addUtmToPath('/recipe-ideas', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/recipe-ideas') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsRecipesDropdownOpen(false)}
                    >
                      Recipe ideas
                    </Link>
                    {user && (
                      <Link
                        to={addUtmToPath('/find', { utm_content: 'header' })}
                        className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/find') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
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
                <div className="absolute left-0 top-full pt-2 w-56 z-50">
                  <div className="bg-paper rounded-md py-1 border border-border-warm shadow-sm">
                    <Link
                      to={addUtmToPath('/stories/import-recipe-with-image', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/stories/import-recipe-with-image') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsStoriesDropdownOpen(false)}
                    >
                      Import Recipe with Image
                    </Link>
                    <Link
                      to={addUtmToPath('/stories/preserving-family-recipes', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/stories/preserving-family-recipes') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsStoriesDropdownOpen(false)}
                    >
                      Preserving Family Recipes
                    </Link>
                    <Link
                      to={addUtmToPath('/stories/recipe-memory-and-nostalgia', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/stories/recipe-memory-and-nostalgia') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsStoriesDropdownOpen(false)}
                    >
                      Recipe Memory & Nostalgia
                    </Link>
                    <Link
                      to={addUtmToPath('/stories/building-your-culinary-legacy', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/stories/building-your-culinary-legacy') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsStoriesDropdownOpen(false)}
                    >
                      Building Your Culinary Legacy
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyDropdownOpen(true)}
              onMouseLeave={() => setIsCompanyDropdownOpen(false)}
            >
              <span
                className={`${isActive('/company') || isActive('/about') ? activeNavLinkClass : navLinkClass} flex items-center cursor-pointer`}
                aria-expanded={isCompanyDropdownOpen}
              >
                Company
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
              {isCompanyDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-48 z-50">
                  <div className="bg-paper rounded-md py-1 border border-border-warm shadow-sm">
                    <Link
                      to={addUtmToPath('/company', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/company') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      Company
                    </Link>
                    <Link
                      to={addUtmToPath('/about', { utm_content: 'header' })}
                      className={`block px-4 py-2 text-sm hover:bg-cream ${isActive('/about') ? 'text-teal font-semibold' : 'text-[#2d5a54]'}`}
                      onClick={() => setIsCompanyDropdownOpen(false)}
                    >
                      About
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to={addUtmToPath('/faq', { utm_content: 'header' })} className={isActive('/faq') ? activeNavLinkClass : navLinkClass}>
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-[#2d5a54] text-xs font-bold">{user.displayName}</span>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="btn-secondary text-xs px-3 py-1.5"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onSignIn}
                className="btn-primary text-sm gap-2"
              >
                Sign in
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <button
                type="button"
                onClick={onSignOut}
                className="btn-secondary text-xs px-3 py-1.5"
              >
                Sign out
              </button>
            ) : (
              <button
                type="button"
                onClick={onSignIn}
                className="btn-primary text-xs gap-1.5 px-3 py-1.5"
              >
                Sign in
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>
            )}
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-cream">
              <Link 
                to={addUtmToPath('/', { utm_content: 'header' })} 
                className={isActive('/') ? activeMobileNavLinkClass : mobileNavLinkClass} 
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <div>
                <span
                  onClick={() => setIsMobileCompanyOpen(!isMobileCompanyOpen)}
                  className={`${isActive('/company') || isActive('/about') ? activeMobileNavLinkClass : mobileNavLinkClass} w-full text-left flex items-center justify-between cursor-pointer`}
                >
                  <span>Company</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${isMobileCompanyOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {isMobileCompanyOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link
                      to={addUtmToPath('/company', { utm_content: 'header' })}
                      className={isActive('/company') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileCompanyOpen(false);
                      }}
                    >
                      Company
                    </Link>
                    <Link
                      to={addUtmToPath('/about', { utm_content: 'header' })}
                      className={isActive('/about') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileCompanyOpen(false);
                      }}
                    >
                      About
                    </Link>
                  </div>
                )}
              </div>
              <Link 
                to={addUtmToPath('/faq', { utm_content: 'header' })} 
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
                      to={addUtmToPath('/recipe-ideas', { utm_content: 'header' })}
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
                        to={addUtmToPath('/find', { utm_content: 'header' })}
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
                      to={addUtmToPath('/stories/import-recipe-with-image', { utm_content: 'header' })}
                      className={isActive('/stories/import-recipe-with-image') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileStoriesOpen(false);
                      }}
                    >
                      Import Recipe with Image
                    </Link>
                    <Link
                      to={addUtmToPath('/stories/preserving-family-recipes', { utm_content: 'header' })}
                      className={isActive('/stories/preserving-family-recipes') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileStoriesOpen(false);
                      }}
                    >
                      Preserving Family Recipes
                    </Link>
                    <Link
                      to={addUtmToPath('/stories/recipe-memory-and-nostalgia', { utm_content: 'header' })}
                      className={isActive('/stories/recipe-memory-and-nostalgia') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileStoriesOpen(false);
                      }}
                    >
                      Recipe Memory & Nostalgia
                    </Link>
                    <Link
                      to={addUtmToPath('/stories/building-your-culinary-legacy', { utm_content: 'header' })}
                      className={isActive('/stories/building-your-culinary-legacy') ? activeMobileNavLinkClass : mobileNavLinkClass}
                      onClick={() => {
                        closeMobileMenu();
                        setIsMobileStoriesOpen(false);
                      }}
                    >
                      Building Your Culinary Legacy
                    </Link>
                  </div>
                )}
              </div>
              {user && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="px-3 py-2">
                    <div className="text-sm text-gray-500 mb-1">Signed in as</div>
                    <div className="text-gray-800 font-bold">{user.displayName}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
