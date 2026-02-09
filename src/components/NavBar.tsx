import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../hooks/useAuth'

interface NavBarProps {
  user: User | null
  onSignIn: () => void
  onSignOut: () => void
}

const navLinkClass =
  'text-gray-600 hover:text-gray-800 transition-colors';
const mobileNavLinkClass =
  'block px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md';

export default function NavBar({ user, onSignIn, onSignOut }: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
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
            <Link to="/about" className={navLinkClass}>
              About
            </Link>
            <Link to="/company" className={navLinkClass}>
              Company
            </Link>
            <Link to="/faq" className={navLinkClass}>
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
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
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
              <Link to="/about" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                About
              </Link>
              <Link to="/company" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                Company
              </Link>
              <Link to="/faq" className={mobileNavLinkClass} onClick={closeMobileMenu}>
                FAQ
              </Link>
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
  )
}
