import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const taskStatusEnum = pgEnum("task_status", ["pending", "completed"])

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  status: taskStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
