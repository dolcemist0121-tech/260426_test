import db from './connection';

export function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id    INTEGER PRIMARY KEY AUTOINCREMENT,
      name  TEXT NOT NULL UNIQUE,
      color TEXT NOT NULL DEFAULT '#6366f1'
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT NOT NULL,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'pending'
                  CHECK(status IN ('pending','completed')),
      priority    TEXT NOT NULL DEFAULT 'medium'
                  CHECK(priority IN ('high','medium','low')),
      due_date    TEXT,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      created_at  TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );

    INSERT OR IGNORE INTO categories (name, color) VALUES
      ('Work',     '#3b82f6'),
      ('Personal', '#10b981'),
      ('Urgent',   '#ef4444');
  `);
}
