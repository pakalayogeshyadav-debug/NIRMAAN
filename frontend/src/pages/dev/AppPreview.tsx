import { useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { AppLayout } from '@/layouts/AppLayout';
import type { AccountType } from '@/types';

import { mockUser } from '@/data/mockUser';
import { mockOrganization } from '@/data/mockOrganization';

export function AppPreview() {
  const location = useLocation();
  const isOrganization = location.pathname.includes('/organization');
  const user = isOrganization ? mockOrganization : mockUser;

  // Provide a completely mocked AuthContext just for this subtree
  // This bypasses the real AuthProvider, allowing us to preview the shell 
  // without modifying the production auth flow.
  const mockAuthContextValue = {
    user,
    isAuthenticated: true,
    isLoading: false,
    login: async () => {},
    register: async () => ({}),
    logout: async () => {},
    isAccountType: (type: AccountType) => user.accountType === type,
  };

  return (
    <AuthContext.Provider value={mockAuthContextValue}>
      <AppLayout />
    </AuthContext.Provider>
  );
}
