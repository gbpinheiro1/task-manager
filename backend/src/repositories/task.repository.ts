import type { NewTask, Task, UpdateTask } from "../models/task.model.js"

export interface TaskRepository {
  findAll(): Promise<Task[]>
  findById(id: string): Promise<Task | null>
  create(data: NewTask): Promise<Task>
  update(id: string, data: UpdateTask): Promise<Task | null>
  delete(id: string): Promise<boolean>
}
