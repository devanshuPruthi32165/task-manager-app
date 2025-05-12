import React, { useCallback } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskFilter } from '../types';

const FilterTabs: React.FC = () => {
  const { activeFilter, setFilter, tasks } = useTasks();

  // Count tasks by status
  const counts = React.useMemo(() => {
    const all = tasks.length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    return { all, pending, completed };
  }, [tasks]);

  const handleFilterChange = useCallback((filter: TaskFilter) => {
    setFilter(filter);
  }, [setFilter]);

  const tabs = [
    { id: 'all' as TaskFilter, label: 'All', count: counts.all },
    { id: 'pending' as TaskFilter, label: 'Pending', count: counts.pending },
    { id: 'completed' as TaskFilter, label: 'Completed', count: counts.completed }
  ];

  return (
    <div className="flex w-full mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleFilterChange(tab.id)}
          className={`flex-1 py-3 px-4 text-center relative transition-all duration-200
            ${activeFilter === tab.id 
              ? 'text-indigo-600 dark:text-indigo-400 font-medium' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
            }`}
        >
          <span className="mr-2">{tab.label}</span>
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs 
            font-medium rounded-full bg-gray-200 dark:bg-gray-700 
            text-gray-700 dark:text-gray-300">
            {tab.count}
          </span>
          {activeFilter === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 
              dark:bg-indigo-400 transition-all duration-300 animate-expandWidth" />
          )}
        </button>
      ))}
    </div>
  );
};

export default React.memo(FilterTabs);