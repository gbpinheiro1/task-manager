import cors from "@fastify/cors"
import Fastify from "fastify"
import { ZodError } from "zod"
import { TaskController } from "./controllers/task.controller.js"
import { DrizzleTaskRepository } from "./repositories/drizzle-task.repository.js"
import { taskRoutes } from "./routes/task.routes.js"
import { TaskNotFoundError, TaskService } from "./services/task.service.js"

export async function buildApp() {
  const app = Fastify({ logger: true })

  await app.register(cors, { origin: true })

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      })
    }

    if (error instanceof TaskNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    app.log.error(error)
    return reply.status(500).send({ message: "Internal server error" })
  })

  const taskRepository = new DrizzleTaskRepository()
  const taskService = new TaskService(taskRepository)
  const taskController = new TaskController(taskService)

  await app.register(taskRoutes(taskController))

  return app
}
