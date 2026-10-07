/**
 * NIRMAAN — Authentication Context
 *
 * Provides authentication state and actions to the component tree.
 * DEMO ONLY — uses in-memory state with authService mock.
 *
 * Architecture:
 *   AuthProvider wraps the app → components access auth via useAuth() hook
 *   → auth operations delegate to authService (demo/mock)
 *
 * No backend required. No tokens. No cookies.
 */

/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, AccountType } from '@/types';
import { authService } from '@/services/auth.service';
import type { LoginCredentials, RegisterPayload } from '@/services/auth.service';

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<{ data?: any }>;
  logout: () => Promise<void>;
  isAccountType: (type: AccountType) => boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>(initialState);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authService.register(payload);
      if (response.success && response.data) {
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
        return { data: response.data };
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const isAccountType = useCallback(
    (type: AccountType) => state.user?.accountType === type,
    [state.user],
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        isAccountType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
