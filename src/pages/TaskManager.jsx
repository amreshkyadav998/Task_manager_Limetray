import React, { memo } from 'react';
import { TaskInput } from '../components/forms/TaskInput';
import { FilterButtons } from '../components/filters/FilterButtons';
import { TaskList } from '../components/tasks/TaskList';
import { MainLayout } from '../components/layout/MainLayout';

export const TaskManager = memo(() => {
  return (
    <MainLayout>
      <TaskInput />
      <FilterButtons />
      <TaskList />
    </MainLayout>
  );
});