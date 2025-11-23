import React, { useState } from 'react';
import { Button } from './Button';
import { ViewState } from '../types';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate(ViewState.LANDING)}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-accent to-blue-600 rounded-lg mr-2 group-hover:scale-110 transition-transform"></div>
            <span className="font-serif text-2xl font-bold tracking-tight text-primary dark:text-white">Steam4All.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate(ViewState.LANDING)} className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium transition-colors">Home</button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium transition-colors">Mission</button>
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium transition-colors">Community</button>
            
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            
            <button 
              onClick={toggleTheme}
              className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors overflow-hidden w-10 h-10 flex items-center justify-center"
              aria-label="Toggle Dark Mode"
            >
              <div className="relative w-6 h-6">
                <Sun 
                  size={24} 
                  className={`absolute top-0 left-0 transition-all duration-500 ease-in-out ${isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                />
                <Moon 
                  size={24} 
                  className={`absolute top-0 left-0 transition-all duration-500 ease-in-out ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                />
              </div>
            </button>

            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onNavigate(ViewState.COURSE_PLAYER)}
            >
              Start Coding
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
               <div className="relative w-6 h-6">
                <Sun 
                  size={24} 
                  className={`absolute top-0 left-0 transition-all duration-500 ease-in-out ${isDarkMode ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} 
                />
                <Moon 
                  size={24} 
                  className={`absolute top-0 left-0 transition-all duration-500 ease-in-out ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                />
              </div>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => { onNavigate(ViewState.LANDING); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Home</button>
            <button className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Mission</button>
            <button className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">Community</button>
            <div className="pt-2">
              <Button 
                variant="secondary" 
                className="w-full justify-center"
                onClick={() => { onNavigate(ViewState.COURSE_PLAYER); setIsMobileMenuOpen(false); }}
              >
                Start Coding
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};