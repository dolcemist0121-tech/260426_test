import type { Task } from '../types';
import { CategoryBadge } from './CategoryBadge';

const PRIORITY_STYLE: Record<string, { color: string; label: string }> = {
  high:   { color: '#ef4444', label: '高' },
  medium: { color: '#f59e0b', label: '中' },
  low:    { color: '#10b981', label: '低' },
};

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const isOverdue =
    task.due_date &&
    task.status !== 'completed' &&
    new Date(task.due_date) < new Date();

  const p = PRIORITY_STYLE[task.priority];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '14px 16px',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        opacity: task.status === 'completed' ? 0.6 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => onToggle(task)}
        style={{ marginTop: 3, cursor: 'pointer', width: 16, height: 16 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: 15,
              textDecoration: task.status === 'completed' ? 'line-through' : 'none',
              color: '#1f2937',
            }}
          >
            {task.title}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: p.color,
              border: `1px solid ${p.color}`,
              borderRadius: 4,
              padding: '1px 5px',
            }}
          >
            {p.label}
          </span>
          {task.category_name && (
            <CategoryBadge name={task.category_name} color={task.category_color ?? '#6366f1'} />
          )}
        </div>
        {task.description && (
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>{task.description}</p>
        )}
        {task.due_date && (
          <p style={{ margin: '4px 0 0', fontSize: 12, color: isOverdue ? '#ef4444' : '#9ca3af' }}>
            {isOverdue ? '期限切れ: ' : '期限: '}
            {new Date(task.due_date).toLocaleDateString('ja-JP')}
          </p>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#d1d5db',
          fontSize: 18,
          lineHeight: 1,
          padding: '0 4px',
        }}
        title="削除"
      >
        ✕
      </button>
    </div>
  );
}
