import { describe, it, expect, vi } from "vitest"
import { TaskService, TaskNotFoundError } from "./task.service.js"
import type { TaskRepository } from "../repositories/task.repository.js"
import type { Task } from "../models/task.model.js"
import type { GeminiClassifierService } from "./gemini.service.js"

describe("TaskService", () => {
  const mockRepository = {
    findAll: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  } as unknown as TaskRepository

  const mockClassifier = {
    classify: vi.fn().mockResolvedValue({ category: "TI", priority: "Média" }),
  } as unknown as GeminiClassifierService

  const taskService = new TaskService(mockRepository, mockClassifier)

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
      const now = new Date()
      const mockTask: Task = {
        id: "task-1",
        title: "Test Task",
        description: "A test task",
        status: "pending",
        category: "TI",
        priority: "Média",
        createdAt: now,
        updatedAt: now,
      }

      const updatedTask: Task = {
        ...mockTask,
        status: "completed",
        updatedAt: new Date(),
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

      const now = new Date()
      const createdTask: Task = {
        id: "task-2",
        ...newTaskData,
        status: "pending" as const,
        category: "TI" as const,
        priority: "Média" as const,
        createdAt: now,
        updatedAt: now,
      }

      vi.mocked(mockClassifier.classify).mockResolvedValue({
        category: "TI",
        priority: "Média",
      })
      vi.mocked(mockRepository.create).mockResolvedValue(createdTask)

      const result = await taskService.createTask(newTaskData)

      expect(result.id).toBe("task-2")
      expect(result.title).toBe("New Task")
      expect(result.description).toBe("A brand new task")
      expect(result.status).toBe("pending")
      expect(mockClassifier.classify).toHaveBeenCalledWith(
        "New Task",
        "A brand new task",
      )
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...newTaskData,
        category: "TI",
        priority: "Média",
      })
    })
  })
})
