import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Header />
            
            <main className="mb-8">
              <TaskForm />
              <FilterTabs />
              <TaskList />
            </main>
            
            <footer className="text-center text-gray-500 dark:text-gray-600 text-sm py-4">
              <p>TaskManager App &copy; {new Date().getFullYear()}</p>
            </footer>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;