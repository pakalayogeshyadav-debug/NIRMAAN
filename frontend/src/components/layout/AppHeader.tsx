import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ProfileMenu } from './ProfileMenu';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { GlobalSearch } from '@/components/navigation/GlobalSearch';
import { NotificationCenter } from '@/components/navigation/NotificationCenter';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
}

export function AppHeader({ onOpenMobileMenu }: AppHeaderProps) {
  const location = useLocation();
  const { navigation } = useAppNavigation();
  let currentPageTitle = 'Overview';
  
  for (const section of navigation) {
    const item = section.items.find(i => i.href === location.pathname);
    if (item) {
      currentPageTitle = item.name;
      break;
    }
  }

  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-6 mx-4 mt-4 mb-2 lg:mx-8 lg:mt-6 lg:mb-4 border border-border-default bg-surface-primary/80 backdrop-blur-md sticky top-4 lg:top-6 z-30 shrink-0 rounded-full shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-surface-soft rounded-md transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="lg:hidden">
          <NirmaanLogo size="sm" markOnly />
        </div>
        
        <h1 className="text-lg lg:text-xl font-bold text-text-primary hidden sm:block">
          {currentPageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <GlobalSearch />
        
        <NotificationCenter />
        
        <div className="w-px h-6 bg-border-default mx-1 hidden sm:block" />

        <ProfileMenu />
      </div>
    </header>
  );
}
