
import React from 'react';
import { Sun, Moon, Terminal, Code2 } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onShowPrompt: () => void;
  isDataAvailable: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onShowPrompt, isDataAvailable }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neonCyan rounded-lg flex items-center justify-center neon-glow">
            <Code2 className="text-darkBg w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg hidden sm:block">AI.ARCHITECT</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-neonCyan transition-colors">About</a>
            <a href="#skills" className="hover:text-neonCyan transition-colors">Skills</a>
            <a href="#projects" className="hover:text-neonCyan transition-colors">Projects</a>
            <a href="#contact" className="hover:text-neonCyan transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onToggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-neonCyan" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            
            {isDataAvailable && (
              <button 
                onClick={onShowPrompt}
                className="flex items-center gap-2 px-4 py-2 bg-neonCyan/10 text-neonCyan border border-neonCyan/30 rounded-full hover:bg-neonCyan hover:text-darkBg transition-all duration-300 text-sm font-semibold"
              >
                <Terminal className="w-4 h-4" />
                <span className="hidden sm:inline">Get Prompt</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
