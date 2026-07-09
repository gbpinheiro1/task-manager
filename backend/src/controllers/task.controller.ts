import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import type { TaskService } from "../services/task.service.js"

const idParamSchema = z.object({
  id: z.string().uuid("Invalid task id"),
})

const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().default(""),
  status: z.enum(["pending", "completed"]).default("pending"),
})

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title cannot be empty"),
    description: z.string().trim(),
    status: z.enum(["pending", "completed"]),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  })

export class TaskController {
  constructor(private readonly service: TaskService) {}

  list = async (_request: FastifyRequest, reply: FastifyReply) => {
    const tasks = await this.service.listTasks()
    return reply.send(tasks)
  }

  getById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(request.params)
    const task = await this.service.getTaskById(id)
    return reply.send(task)
  }

  create = async (request: FastifyRequest, reply: FastifyReply) => {
    const data = createTaskSchema.parse(request.body)
    const task = await this.service.createTask(data)
    return reply.status(201).send(task)
  }

  update = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(request.params)
    const data = updateTaskSchema.parse(request.body)
    const task = await this.service.updateTask(id, data)
    return reply.send(task)
  }

  toggleStatus = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(request.params)
    const task = await this.service.toggleStatus(id)
    return reply.send(task)
  }

  delete = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(request.params)
    await this.service.deleteTask(id)
    return reply.status(204).send()
  }
}
