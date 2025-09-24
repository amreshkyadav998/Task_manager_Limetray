import React from 'react';
import { TaskProvider } from '././contexts/TaskContext';
import { TaskManager } from './pages/TaskManager';

const App = () => {
  return (
      <TaskProvider>
        <TaskManager />
      </TaskProvider>
  );
};

export default App;