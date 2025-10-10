import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = vi.fn()

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:5173',
    origin: 'http://localhost:5173',
    reload: vi.fn(),
  },
  writable: true,
})

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3001',
  },
}))
