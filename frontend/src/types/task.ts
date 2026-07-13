export type TaskStatus = "pending" | "completed"
export type TaskCategory = "Financeiro" | "Marketing" | "Vendas" | "TI" | "Geral"
export type TaskPriority = "Baixa" | "Média" | "Alta"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  category: TaskCategory
  priority: TaskPriority
  createdAt: string //Data de criação (ISO 8601)
}

export type TaskFilterValue = "all" | TaskStatus
