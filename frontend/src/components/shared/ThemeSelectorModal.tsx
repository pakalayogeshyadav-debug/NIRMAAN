import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import type { Theme } from '@/context/ThemeContext';
import { Sun, Monitor } from 'lucide-react';
import { NirmaanPattern } from './NirmaanPattern';

export function ThemeSelectorModal() {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has ever made a choice
    const hasChosen = localStorage.getItem('nirmaan-theme-chosen');
    if (!hasChosen) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem('nirmaan-theme-chosen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/20 backdrop-blur-sm transition-opacity duration-500">
      <div className="relative w-full max-w-sm bg-surface-primary border border-border-default rounded-xl shadow-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
           <NirmaanPattern variant="subtle" />
        </div>

        <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-nirmaan-green-light rounded-full flex items-center justify-center mb-4 text-nirmaan-green">
            <Sun size={24} />
          </div>
          
          <h2 className="text-xl font-bold text-text-primary mb-2">Choose your appearance</h2>
          <p className="text-text-secondary text-sm mb-8">
            How would you like NIRMAAN to look?
          </p>

          <div className="w-full flex flex-col gap-3">
            <button
              onClick={() => handleSelect('light')}
              className="flex items-center gap-4 w-full p-4 rounded-lg border border-border-default hover:border-nirmaan-green hover:bg-nirmaan-green-light/50 transition-colors text-left"
            >
              <Sun size={20} className="text-text-tertiary flex-shrink-0" />
              <div>
                <div className="font-medium text-text-primary">Continue in Light Mode</div>
                <div className="text-xs text-text-secondary mt-0.5">Use NIRMAAN light appearance</div>
              </div>
            </button>

            <button
              onClick={() => handleSelect('system')}
              className="flex items-center gap-4 w-full p-4 rounded-lg border border-border-default hover:border-nirmaan-green hover:bg-nirmaan-green-light/50 transition-colors text-left"
            >
              <Monitor size={20} className="text-text-tertiary flex-shrink-0" />
              <div>
                <div className="font-medium text-text-primary">Use System Settings</div>
                <div className="text-xs text-text-secondary mt-0.5">Follow your device preference</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
