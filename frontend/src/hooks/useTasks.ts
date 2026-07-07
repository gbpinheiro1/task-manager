import { useEffect, useState } from "react"
import type { Task, TaskStatus } from "../types/task"

const STORAGE_KEY = "task-manager:tasks"

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Task[]) : []
  } catch {
    return []
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(title: string, description: string, status: TaskStatus) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      createdAt: Date.now(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  function toggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task,
      ),
    )
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return { tasks, addTask, toggleStatus, deleteTask }
}
