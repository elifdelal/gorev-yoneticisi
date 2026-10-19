// Uygulamada kullanılan veri tipleri (TypeScript interface'leri)

export type Priority = 'dusuk' | 'orta' | 'yuksek'

export interface Task {
  id: string
  title: string
  description: string
  category: string
  priority: Priority
  dueDate: string // YYYY-MM-DD, boş olabilir
  completed: boolean
  createdAt: string
  updatedAt: string
}

// Formdan gelen veri: id ve tarih alanlarını uygulama kendisi üretir
export type TaskFormData = Omit<Task, 'id' | 'completed' | 'createdAt' | 'updatedAt'>

export type StatusFilter = 'tumu' | 'aktif' | 'tamamlanan'

export interface TaskFilters {
  search: string
  status: StatusFilter
  priority: Priority | 'tumu'
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  dusuk: 'Düşük',
  orta: 'Orta',
  yuksek: 'Yüksek',
}

export const CATEGORIES = ['İş', 'Okul', 'Kişisel', 'Alışveriş', 'Diğer']

export const CATEGORY_EMOJIS: Record<string, string> = {
  İş: '💼',
  Okul: '📚',
  Kişisel: '🌱',
  Alışveriş: '🛒',
  Diğer: '✨',
}
