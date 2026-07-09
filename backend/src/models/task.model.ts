import type { tasks } from "../db/schema.js"

export type Task = typeof tasks.$inferSelect
export type NewTask = typeof tasks.$inferInsert

export type TaskStatus = Task["status"]

export type UpdateTask = Partial<Pick<Task, "title" | "description" | "status">>
