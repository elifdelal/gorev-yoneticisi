import { Plus } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import {
  CATEGORIES,
  CATEGORY_EMOJIS,
  PRIORITY_LABELS,
  type Priority,
  type TaskFormData,
} from '../interfaces/Task'

interface TaskFormProps {
  initialData?: TaskFormData
  submitLabel: string
  onSubmit: (data: TaskFormData) => void
  onCancel?: () => void
}

const EMPTY_FORM: TaskFormData = {
  title: '',
  description: '',
  category: CATEGORIES[0],
  priority: 'orta',
  dueDate: '',
}

const PRIORITY_ACTIVE: Record<Priority, string> = {
  dusuk: 'bg-emerald-500 text-white shadow-emerald-500/30',
  orta: 'bg-amber-500 text-white shadow-amber-500/30',
  yuksek: 'bg-rose-500 text-white shadow-rose-500/30',
}

const labelClass = 'mb-1.5 block text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400'
const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-800'

// Hem "Ekle" hem de "Güncelle" işleminde aynı form kullanılır
export default function TaskForm({ initialData, submitLabel, onSubmit, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(initialData ?? EMPTY_FORM)
  const [error, setError] = useState('')
  const uid = useId() // sayfada iki form olduğunda id çakışmasın

  const handleChange = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (form.title.trim().length < 3) {
      setError('Görev başlığı en az 3 karakter olmalı.')
      return
    }
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim() })
    setError('')
    if (!initialData) setForm(EMPTY_FORM)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={`${uid}-title`} className={labelClass}>
          Başlık *
        </label>
        <input
          id={`${uid}-title`}
          className={`${inputClass} ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500/15' : ''}`}
          placeholder="Örn: Proje raporunu hazırla"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        {error && <p className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">{error}</p>}
      </div>

      <div>
        <label htmlFor={`${uid}-description`} className={labelClass}>
          Açıklama
        </label>
        <textarea
          id={`${uid}-description`}
          rows={2}
          className={`${inputClass} resize-none`}
          placeholder="İsteğe bağlı detaylar"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div>
        <span className={labelClass}>Öncelik</span>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Öncelik">
          {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={form.priority === p}
              onClick={() => handleChange('priority', p)}
              className={`rounded-xl px-2 py-2 text-sm font-semibold transition ${
                form.priority === p
                  ? `${PRIORITY_ACTIVE[p]} shadow-md`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {PRIORITY_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={`${uid}-category`} className={labelClass}>
            Kategori
          </label>
          <select
            id={`${uid}-category`}
            className={inputClass}
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_EMOJIS[c]} {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-dueDate`} className={labelClass}>
            Son Tarih
          </label>
          <input
            id={`${uid}-dueDate`}
            type="date"
            className={inputClass}
            value={form.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Vazgeç
          </button>
        )}
        <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 active:scale-[0.98]"
        >
          {!initialData && <Plus size={18} />}
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
