import React, { memo, useState, useCallback } from 'react';
import { Trash2, GripVertical, Check } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import toast, { Toaster } from 'react-hot-toast';

export const TaskItem = memo(({ task, dragHandleProps }) => {
  const { toggleTask, deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    // Add a small delay for animation
    setTimeout(() => {
      deleteTask(task.id);
      toast.success('Task deleted 🗑️');
    }, 150);
  }, [deleteTask, task.id]);

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  return (
    <>
      {/* Toast container (safe to use here too, won't duplicate) */}
      <Toaster position="top-right" reverseOrder={false} />

      <div
        className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
          isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } ${task.completed ? 'opacity-75' : ''}`}
      >
        <div className="flex items-center gap-3">
          <div
            {...dragHandleProps}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <GripVertical size={16} />
          </div>

          <button
            onClick={handleToggle}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
            }`}
            aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed && <Check size={12} />}
          </button>

          <span
            className={`flex-1 transition-all duration-200 ${
              task.completed
                ? 'text-gray-500 dark:text-gray-400 line-through'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {task.text}
          </span>
{/* delete button */}
          <button
            onClick={handleDelete}
            className="flex-shrink-0 p-2 text-red-500 hover:text-red-600 transition-all duration-200"
            aria-label="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </>
  );
});
