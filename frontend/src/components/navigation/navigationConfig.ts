import { 
  Home, 
  MapPin, 
  Activity, 
  Calendar, 
  Leaf, 
  User, 
  Settings, 
  Users, 
  Banknote,
  ClipboardList
} from 'lucide-react';
import type { AccountType } from '@/types';

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const userNavigation: NavSection[] = [
  {
    items: [
      { name: 'Overview', href: '/app', icon: Home },
      { name: 'Report Waste', href: '/app/report', icon: MapPin },
      { name: 'Nearby Activity', href: '/app/activity', icon: Activity },
      { name: 'Cleanup Drives', href: '/app/drives', icon: Calendar },
      { name: 'My Activity', href: '/app/tasks', icon: ClipboardList },
      { name: 'My Impact', href: '/app/impact', icon: Leaf },
    ]
  },
  {
    items: [
      { name: 'Profile', href: '/app/profile', icon: User },
      { name: 'Settings', href: '/app/settings', icon: Settings },
    ]
  }
];

export const organizationNavigation: NavSection[] = [
  {
    items: [
      { name: 'Overview', href: '/organization', icon: Home },
      { name: 'Waste Activity', href: '/organization/activity', icon: Activity },
      { name: 'Cleanup Drives', href: '/organization/drives', icon: Calendar },
      { name: 'Volunteers', href: '/organization/volunteers', icon: Users },
      { name: 'Funding', href: '/organization/funding', icon: Banknote },
      { name: 'Impact', href: '/organization/impact', icon: Leaf },
    ]
  },
  {
    items: [
      { name: 'Organization', href: '/organization/profile', icon: User },
      { name: 'Settings', href: '/organization/settings', icon: Settings },
    ]
  }
];

export const getNavigationForRole = (role?: AccountType, basePath?: string): NavSection[] => {
  const defaultNav = role === 'ORGANIZATION' ? organizationNavigation : userNavigation;
  
  if (!basePath) return defaultNav;

  const defaultBase = role === 'ORGANIZATION' ? '/organization' : '/app';
  
  return defaultNav.map(section => ({
    ...section,
    items: section.items.map(item => ({
      ...item,
      // Handle the root overview path exactly, e.g. /app -> /dev/preview/user
      href: item.href === defaultBase 
        ? basePath 
        : item.href.replace(defaultBase, basePath)
    }))
  }));
};
