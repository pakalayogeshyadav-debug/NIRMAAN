/**
 * NIRMAAN — Core Type Definitions
 *
 * Shared type definitions used across the application.
 * These types represent the data contracts the frontend expects
 * from the backend REST API.
 */

/* ─── Authentication & Accounts ─── */

export type AccountType = 'USER' | 'ORGANIZATION';

export type UserRole = 'CITIZEN' | 'VOLUNTEER';

export type OrganizationRole =
  | 'NGO'
  | 'COMMUNITY_ORGANIZATION'
  | 'CORPORATE'
  | 'CSR_ORGANIZATION';

export interface User {
  id: string;
  email: string;
  name: string;
  accountType: AccountType;
  role: UserRole | OrganizationRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/* ─── API Response Contracts ─── */

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
  details?: Record<string, string[]>;
}

/* ─── Component Prop Variants ─── */

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'accent';

export type InputSize = 'sm' | 'md' | 'lg';

/* ─── Navigation ─── */

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}
