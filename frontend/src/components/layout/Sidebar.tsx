import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NirmaanLogo } from '@/components/shared/NirmaanLogo';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const { navigation, basePath } = useAppNavigation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden lg:flex flex-col bg-surface-primary border-r lg:border-l lg:border-t border-border-default h-full shrink-0 transition-all duration-300 lg:rounded-tl-[2.5rem] overflow-hidden shadow-2xl relative z-20",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="h-20 flex items-center justify-between px-6 border-b border-border-default shrink-0">
        <Link to={basePath} className={cn(
          "hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-nirmaan-green rounded overflow-hidden",
          isCollapsed && "flex justify-center w-full"
        )}>
          <NirmaanLogo size="sm" markOnly={isCollapsed} />
        </Link>
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => setIsCollapsed(false)}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-8 custom-scrollbar">
        {navigation.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && !isCollapsed && (
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
                  title={isCollapsed ? item.name : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-all group",
                    isCollapsed ? "justify-center p-3 mb-2" : "gap-3 px-3 py-2.5",
                    isActive 
                      ? "bg-nirmaan-green/10 text-nirmaan-green" 
                      : "text-text-secondary hover:bg-surface-soft hover:text-text-primary"
                  )}
                >
                  <Icon className={cn(
                    "w-5 h-5 transition-colors shrink-0",
                    isActive ? "text-nirmaan-green" : "text-text-tertiary group-hover:text-text-secondary"
                  )} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Decorative subtle pattern in bottom corner */}
      <div className="h-24 pointer-events-none opacity-[0.03] overflow-hidden relative border-t border-border-default shrink-0">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-nirmaan-green rounded-full opacity-50" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-nirmaan-green rounded-full" />
      </div>
    </aside>
  );
}
