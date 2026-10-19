import { Search } from 'lucide-react'
import { PRIORITY_LABELS, type StatusFilter, type TaskFilters } from '../interfaces/Task'

interface FilterBarProps {
  filters: TaskFilters
  counts: Record<StatusFilter, number>
  onChange: (filters: TaskFilters) => void
}

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'tumu', label: 'Tümü' },
  { value: 'aktif', label: 'Aktif' },
  { value: 'tamamlanan', label: 'Biten' },
]

const fieldClass =
  'rounded-xl border border-slate-200 bg-white py-2.5 text-sm transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none dark:border-slate-700 dark:bg-slate-900'

export default function FilterBar({ filters, counts, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Görev ara..."
          aria-label="Görev ara"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={`${fieldClass} w-full pr-3 pl-10`}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex flex-1 rounded-xl bg-slate-200/70 p-1 dark:bg-slate-800">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange({ ...filters, status: opt.value })}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                filters.status === opt.value
                  ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {opt.label}
              <span className="rounded-md bg-slate-100 px-1.5 text-[11px] text-slate-500 dark:bg-slate-900/60 dark:text-slate-400">
                {counts[opt.value]}
              </span>
            </button>
          ))}
        </div>

        <select
          aria-label="Önceliğe göre filtrele"
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value as TaskFilters['priority'] })}
          className={`${fieldClass} px-3`}
        >
          <option value="tumu">Tüm öncelikler</option>
          {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
