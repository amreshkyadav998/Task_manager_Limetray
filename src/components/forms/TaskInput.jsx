import React, { memo, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import toast, { Toaster } from 'react-hot-toast';

export const TaskInput = memo(() => {
  const [input, setInput] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = useCallback(() => {
    if (!input.trim()) {
      toast.error('Please enter a task');
      return;
    }

    if (input.trim().length < 3) {
      toast.error('Task must be at least 3 characters long');
      return;
    }

    addTask(input);
    toast.success('Task added successfully ✅');
    setInput('');
  }, [input, addTask]);

  const handleInputChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="mb-6">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-800"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
          disabled={!input.trim()}
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>
    </div>
  );
});
