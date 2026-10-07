import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { AccountType } from '@/types';

interface ProtectedRouteProps {
  allowedAccountType?: AccountType;
}

export function ProtectedRoute({ allowedAccountType }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nirmaan-green"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedAccountType && user?.accountType !== allowedAccountType) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
