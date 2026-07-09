import type { FastifyInstance } from "fastify"
import type { TaskController } from "../controllers/task.controller.js"

export function taskRoutes(controller: TaskController) {
  return async function routes(app: FastifyInstance) {
    app.get("/tasks", controller.list)
    app.get("/tasks/:id", controller.getById)
    app.post("/tasks", controller.create)
    app.put("/tasks/:id", controller.update)
    app.patch("/tasks/:id/toggle", controller.toggleStatus)
    app.delete("/tasks/:id", controller.delete)
  }
}
