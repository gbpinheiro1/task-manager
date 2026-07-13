import type { NewTask, Task, UpdateTask } from "../models/task.model.js"
import type { TaskRepository } from "../repositories/task.repository.js"
import type { GeminiClassifierService } from "./gemini.service.js"

export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`Task with id "${id}" not found`)
    this.name = "TaskNotFoundError"
  }
}

export class TaskService {
  constructor(
    private readonly repository: TaskRepository,
    private readonly classifier: GeminiClassifierService,
  ) {}

  async listTasks(): Promise<Task[]> {
    return this.repository.findAll()
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.repository.findById(id)
    if (!task) throw new TaskNotFoundError(id)
    return task
  }

  async createTask(data: NewTask): Promise<Task> {
    const { category, priority } = await this.classifier.classify(
      data.title,
      data.description ?? "",
    )
    return this.repository.create({ ...data, category, priority })
  }

  async updateTask(id: string, data: UpdateTask): Promise<Task> {
    const task = await this.repository.update(id, data)
    if (!task) throw new TaskNotFoundError(id)
    return task
  }

  async toggleStatus(id: string): Promise<Task> {
    const task = await this.getTaskById(id)
    const status = task.status === "pending" ? "completed" : "pending"
    return this.updateTask(id, { status })
  }

  async deleteTask(id: string): Promise<void> {
    const deleted = await this.repository.delete(id)
    if (!deleted) throw new TaskNotFoundError(id)
  }
}
