import type { Category, CreateTaskInput, Task, TaskFilters } from '../types';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error: string }).error);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  getTasks: (filters: Partial<TaskFilters>) => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.priority) params.set('priority', filters.priority);
    if (filters.category_id) params.set('category_id', filters.category_id);
    const qs = params.toString();
    return request<Task[]>(`/api/tasks${qs ? `?${qs}` : ''}`);
  },

  createTask: (data: CreateTaskInput) =>
    request<Task>('/api/tasks', { method: 'POST', body: JSON.stringify(data) }),

  updateTask: (id: number, data: Partial<Task>) =>
    request<Task>(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteTask: (id: number) =>
    request<void>(`/api/tasks/${id}`, { method: 'DELETE' }),

  getCategories: () => request<Category[]>('/api/categories'),

  createCategory: (name: string, color: string) =>
    request<Category>('/api/categories', { method: 'POST', body: JSON.stringify({ name, color }) }),
};
