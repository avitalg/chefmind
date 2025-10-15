import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function ReactQueryDevTools() {
  // Only show devtools in development
  if (import.meta.env.DEV) {
    return <ReactQueryDevtools initialIsOpen={false} />
  }
  return null
}
