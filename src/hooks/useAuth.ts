import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { 
  login as loginAction, 
  register as registerAction, 
  logout as logoutAction, 
  setLoading, 
  setError, 
  clearError as clearErrorAction 
} from '@/store/authSlice';
import { authService } from '@/services/authService';
import { LoginRequest, RegisterRequest, UserRole } from '@/types/auth';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (credentials: LoginRequest) => {
      dispatch(setLoading(true));
      try {
        const response = await authService.login(credentials);
        dispatch(loginAction(response));
        return response;
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : 'Invalid credentials or login failed';
        dispatch(setError(errorMsg));
        throw err;
      }
    },
    [dispatch]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      dispatch(setLoading(true));
      try {
        const response = await authService.register(data);
        dispatch(registerAction(response));
        return response;
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : 'Registration failed';
        dispatch(setError(errorMsg));
        throw err;
      }
    },
    [dispatch]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      dispatch(logoutAction());
    }
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearErrorAction());
  }, [dispatch]);

  const hasRole = useCallback(
    (allowed: UserRole | UserRole[]) => {
      if (!user) return false;
      const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];
      return allowedRoles.includes(user.role);
    },
    [user]
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    role: user?.role,
    isStudent: user?.role === 'student',
    isRecruiter: user?.role === 'recruiter',
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    clearError,
    hasRole,
  };
}

export default useAuth;
