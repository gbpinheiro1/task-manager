export type TaskStatus = "pending" | "completed"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string //Data de criação (ISO 8601)
}

export type TaskFilterValue = "all" | TaskStatus
