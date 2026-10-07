import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { getNavigationForRole } from '@/components/navigation/navigationConfig';

export function useAppNavigation() {
  const { user } = useAuth();
  const location = useLocation();

  // Detect if we are in a dev preview environment
  const isUserPreview = location.pathname.startsWith('/dev/preview/user');
  const isOrgPreview = location.pathname.startsWith('/dev/preview/organization');
  
  // Determine the effective base path
  let basePath: string | undefined;
  if (isUserPreview) basePath = '/dev/preview/user';
  else if (isOrgPreview) basePath = '/dev/preview/organization';

  const isOrg = user?.accountType === 'ORGANIZATION';
  
  // Get navigation config with updated paths if needed
  const navigation = getNavigationForRole(user?.accountType, basePath);

  // Helper links for ProfileMenu and Quick Actions
  const effectiveBase = basePath || (isOrg ? '/organization' : '/app');
  const profileLink = `${effectiveBase}/profile`;
  const settingsLink = `${effectiveBase}/settings`;
  
  return {
    navigation,
    basePath: effectiveBase,
    profileLink,
    settingsLink,
    isDevPreview: isUserPreview || isOrgPreview,
  };
}
