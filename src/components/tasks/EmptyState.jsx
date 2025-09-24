import React, { memo } from 'react';
import { Check } from 'lucide-react';

export const EmptyState = memo(() => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 dark:text-gray-500 mb-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <Check size={32} />
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks yet</p>
      <p className="text-gray-400 dark:text-gray-500 text-sm">Add a task above to get started!</p>
    </div>
  );
});
