import { desc, eq } from "drizzle-orm"
import { db } from "../db/index.js"
import { tasks } from "../db/schema.js"
import type { NewTask, Task, UpdateTask } from "../models/task.model.js"
import type { TaskRepository } from "./task.repository.js"

export class DrizzleTaskRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    return db.select().from(tasks).orderBy(desc(tasks.createdAt))
  }

  async findById(id: string): Promise<Task | null> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id))
    return task ?? null
  }

  async create(data: NewTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(data).returning()
    return task
  }

  async update(id: string, data: UpdateTask): Promise<Task | null> {
    const [task] = await db
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning()
    return task ?? null
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning({ id: tasks.id })
    return deleted.length > 0
  }
}
