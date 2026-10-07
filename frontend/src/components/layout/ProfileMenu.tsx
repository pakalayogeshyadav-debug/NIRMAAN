import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { LogOut } from 'lucide-react';

export function ProfileMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { profileLink, settingsLink, isDevPreview } = useAppNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (isDevPreview) {
      navigate('/login');
      return;
    }
    await logout();
    navigate('/login');
  };

  const isOrg = user?.accountType === 'ORGANIZATION';
  // Use organization name if available, fallback to user name
  const displayName = user?.name || 'User';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-full hover:bg-surface-soft transition-colors focus:outline-none focus:ring-2 focus:ring-nirmaan-green/50"
      >
        <div className="w-9 h-9 bg-nirmaan-green-light/20 rounded-full flex items-center justify-center text-nirmaan-green font-bold text-sm border border-nirmaan-green/10">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-primary border border-border-default rounded-xl shadow-md py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-border-default mb-2">
            <p className="text-sm font-semibold text-text-primary truncate">{displayName}</p>
            <p className="text-xs text-text-secondary mt-0.5">
              {isOrg ? 'Organization' : 'Citizen'}
            </p>
          </div>
          
          <Link 
            to={profileLink} 
            className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-soft transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
          <Link 
            to={settingsLink} 
            className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-soft transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
          
          <div className="h-px bg-border-default my-2" />
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/5 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
