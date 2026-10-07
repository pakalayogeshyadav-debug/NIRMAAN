/**
 * NIRMAAN — Custom Hooks
 */

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

/**
 * Access authentication state and actions.
 * Must be used within an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
