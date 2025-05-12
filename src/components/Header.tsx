import React from 'react';
import { CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CheckSquare className="text-indigo-600 dark:text-indigo-400 mr-3" size={28} />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            TaskFlow
          </h1>
        </div>
        <ThemeToggle />
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Organize your tasks efficiently
      </p>
    </header>
  );
};

export default React.memo(Header);