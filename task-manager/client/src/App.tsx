import { useCategories } from './hooks/useCategories';
import { useTasks } from './hooks/useTasks';
import { FilterBar } from './components/FilterBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

export default function App() {
  const { categories } = useCategories();
  const { tasks, filters, setFilters, addTask, toggleComplete, removeTask } = useTasks();

  const pending = tasks.filter(t => t.status === 'pending').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#1f2937' }}>
            タスク管理
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: '#6b7280' }}>
            未完了 {pending} 件 / 完了 {completed} 件
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TaskForm categories={categories} onAdd={addTask} />
          <FilterBar filters={filters} categories={categories} onChange={setFilters} />
          <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={removeTask} />
        </div>
      </div>
    </div>
  );
}
