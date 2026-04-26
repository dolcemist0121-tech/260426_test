import { Router, Request, Response } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM categories ORDER BY name').all();
  res.json(rows);
});

router.post('/', (req: Request, res: Response) => {
  const { name, color } = req.body as { name?: string; color?: string };
  if (!name?.trim()) {
    res.status(400).json({ error: 'name is required' });
    return;
  }
  try {
    const result = db
      .prepare('INSERT INTO categories (name, color) VALUES (?, ?)')
      .run(name.trim(), color ?? '#6366f1');
    const created = db
      .prepare('SELECT * FROM categories WHERE id = ?')
      .get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch {
    res.status(409).json({ error: 'Category name already exists' });
  }
});

export default router;
