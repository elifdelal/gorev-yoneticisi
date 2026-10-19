import { ClipboardList } from 'lucide-react'
import type { Task } from '../interfaces/Task'
import TaskItem from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  isFiltered: boolean
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export default function TaskList({ tasks, isFiltered, onToggle, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex animate-fade-in flex-col items-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-14 text-center dark:border-slate-800">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-100 to-fuchsia-100 text-indigo-500 dark:from-indigo-500/20 dark:to-fuchsia-500/20 dark:text-indigo-300">
          <ClipboardList size={30} />
        </span>
        <p className="mt-4 font-semibold">{isFiltered ? 'Sonuç bulunamadı' : 'Liste bomboş'}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isFiltered
            ? 'Arama veya filtreleri değiştirmeyi dene.'
            : 'Soldaki formdan ilk görevini ekleyebilirsin.'}
        </p>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
