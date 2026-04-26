export type Priority = 'high' | 'medium' | 'low';
export type Status = 'pending' | 'completed';

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  due_date?: string;
  category_id?: number;
  category_name?: string;
  category_color?: string;
  created_at: string;
  updated_at: string;
}

export interface TaskFilters {
  status: string;
  priority: string;
  category_id: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: Priority;
  due_date?: string;
  category_id?: number;
}
