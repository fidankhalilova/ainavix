'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextValue {
  user:            User | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  login:           (jwt: string, user: User) => void;
  logout:          () => Promise<void>;
  refreshUser:     () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,      setUser]      = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const normalise = (u: User): User => ({ ...u, id: u._id ?? u.id });

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
    if (!token) { setIsLoading(false); return; }

    authService.me(token)
      .then(u => setUser(normalise(u)))
      .catch(() => localStorage.removeItem('jwt'))
      .finally(() => setIsLoading(false));
  }, []);

  const login = (jwt: string, u: User) => {
    localStorage.setItem('jwt', jwt);
    setUser(normalise(u));
  };

  const logout = async () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) return;
      const u = await authService.me(token);
      setUser(normalise(u));
    } catch (_) {}
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
