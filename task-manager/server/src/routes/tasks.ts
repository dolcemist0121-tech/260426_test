import { Router, Request, Response } from 'express';
import db from '../db/connection';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { status, priority, category_id } = req.query as Record<string, string>;

  let query = `
    SELECT t.*, c.name AS category_name, c.color AS category_color
    FROM tasks t
    LEFT JOIN categories c ON t.category_id = c.id
  `;
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (status) { conditions.push('t.status = ?'); params.push(status); }
  if (priority) { conditions.push('t.priority = ?'); params.push(priority); }
  if (category_id) { conditions.push('t.category_id = ?'); params.push(Number(category_id)); }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY t.created_at DESC';

  const rows = db.prepare(query).all(...params);
  res.json(rows);
});

router.post('/', (req: Request, res: Response) => {
  const { title, description, priority, due_date, category_id } =
    req.body as {
      title?: string;
      description?: string;
      priority?: string;
      due_date?: string;
      category_id?: number;
    };

  if (!title?.trim()) {
    res.status(400).json({ error: 'title is required' });
    return;
  }

  const result = db
    .prepare(
      `INSERT INTO tasks (title, description, priority, due_date, category_id)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(
      title.trim(),
      description ?? null,
      priority ?? 'medium',
      due_date ?? null,
      category_id ?? null
    );

  const created = db
    .prepare(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = ?`
    )
    .get(result.lastInsertRowid);

  res.status(201).json(created);
});

router.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const allowed = ['title', 'description', 'status', 'priority', 'due_date', 'category_id'] as const;
  type AllowedKey = typeof allowed[number];

  const fields: AllowedKey[] = [];
  const values: unknown[] = [];

  for (const key of allowed) {
    if (key in req.body) {
      fields.push(key);
      values.push((req.body as Record<string, unknown>)[key] ?? null);
    }
  }

  if (!fields.length) {
    res.status(400).json({ error: 'No valid fields to update' });
    return;
  }

  const setClause = [...fields.map(f => `${f} = ?`), "updated_at = datetime('now')"].join(', ');
  db.prepare(`UPDATE tasks SET ${setClause} WHERE id = ?`).run(...values, id);

  const updated = db
    .prepare(
      `SELECT t.*, c.name AS category_name, c.color AS category_color
       FROM tasks t LEFT JOIN categories c ON t.category_id = c.id
       WHERE t.id = ?`
    )
    .get(id);

  if (!updated) { res.status(404).json({ error: 'Task not found' }); return; }
  res.json(updated);
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  if (result.changes === 0) { res.status(404).json({ error: 'Task not found' }); return; }
  res.status(204).send();
});

export default router;
