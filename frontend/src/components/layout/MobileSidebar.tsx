import { Link, useLocation } from 'react-router-dom';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const { navigation, basePath } = useAppNavigation();

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-text-primary/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 w-[280px] bg-surface-primary shadow-xl z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-default shrink-0">
          <Link to={basePath} onClick={onClose}>
            <NirmaanLogo size="sm" />
          </Link>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-text-secondary hover:text-text-primary hover:bg-surface-soft rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {navigation.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.title && (
                <h3 className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive 
                        ? "bg-nirmaan-green/10 text-nirmaan-green" 
                        : "text-text-secondary hover:bg-surface-soft"
                    )}
                  >
                    <Icon className={cn(
                      "w-5 h-5",
                      isActive ? "text-nirmaan-green" : "text-text-tertiary"
                    )} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
