import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
        text-gray-600 dark:text-gray-400
        hover:text-indigo-600 dark:hover:text-indigo-400
        transition-all duration-300 ease-in-out
        hover:ring-2 hover:ring-indigo-300 dark:hover:ring-indigo-700"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="animate-fadeIn" />
      ) : (
        <Moon size={20} className="animate-fadeIn" />
      )}
    </button>
  );
};

export default React.memo(ThemeToggle);