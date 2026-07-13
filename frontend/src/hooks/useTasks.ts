import { useEffect, useState } from "react"
import * as taskApi from "../services/taskApi"
import type { Task, TaskStatus } from "../types/task"

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    taskApi
      .fetchTasks()
      .then((data) => {
        if (!cancelled) setTasks(data)
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err, "Erro ao carregar tarefas"))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function addTask(title: string, description: string, status: TaskStatus) {
    setIsCreating(true)
    try {
      const task = await taskApi.createTask({ title, description, status })
      setTasks((prev) => [task, ...prev])
    } catch (err) {
      setError(getErrorMessage(err, "Erro ao criar tarefa"))
    } finally {
      setIsCreating(false)
    }
  }

  async function toggleStatus(id: string) {
    try {
      const updated = await taskApi.toggleTaskStatus(id)
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)))
    } catch (err) {
      setError(getErrorMessage(err, "Erro ao atualizar tarefa"))
    }
  }

  async function deleteTask(id: string) {
    try {
      await taskApi.deleteTask(id)
      setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch (err) {
      setError(getErrorMessage(err, "Erro ao excluir tarefa"))
    }
  }

  return { tasks, isLoading, isCreating, error, addTask, toggleStatus, deleteTask }
}
