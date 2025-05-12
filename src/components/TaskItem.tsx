import React, { useCallback } from 'react';
import { Check, Trash2, Circle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { Task } from '../types';

type TaskItemProps = {
  task: Task;
  index: number;
  isDragging?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, index, isDragging }) => {
  const { toggleTaskStatus, deleteTask } = useTasks();

  const handleToggle = useCallback(() => {
    toggleTaskStatus(task.id);
  }, [task.id, toggleTaskStatus]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [task.id, deleteTask]);

  // Format relative time
  const formatRelativeTime = useCallback((date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }, []);

  return (
    <div 
      className={`
        group p-4 mb-3 rounded-lg transition-all duration-200 animate-fadeIn
        ${isDragging ? 'shadow-lg scale-[1.02]' : 'shadow-sm hover:shadow-md'}
        ${task.status === 'completed' 
          ? 'bg-gray-50 dark:bg-gray-800/70 border-l-4 border-teal-500 dark:border-teal-600' 
          : 'bg-white dark:bg-gray-800 border-l-4 border-indigo-500 dark:border-indigo-600'}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={handleToggle}
            className={`
              p-1 rounded-full flex-shrink-0 mt-0.5 transition-colors duration-200
              ${task.status === 'completed'
                ? 'text-teal-500 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30'
                : 'text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400'}
            `}
            aria-label={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed' ? <Check size={18} /> : <Circle size={18} />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p 
              className={`
                text-base break-words transition-all duration-200
                ${task.status === 'completed' 
                  ? 'text-gray-500 dark:text-gray-400 line-through' 
                  : 'text-gray-800 dark:text-gray-100'}
              `}
            >
              {task.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              {formatRelativeTime(task.createdAt)}
            </p>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="
            p-1.5 text-gray-400 dark:text-gray-600 rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
          "
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);