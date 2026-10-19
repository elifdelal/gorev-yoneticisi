import { Sparkles, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import FilterBar from '../components/FilterBar'
import HeroBanner from '../components/HeroBanner'
import Modal from '../components/Modal'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'
import type { Task, TaskFilters } from '../interfaces/Task'

const PRIORITY_ORDER = { yuksek: 0, orta: 1, dusuk: 2 }
const DEFAULT_FILTERS: TaskFilters = { search: '', status: 'tumu', priority: 'tumu' }

export default function HomePage() {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted } = useTasks()
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  // LİSTELEME: arama + filtre + sıralama
  const visibleTasks = useMemo(() => {
    const q = filters.search.toLocaleLowerCase('tr')
    return tasks
      .filter((t) => {
        if (filters.status === 'aktif' && t.completed) return false
        if (filters.status === 'tamamlanan' && !t.completed) return false
        if (filters.priority !== 'tumu' && t.priority !== filters.priority) return false
        return (
          t.title.toLocaleLowerCase('tr').includes(q) ||
          t.description.toLocaleLowerCase('tr').includes(q)
        )
      })
      .sort(
        (a, b) =>
          Number(a.completed) - Number(b.completed) ||
          PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
      )
  }, [tasks, filters])

  const doneCount = tasks.filter((t) => t.completed).length
  const counts = { tumu: tasks.length, aktif: tasks.length - doneCount, tamamlanan: doneCount }
  const isFiltered = tasks.length > 0 && JSON.stringify(filters) !== JSON.stringify(DEFAULT_FILTERS)

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <HeroBanner tasks={tasks} />

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        {/* EKLE */}
        <aside>
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 lg:sticky lg:top-24 dark:bg-slate-900 dark:ring-slate-800">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                <Sparkles size={18} />
              </span>
              <div>
                <h2 className="font-bold">Yeni Görev</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Aklındakini hemen ekle</p>
              </div>
            </div>
            <TaskForm submitLabel="Görev Ekle" onSubmit={addTask} />
          </section>
        </aside>

        {/* LİSTELE */}
        <section className="min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Görevlerim</h2>
            {doneCount > 0 && (
              <button
                onClick={clearCompleted}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
              >
                <Trash2 size={14} />
                Bitenleri temizle
              </button>
            )}
          </div>
          <FilterBar filters={filters} counts={counts} onChange={setFilters} />
          <TaskList
            tasks={visibleTasks}
            isFiltered={isFiltered}
            onToggle={toggleTask}
            onEdit={setEditingTask}
            onDelete={setDeletingTask}
          />
        </section>
      </div>

      {/* GÜNCELLEME penceresi */}
      {editingTask && (
        <Modal title="Görevi Düzenle" onClose={() => setEditingTask(null)}>
          <TaskForm
            initialData={{
              title: editingTask.title,
              description: editingTask.description,
              category: editingTask.category,
              priority: editingTask.priority,
              dueDate: editingTask.dueDate,
            }}
            submitLabel="Kaydet"
            onCancel={() => setEditingTask(null)}
            onSubmit={(data) => {
              updateTask(editingTask.id, data)
              setEditingTask(null)
            }}
          />
        </Modal>
      )}

      {/* SİLME onayı */}
      {deletingTask && (
        <Modal title="Görevi Sil" onClose={() => setDeletingTask(null)}>
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400">
              <Trash2 size={20} />
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">"{deletingTask.title}"</strong> görevini
              silmek istediğine emin misin? Bu işlem geri alınamaz.
            </p>
          </div>
          <div className="mt-6 flex gap-2">
            <button
              onClick={() => setDeletingTask(null)}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Vazgeç
            </button>
            <button
              onClick={() => {
                deleteTask(deletingTask.id)
                setDeletingTask(null)
              }}
              className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-700"
            >
              Evet, sil
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
