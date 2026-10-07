/**
 * NIRMAAN — Application Root
 */

import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ThemeSelectorModal } from '@/components/shared/ThemeSelectorModal';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ThemeSelectorModal />
      </AuthProvider>
    </ThemeProvider>
  );
}
