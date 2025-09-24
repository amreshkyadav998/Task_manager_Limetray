import React, { memo, useState, useCallback } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

export const TaskList = memo(() => {
  const { filteredTasks, reorderTasks } = useTasks();
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = useCallback((e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null) return;
    
    const newTasks = [...filteredTasks];
    const draggedTask = newTasks[draggedItem];
    
    newTasks.splice(draggedItem, 1);
    newTasks.splice(dropIndex, 0, draggedTask);
    
    reorderTasks(newTasks);
    setDraggedItem(null);
    setDragOverIndex(null);
  }, [draggedItem, filteredTasks, reorderTasks]);

  if (filteredTasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, index)}
          className={`transition-all duration-200 ${
            draggedItem === index ? 'opacity-50 scale-95' : ''
          } ${
            dragOverIndex === index && draggedItem !== index ? 'transform scale-105' : ''
          }`}
        >
          <TaskItem
            task={task}
            dragHandleProps={{
              onMouseDown: (e) => e.preventDefault()
            }}
          />
        </div>
      ))}
    </div>
  );
});