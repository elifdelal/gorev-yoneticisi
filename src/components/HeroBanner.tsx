import { CircleCheck, Clock, ListTodo } from 'lucide-react'
import type { Task } from '../interfaces/Task'

const TODAY_TEXT = new Date().toLocaleDateString('tr-TR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

const RADIUS = 42
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// Üstteki renkli karşılama alanı: tarih, özet mesaj, istatistikler ve ilerleme halkası
export default function HeroBanner({ tasks }: { tasks: Task[] }) {
  const total = tasks.length
  const done = tasks.filter((t) => t.completed).length
  const active = total - done
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const message =
    total === 0
      ? 'Henüz görev yok. İlk görevini ekleyerek başla!'
      : active === 0
        ? 'Harika! Tüm görevlerini tamamladın 🎉'
        : `Bugün tamamlanmayı bekleyen ${active} görevin var.`

  const stats = [
    { label: 'Toplam', value: total, icon: ListTodo },
    { label: 'Aktif', value: active, icon: Clock },
    { label: 'Tamamlanan', value: done, icon: CircleCheck },
  ]

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-6 text-white shadow-xl shadow-indigo-500/20 sm:p-8">
      {/* dekoratif daireler */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-white/10" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white/70 capitalize">{TODAY_TEXT}</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Merhaba! 👋</h1>
          <p className="mt-1 text-white/85">{message}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm"
              >
                <Icon size={16} className="text-white/80" />
                <span className="text-lg font-bold">{value}</span>
                <span className="text-xs text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-28 w-28 shrink-0 sm:mx-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgb(255 255 255 / 0.2)" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r={RADIUS}
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-2xl font-extrabold">%{percent}</p>
              <p className="text-[10px] tracking-wider text-white/75 uppercase">İlerleme</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
