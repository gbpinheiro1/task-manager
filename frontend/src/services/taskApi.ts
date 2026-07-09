import type { Task, TaskStatus } from "../types/task"

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333"

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? `Request failed with status ${response.status}`)
  }

  if (response.status === 204) return undefined as T

  return (await response.json()) as T
}

export function fetchTasks(): Promise<Task[]> {
  return request<Task[]>("/tasks")
}

export function createTask(data: {
  title: string
  description: string
  status: TaskStatus
}): Promise<Task> {
  return request<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export function toggleTaskStatus(id: string): Promise<Task> {
  return request<Task>(`/tasks/${id}/toggle`, { method: "PATCH", body: JSON.stringify({}) })
}

export function deleteTask(id: string): Promise<void> {
  return request<void>(`/tasks/${id}`, { method: "DELETE", body: JSON.stringify({}) })
}
