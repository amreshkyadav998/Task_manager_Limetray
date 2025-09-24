import React, { memo, useMemo } from 'react';
import { useTasks } from '../../contexts/TaskContext';

export const Header = memo(() => {
  const { tasks } = useTasks();
  
  const completedCount = useMemo(() => 
    tasks.filter(task => task.completed).length, [tasks]
  );
  
  const totalCount = tasks.length;

  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Task Manager
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
        </div>
      </div>
    </header>
  );
});