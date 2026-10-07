/**
 * NIRMAAN — Auth Service
 *
 * Frontend-only authentication service for demo/development purposes.
 * Provides mock login, register, and logout functionality using
 * in-memory state. No backend required.
 *
 * This will be replaced with real API calls once the backend is ready.
 */

import type { User, ApiResponse, AccountType } from '@/types';

export interface LoginCredentials {
  email: string;
  password: string;
  accountType?: AccountType;
}

export interface RegisterPayload {
  name?: string;
  full_name?: string;
  email: string;
  password: string;
  phone?: string;
  organization_type?: string;
  contact_person?: string;
  accountType: AccountType;
}

/* ─── Demo Users ─── */

const DEMO_USERS: Record<string, User> = {
  'user@nirmaan.demo': {
    id: 'demo-user-001',
    email: 'user@nirmaan.demo',
    name: 'Demo User',
    accountType: 'USER',
    role: 'CITIZEN',
    createdAt: new Date().toISOString(),
  },
  'org@nirmaan.demo': {
    id: 'demo-org-001',
    email: 'org@nirmaan.demo',
    name: 'Clean Earth Foundation',
    accountType: 'ORGANIZATION',
    role: 'NGO',
    createdAt: new Date().toISOString(),
  },
};

const DEMO_PASSWORD = 'password';

export const authService = {
  /**
   * Authenticate user with email and password.
   * DEMO ONLY — validates against hardcoded demo credentials.
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const user = DEMO_USERS[credentials.email];
    if (!user || credentials.password !== DEMO_PASSWORD) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Check account type match
    if (credentials.accountType && user.accountType !== credentials.accountType) {
      return { success: false, error: 'No account found for this account type' };
    }

    return { success: true, data: user };
  },

  /**
   * Register a new account.
   * DEMO ONLY — creates a temporary in-memory user.
   */
  async register(payload: RegisterPayload): Promise<ApiResponse<User>> {
    await new Promise((r) => setTimeout(r, 800));

    const newUser: User = {
      id: `demo-${Date.now()}`,
      email: payload.email,
      name: payload.name || payload.full_name || 'New User',
      accountType: payload.accountType,
      role: payload.accountType === 'USER' ? 'CITIZEN' : 'NGO',
      createdAt: new Date().toISOString(),
    };

    return { success: true, data: newUser };
  },

  /**
   * End the current session.
   * DEMO ONLY — no server-side session to invalidate.
   */
  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 200));
    // Nothing to clean up in demo mode
  },

  /**
   * Get the current authenticated user's profile.
   * DEMO ONLY — returns null (no persistent session in demo).
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    // In demo mode, there is no persistent session.
    // AuthContext will handle state in-memory.
    return { success: false, error: 'No active session' };
  },
};
