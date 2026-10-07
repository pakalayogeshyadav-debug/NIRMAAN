/**
 * NIRMAAN — Route Definitions
 *
 * Centralized route configuration.
 * Placeholder pages are used for routes that will be built in future sprints.
 */

import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AppLayout } from '@/layouts/AppLayout';
import { LandingPage } from '@/pages/landing/LandingPage';
import { HowItWorksPage } from '@/pages/public/HowItWorksPage';
import { ImpactPage } from '@/pages/public/ImpactPage';
import { TermsOfServicePage } from '@/pages/public/TermsOfServicePage';
import { PrivacyPolicyPage } from '@/pages/public/PrivacyPolicyPage';


// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterSelectionPage } from '@/pages/auth/RegisterSelectionPage';
import { UserRegistrationPage } from '@/pages/auth/UserRegistrationPage';
import { OrganizationRegistrationPage } from '@/pages/auth/OrganizationRegistrationPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';

// Protected Route wrapper
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// App Pages
import { UserOverviewPage } from '@/pages/app/UserOverviewPage';
import { OrganizationOverviewPage } from '@/pages/organization/OrganizationOverviewPage';
import { AppPreview } from '@/pages/dev/AppPreview';

// Dev Preview Pages
import { 
  ReportWastePreview, NearbyActivityPreview, CleanupDrivesPreview, 
  MyActivityPreview, MyImpactPreview, ProfilePreview, SettingsPreview 
} from '@/pages/dev/UserPreviewPages';
import { 
  WasteActivityPreview, OrganizationDrivesPreview, VolunteersPreview, 
  FundingPreview, OrganizationImpactPreview, OrganizationProfilePreview, OrganizationSettingsPreview 
} from '@/pages/dev/OrganizationPreviewPages';

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/how-it-works', element: <HowItWorksPage /> },
      { path: '/impact', element: <ImpactPage /> },
      { path: '/terms', element: <TermsOfServicePage /> },
      { path: '/privacy', element: <PrivacyPolicyPage /> },
    ],
  },
  // Auth routes typically don't use the PublicLayout (no standard navbar/footer)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterSelectionPage /> },
  { path: '/register/user', element: <UserRegistrationPage /> },
  { path: '/register/organization', element: <OrganizationRegistrationPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  
  // Authenticated USER routes
  {
    path: '/app',
    element: <ProtectedRoute allowedAccountType="USER" />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <UserOverviewPage /> },
          { path: 'report', element: <ReportWastePreview /> },
          { path: 'activity', element: <NearbyActivityPreview /> },
          { path: 'tasks', element: <MyActivityPreview /> },
          { path: 'drives', element: <CleanupDrivesPreview /> },
          { path: 'impact', element: <MyImpactPreview /> },
          { path: 'profile', element: <ProfilePreview /> },
          { path: 'settings', element: <SettingsPreview /> },
        ]
      }
    ],
  },
  
  // Authenticated ORGANIZATION routes
  {
    path: '/organization',
    element: <ProtectedRoute allowedAccountType="ORGANIZATION" />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <OrganizationOverviewPage /> },
          { path: 'activity', element: <WasteActivityPreview /> },
          { path: 'drives', element: <OrganizationDrivesPreview /> },
          { path: 'volunteers', element: <VolunteersPreview /> },
          { path: 'funding', element: <FundingPreview /> },
          { path: 'impact', element: <OrganizationImpactPreview /> },
          { path: 'profile', element: <OrganizationProfilePreview /> },
          { path: 'settings', element: <OrganizationSettingsPreview /> },
        ]
      }
    ],
  },
  
  // ==========================================
  // DEVELOPMENT ONLY PREVIEW ROUTES
  // ==========================================
  {
    path: '/dev/preview',
    element: <AppPreview />,
    children: [
      // USER PREVIEW
      { path: 'user', element: <UserOverviewPage /> },
      { path: 'user/report', element: <ReportWastePreview /> },
      { path: 'user/activity', element: <NearbyActivityPreview /> },
      { path: 'user/tasks', element: <MyActivityPreview /> },
      { path: 'user/drives', element: <CleanupDrivesPreview /> },
      { path: 'user/impact', element: <MyImpactPreview /> },
      { path: 'user/profile', element: <ProfilePreview /> },
      { path: 'user/settings', element: <SettingsPreview /> },
      
      // ORGANIZATION PREVIEW
      { path: 'organization', element: <OrganizationOverviewPage /> },
      { path: 'organization/activity', element: <WasteActivityPreview /> },
      { path: 'organization/drives', element: <OrganizationDrivesPreview /> },
      { path: 'organization/volunteers', element: <VolunteersPreview /> },
      { path: 'organization/funding', element: <FundingPreview /> },
      { path: 'organization/impact', element: <OrganizationImpactPreview /> },
      { path: 'organization/profile', element: <OrganizationProfilePreview /> },
      { path: 'organization/settings', element: <OrganizationSettingsPreview /> },
    ]
  }
]);
