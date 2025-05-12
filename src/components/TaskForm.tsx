import React, { useState, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    addTask(title);
    setTitle('');
    setError('');
  }, [title, addTask]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error && e.target.value.trim()) {
      setError('');
    }
  }, [error]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full mb-6 transition-all"
    >
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Add a new task..."
          className={`w-full px-4 py-3 pr-12 rounded-lg shadow-sm 
            bg-white dark:bg-gray-800 border-2 
            transition-all duration-200
            ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'} 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
            text-gray-800 dark:text-gray-100`}
        />
        <button
          type="submit"
          aria-label="Add task"
          className="absolute right-2 top-1/2 transform -translate-y-1/2
            text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300
            focus:outline-none transition-colors duration-200"
        >
          <PlusCircle size={24} />
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-400 animate-fadeIn">
          {error}
        </p>
      )}
    </form>
  );
};

export default React.memo(TaskForm);