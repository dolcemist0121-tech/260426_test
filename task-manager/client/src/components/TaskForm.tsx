import { useState } from 'react';
import type { Category, CreateTaskInput, Priority } from '../types';

interface Props {
  categories: Category[];
  onAdd: (input: CreateTaskInput) => Promise<void>;
}

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  fontSize: 14,
  width: '100%',
  boxSizing: 'border-box',
};

export function TaskForm({ categories, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setTitle(''); setDescription(''); setPriority('medium');
    setDueDate(''); setCategoryId(''); setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
        due_date: dueDate || undefined,
        category_id: categoryId ? Number(categoryId) : undefined,
      });
      reset();
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          padding: '10px 18px',
          background: '#6366f1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        + タスクを追加
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: '#fff',
        borderRadius: 10,
        padding: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <input
        placeholder="タスク名 *"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        autoFocus
        style={inputStyle}
      />
      <textarea
        placeholder="説明（任意）"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)} style={inputStyle}>
          <option value="high">優先度: 高</option>
          <option value="medium">優先度: 中</option>
          <option value="low">優先度: 低</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          style={inputStyle}
        />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={inputStyle}>
          <option value="">カテゴリなし</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: '8px 16px',
            background: '#f3f4f6',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          style={{
            padding: '8px 18px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            opacity: loading || !title.trim() ? 0.6 : 1,
          }}
        >
          {loading ? '追加中...' : '追加'}
        </button>
      </div>
    </form>
  );
}
