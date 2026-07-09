import { describe, it, expect, vi } from "vitest"
import { TaskService, TaskNotFoundError } from "./task.service.js"
import type { TaskRepository } from "../repositories/task.repository.js"
import type { Task } from "../models/task.model.js"

describe("TaskService", () => {
  const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as TaskRepository

  const taskService = new TaskService(mockRepository)

  describe("getTaskById", () => {
    it("should throw TaskNotFoundError when task does not exist", async () => {
      vi.mocked(mockRepository.findById).mockResolvedValue(null)

      await expect(taskService.getTaskById("non-existent-id")).rejects.toThrow(
        TaskNotFoundError,
      )
      expect(mockRepository.findById).toHaveBeenCalledWith("non-existent-id")
    })
  })

  describe("toggleStatus", () => {
    it("should toggle task status from pending to completed", async () => {
      const mockTask: Task = {
        id: "task-1",
        title: "Test Task",
        description: "A test task",
        status: "pending",
        createdAt: new Date(),
      }

      const updatedTask: Task = {
        ...mockTask,
        status: "completed",
      }

      vi.mocked(mockRepository.findById).mockResolvedValue(mockTask)
      vi.mocked(mockRepository.update).mockResolvedValue(updatedTask)

      const result = await taskService.toggleStatus("task-1")

      expect(result.status).toBe("completed")
      expect(mockRepository.findById).toHaveBeenCalledWith("task-1")
      expect(mockRepository.update).toHaveBeenCalledWith("task-1", {
        status: "completed",
      })
    })
  })

  describe("createTask", () => {
    it("should create a task with provided data", async () => {
      const newTaskData = {
        title: "New Task",
        description: "A brand new task",
      }

      const createdTask: Task = {
        id: "task-2",
        ...newTaskData,
        status: "pending" as const,
        createdAt: new Date(),
      }

      vi.mocked(mockRepository.create).mockResolvedValue(createdTask)

      const result = await taskService.createTask(newTaskData)

      expect(result.id).toBe("task-2")
      expect(result.title).toBe("New Task")
      expect(result.description).toBe("A brand new task")
      expect(result.status).toBe("pending")
      expect(mockRepository.create).toHaveBeenCalledWith(newTaskData)
    })
  })
})
