import { CalendarDays, Check, Pencil, Trash2 } from 'lucide-react'
import { CATEGORY_EMOJIS, PRIORITY_LABELS, type Priority, type Task } from '../interfaces/Task'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const PRIORITY_STYLES: Record<Priority, { bar: string; badge: string }> = {
  dusuk: {
    bar: 'bg-emerald-400',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300',
  },
  orta: {
    bar: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300',
  },
  yuksek: {
    bar: 'bg-rose-500',
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-300',
  },
}

// yerel saatle YYYY-MM-DD (sayfa yüklendiğinde hesaplanır)
const today = new Date().toLocaleDateString('sv-SE')

function formatDate(date: string) {
  return new Date(date + 'T00:00:00').toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const isOverdue = !task.completed && task.dueDate !== '' && task.dueDate < today
  const isToday = !task.completed && task.dueDate === today
  const style = PRIORITY_STYLES[task.priority]

  return (
    <li
      className={`group relative flex animate-fade-in gap-3 overflow-hidden rounded-2xl bg-white p-4 pl-5 shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:bg-slate-900 dark:ring-slate-800 dark:hover:shadow-black/30 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      {/* önceliği gösteren renkli sol şerit */}
      <span className={`absolute inset-y-0 left-0 w-1.5 ${task.completed ? 'bg-slate-300 dark:bg-slate-700' : style.bar}`} />

      <button
        role="checkbox"
        aria-checked={task.completed}
        aria-label="Tamamlandı olarak işaretle"
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
          task.completed
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-slate-300 text-transparent hover:border-indigo-500 hover:text-indigo-300 dark:border-slate-600'
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-semibold break-words ${
            task.completed ? 'text-slate-400 line-through dark:text-slate-500' : ''
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-0.5 text-sm break-words text-slate-500 dark:text-slate-400">{task.description}</p>
        )}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-2.5 py-0.5 font-semibold ring-1 ring-inset ${style.badge}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {CATEGORY_EMOJIS[task.category] ?? '📌'} {task.category}
          </span>
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 font-medium ${
                isOverdue
                  ? 'text-rose-600 dark:text-rose-400'
                  : isToday
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <CalendarDays size={13} />
              {formatDate(task.dueDate)}
              {isOverdue && ' · Gecikti'}
              {isToday && ' · Bugün'}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-start gap-1 transition sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
        <button
          onClick={() => onEdit(task)}
          aria-label="Düzenle"
          title="Düzenle"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(task)}
          aria-label="Sil"
          title="Sil"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  )
}
