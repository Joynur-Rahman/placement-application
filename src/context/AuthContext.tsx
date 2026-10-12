import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout as logoutAction, setUser, setLoading } from '@/store/authSlice';
import { authService } from '@/services/authService';
import { User, LoginRequest, RegisterRequest } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<unknown>;
  register: (data: RegisterRequest) => Promise<unknown>;
  logout: () => Promise<void>;
  validateSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  // Validate session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          dispatch(setLoading(true));
          const isValid = await authService.validateToken();
          if (isValid) {
            const currentUser = await authService.getCurrentUser();
            if (currentUser) {
              dispatch(setUser(currentUser));
            }
          } else {
            dispatch(logoutAction());
          }
        } catch {
          dispatch(logoutAction());
        } finally {
          dispatch(setLoading(false));
        }
      }
      setIsInitialized(true);
    };

    initAuth();
  }, [dispatch]);

  // Sync session across browser tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (!e.newValue) {
          dispatch(logoutAction());
        } else {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            try {
              dispatch(setUser(JSON.parse(storedUser)));
            } catch {
              // ignore json parse error
            }
          }
        }
      }
    };

    const handleUnauthorized = () => {
      dispatch(logoutAction());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, [dispatch]);

  const validateSession = async () => {
    return authService.validateToken();
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated,
    isLoading: isLoading || !isInitialized,
    error,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
    validateSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
