import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, MapPin, CheckCircle } from 'lucide-react';
import { searchService } from '@/services/searchService';
import type { SearchResults } from '@/services/searchService';
import { useAuth } from '@/hooks/useAuth';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({ pages: [], activities: [] });
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();
  const { basePath } = useAppNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const fetchResults = async () => {
        setIsLoading(true);
        const res = await searchService.search(query, user?.accountType, basePath);
        setResults(res);
        setIsLoading(false);
      };
      
      const debounce = setTimeout(() => {
        fetchResults();
      }, 200);
      
      return () => clearTimeout(debounce);
    }
  }, [query, isOpen, user?.accountType, basePath]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (results.pages.length > 0 && query) {
        // Simple direct match logic, or just first result
        const exactMatch = results.pages.find(p => p.title.toLowerCase() === query.toLowerCase());
        handleNavigate(exactMatch?.href || results.pages[0].href);
      }
    }
  };

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(path);
  };

  const hasResults = results.pages.length > 0 || results.activities.length > 0;

  return (
    <div className="relative" ref={searchRef}>
      {/* Desktop Search */}
      <div className="hidden md:flex items-center relative z-50">
        <Search className="w-4 h-4 text-text-tertiary absolute left-3" />
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search NIRMAAN... (Ctrl+K)" 
          className="w-64 pl-9 pr-4 py-2 text-sm bg-surface-soft border border-border-default rounded-full focus:outline-none focus:border-nirmaan-green/50 focus:ring-1 focus:ring-nirmaan-green/50 transition-all placeholder:text-text-tertiary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search NIRMAAN"
        />
      </div>
      
      {/* Mobile Search Icon */}
      <button 
        className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface-soft rounded-full transition-colors z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Search NIRMAAN"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 md:left-0 mt-2 w-[calc(100vw-2rem)] md:w-96 max-h-[80vh] bg-surface-primary border border-border-default rounded-xl shadow-lg z-50 flex flex-col overflow-hidden">
          
          {/* Mobile inline input if opened via icon */}
          <div className="md:hidden p-3 border-b border-border-default">
            <div className="relative">
              <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search NIRMAAN..." 
                className="w-full pl-9 pr-4 py-2 text-sm bg-surface-soft border border-border-default rounded-lg focus:outline-none focus:border-nirmaan-green focus:ring-1 focus:ring-nirmaan-green transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="w-5 h-5 text-text-tertiary animate-spin" />
              </div>
            ) : !hasResults ? (
              <div className="p-8 text-center text-text-secondary text-sm">
                <p className="font-semibold text-text-primary mb-1">No results found</p>
                <p>Try another search term.</p>
              </div>
            ) : (
              <div className="p-2 space-y-4">
                
                {/* Quick Access / Pages */}
                {results.pages.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-3 mb-1">
                      {query ? 'Pages' : 'Quick Access'}
                    </h4>
                    <div className="space-y-0.5">
                      {results.pages.map((page, i) => {
                        const Icon = page.icon || CheckCircle;
                        return (
                          <button
                            key={i}
                            onClick={() => handleNavigate(page.href)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-soft rounded-lg transition-colors text-left"
                          >
                            <Icon className="w-4 h-4 text-text-tertiary" />
                            {page.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Activities */}
                {results.activities.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider px-3 mb-1">
                      Activity
                    </h4>
                    <div className="space-y-1 px-1">
                      {results.activities.map((activity) => (
                        <button
                          key={activity.id}
                          onClick={() => {
                            const target = user?.accountType === 'ORGANIZATION' 
                              ? `${basePath}/waste-activity` 
                              : `${basePath}/activity`;
                            handleNavigate(target);
                          }}
                          className="w-full text-left p-3 hover:bg-surface-soft rounded-lg border border-transparent hover:border-border-default transition-all"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {activity.type === 'VERIFIED_CLEANUP' && <CheckCircle className="w-3 h-3 text-nirmaan-green-deep" />}
                            <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
                              {activity.type.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-text-primary line-clamp-1">{activity.title}</p>
                          <p className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" /> {activity.locationName}
                          </p>
                          
                          <div className="flex gap-2 mt-2">
                            {activity.severity && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${activity.severity === 'Critical' ? 'bg-error/10 text-error' : activity.severity === 'High' ? 'bg-accent-terracotta/10 text-accent-terracotta' : 'bg-surface-primary text-text-secondary border border-border-default'}`}>
                                {activity.severity} Priority
                              </span>
                            )}
                            {activity.reportCount && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-surface-primary text-text-secondary border border-border-default">
                                {activity.reportCount} reports
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
              </div>
            )}
          </div>
          
          {hasResults && query && (
            <div className="p-2 border-t border-border-default bg-surface-soft text-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs font-medium text-nirmaan-green hover:text-nirmaan-green-dark"
              >
                View all results →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
