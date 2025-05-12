import React, { createContext, useContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task, TaskFilter, TaskStatus } from '../types';

type TaskContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: TaskFilter;
  addTask: (title: string) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  reorderTasks: (startIndex: number, endIndex: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [activeFilter, setActiveFilter] = useLocalStorage<TaskFilter>('activeFilter', 'all');

  // Add a new task
  const addTask = useCallback((title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      status: 'pending',
      createdAt: new Date()
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }, [setTasks]);

  // Toggle task status between pending and completed
  const toggleTaskStatus = useCallback((id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' } 
          : task
      )
    );
  }, [setTasks]);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  // Set active filter
  const setFilter = useCallback((filter: TaskFilter) => {
    setActiveFilter(filter);
  }, [setActiveFilter]);

  // Reorder tasks (for drag and drop)
  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks(prevTasks => {
      const result = Array.from(prevTasks);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, [setTasks]);

  // Filter tasks based on the active filter
  const filteredTasks = useMemo(() => {
    if (activeFilter === 'all') return tasks;
    return tasks.filter(task => task.status === activeFilter);
  }, [tasks, activeFilter]);

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    activeFilter,
    addTask,
    toggleTaskStatus,
    deleteTask,
    setFilter,
    reorderTasks
  }), [
    tasks, 
    filteredTasks,
    activeFilter, 
    addTask, 
    toggleTaskStatus, 
    deleteTask, 
    setFilter,
    reorderTasks
  ]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};