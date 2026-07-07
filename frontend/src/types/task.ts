export type TaskStatus = "pending" | "completed"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: number //Data de criação
}

export type TaskFilterValue = "all" | TaskStatus
