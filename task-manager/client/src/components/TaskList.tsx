import type { Task } from '../types';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#9ca3af', padding: '40px 0' }}>
        タスクがありません
      </p>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
