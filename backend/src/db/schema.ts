import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const taskStatusEnum = pgEnum("task_status", ["pending", "completed"])

export const taskCategoryEnum = pgEnum("task_category", [
  "Financeiro",
  "Marketing",
  "Vendas",
  "TI",
  "Geral",
])

export const taskPriorityEnum = pgEnum("task_priority", ["Baixa", "Média", "Alta"])

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  status: taskStatusEnum("status").notNull().default("pending"),
  category: taskCategoryEnum("category").notNull().default("Geral"),
  priority: taskPriorityEnum("priority").notNull().default("Média"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
})
