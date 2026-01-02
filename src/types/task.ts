export type Priority = 'high' | 'medium' | 'low';
export type Category = 'work' | 'personal' | 'study' | 'health';
export type FilterStatus = 'all' | 'active' | 'completed';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  subtasks: Subtask[];
}

export interface TaskFilters {
  status: FilterStatus;
  category: Category | 'all';
  search: string;
}
