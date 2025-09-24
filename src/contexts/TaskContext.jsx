import React, { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

// Task Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now().toString(),
          text: action.payload,
          completed: false,
          createdAt: new Date().toISOString()
        }]
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'REORDER_TASKS':
      return {
        ...state,
        tasks: action.payload
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: storedTasks,
    filter: 'all'
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks, setStoredTasks]);

  const addTask = useCallback((text) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TASK', payload: text.trim() });
    }
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, []);

  const reorderTasks = useCallback((tasks) => {
    dispatch({ type: 'REORDER_TASKS', payload: tasks });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'completed':
        return state.tasks.filter(task => task.completed);
      case 'pending':
        return state.tasks.filter(task => !task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  const value = useMemo(() => ({
    tasks: state.tasks,
    filteredTasks,
    filter: state.filter,
    addTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    setFilter
  }), [state.tasks, filteredTasks, state.filter, addTask, toggleTask, deleteTask, reorderTasks, setFilter]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};