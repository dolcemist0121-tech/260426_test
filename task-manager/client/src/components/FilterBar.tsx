import type { Category, TaskFilters } from '../types';

interface Props {
  filters: Partial<TaskFilters>;
  categories: Category[];
  onChange: (filters: Partial<TaskFilters>) => void;
}

const selectStyle: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  fontSize: 13,
  background: '#fff',
  cursor: 'pointer',
};

export function FilterBar({ filters, categories, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <select
        value={filters.status ?? ''}
        onChange={e => onChange({ ...filters, status: e.target.value })}
        style={selectStyle}
      >
        <option value="">すべてのステータス</option>
        <option value="pending">未完了</option>
        <option value="completed">完了済み</option>
      </select>

      <select
        value={filters.priority ?? ''}
        onChange={e => onChange({ ...filters, priority: e.target.value })}
        style={selectStyle}
      >
        <option value="">すべての優先度</option>
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>

      <select
        value={filters.category_id ?? ''}
        onChange={e => onChange({ ...filters, category_id: e.target.value })}
        style={selectStyle}
      >
        <option value="">すべてのカテゴリ</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      {(filters.status || filters.priority || filters.category_id) && (
        <button
          onClick={() => onChange({})}
          style={{ ...selectStyle, border: 'none', color: '#6b7280', background: '#f3f4f6' }}
        >
          リセット
        </button>
      )}
    </div>
  );
}
