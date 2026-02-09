import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface User {
  displayName: string
  id: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/me`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    }
  }, [])

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus])

  const signIn = useCallback(() => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  }, []);

  const signOut = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      if (response.ok) {
        setUser(null);
        await checkAuthStatus();
      } else {
        console.error('Logout failed:', response.statusText);
        setUser(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  }, [checkAuthStatus]);

  return { user, signIn, signOut };
}
