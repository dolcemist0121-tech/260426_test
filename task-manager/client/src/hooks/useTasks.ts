import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';
import type { CreateTaskInput, Task, TaskFilters } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Partial<TaskFilters>>({});

  const load = useCallback(async () => {
    const data = await api.getTasks(filters);
    setTasks(data);
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const addTask = useCallback(async (input: CreateTaskInput) => {
    await api.createTask(input);
    await load();
  }, [load]);

  const toggleComplete = useCallback(async (task: Task) => {
    await api.updateTask(task.id, {
      status: task.status === 'completed' ? 'pending' : 'completed',
    });
    await load();
  }, [load]);

  const editTask = useCallback(async (id: number, data: Partial<Task>) => {
    await api.updateTask(id, data);
    await load();
  }, [load]);

  const removeTask = useCallback(async (id: number) => {
    await api.deleteTask(id);
    await load();
  }, [load]);

  return { tasks, filters, setFilters, addTask, toggleComplete, editTask, removeTask };
}
