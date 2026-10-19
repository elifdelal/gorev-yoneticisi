import { List, Pencil, Plus, Trash2 } from 'lucide-react'

const FEATURES = [
  {
    title: 'Ekle',
    text: 'Başlık, açıklama, kategori, öncelik ve son tarih ile yeni görev oluştur.',
    icon: Plus,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Listele',
    text: 'Görevleri ara, duruma ve önceliğe göre filtrele.',
    icon: List,
    color: 'from-sky-500 to-cyan-500',
  },
  {
    title: 'Güncelle',
    text: 'Görevi düzenle veya tamamlandı olarak işaretle.',
    icon: Pencil,
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Sil',
    text: 'Onay penceresi ile görevi kalıcı olarak kaldır.',
    icon: Trash2,
    color: 'from-rose-500 to-pink-500',
  },
]

const TECH = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Lucide Icons', 'LocalStorage', 'Netlify']

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
      <section className="animate-fade-in text-center">
        <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          TNC Group · Online Staj Projesi
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Proje{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
            Hakkında
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
          Bu uygulama, web geliştirme eğitiminde öğrenilenleri pekiştirmek için hazırlanmış bir görev
          yöneticisidir. Görevler tarayıcının LocalStorage alanında saklanır; sayfa yenilense bile veriler
          kaybolmaz.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ title, text, icon: Icon, color }) => (
          <div
            key={title}
            className="animate-fade-in rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800"
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${color}`}
            >
              <Icon size={20} />
            </span>
            <h2 className="mt-4 text-lg font-bold">{title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{text}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900 dark:ring-slate-800">
        <h2 className="font-bold">Kullanılan Teknolojiler</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {TECH.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
