import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilters, Priority, Category, Subtask } from '@/types/task';

const STORAGE_KEY = 'advanced-todo-tasks';

const generateId = () => Math.random().toString(36).substring(2, 15);

const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const tasks = JSON.parse(stored);
    // Migrate old tasks without subtasks
    return tasks.map((task: Task) => ({
      ...task,
      subtasks: task.subtasks || [],
    }));
  } catch {
    return [];
  }
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    category: 'all',
    search: '',
  });

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((
    title: string,
    priority: Priority,
    category: Category,
    dueDate?: string,
    description?: string
  ) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: now,
      updatedAt: now,
      subtasks: [],
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  }, []);

  // Subtask methods
  const addSubtask = useCallback((taskId: string, title: string) => {
    const newSubtask: Subtask = {
      id: generateId(),
      title,
      completed: false,
    };
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, subtasks: [...task.subtasks, newSubtask], updatedAt: new Date().toISOString() }
        : task
    ));
  }, []);

  const toggleSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map(st =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st
            ),
            updatedAt: new Date().toISOString(),
          }
        : task
    ));
  }, []);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.filter(st => st.id !== subtaskId),
            updatedAt: new Date().toISOString(),
          }
        : task
    ));
  }, []);

  const updateSubtask = useCallback((taskId: string, subtaskId: string, title: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? {
            ...task,
            subtasks: task.subtasks.map(st =>
              st.id === subtaskId ? { ...st, title } : st
            ),
            updatedAt: new Date().toISOString(),
          }
        : task
    ));
  }, []);

  const reorderTasks = useCallback((startIndex: number, endIndex: number) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;
    if (filters.category !== 'all' && task.category !== filters.category) return false;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(searchLower);
      const matchesDescription = task.description?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesDescription) return false;
    }

    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.completed) return false;
      return new Date(t.dueDate) < new Date();
    }).length,
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    stats,
    addSubtask,
    toggleSubtask,
    deleteSubtask,
    updateSubtask,
  };
};
