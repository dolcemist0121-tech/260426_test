import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Category } from '../types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  const load = useCallback(async () => {
    const data = await api.getCategories();
    setCategories(data);
  }, []);

  useEffect(() => { load(); }, [load]);

  const addCategory = useCallback(async (name: string, color: string) => {
    await api.createCategory(name, color);
    await load();
  }, [load]);

  return { categories, addCategory, reload: load };
}
