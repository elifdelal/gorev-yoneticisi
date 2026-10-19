import { useEffect, useState } from 'react'
import type { Task, TaskFormData } from '../interfaces/Task'

const STORAGE_KEY = 'tnc-gorevler'

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

// Tüm CRUD işlemleri bu hook içinde toplanır, veriler LocalStorage'da saklanır
export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  // tasks her değiştiğinde LocalStorage'a yaz
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  // EKLE (Create)
  const addTask = (data: TaskFormData) => {
    const now = new Date().toISOString()
    const task: Task = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: now,
      updatedAt: now,
    }
    setTasks((prev) => [task, ...prev])
  }

  // GÜNCELLE (Update)
  const updateTask = (id: string, data: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t)),
    )
  }

  const toggleTask = (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (task) updateTask(id, { completed: !task.completed })
  }

  // SİL (Delete)
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }

  // LİSTELE (Read) -> tasks dizisi
  return { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted }
}
