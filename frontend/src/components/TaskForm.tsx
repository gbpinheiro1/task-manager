import { useState } from "react"
import type { SubmitEvent } from "react"
import type { TaskStatus } from "../types/task"

interface TaskFormProps {
  onAdd: (title: string, description: string, status: TaskStatus) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState<TaskStatus>("pending")

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    if (!title.trim()) return

    onAdd(title.trim(), description.trim(), status)
    setTitle("")
    setDescription("")
    setStatus("pending")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl border border-gray-800 bg-gray-900 p-4 sm:p-6"
    >
      <div className="flex flex-col gap-4 lgscreen:gap-6">
        <div>
          <label
            htmlFor="title"
            className="mb-1 lgscreen:mb-2 block text-sm lgscreen:text-lg font-medium text-gray-300"
          >
            Título
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Estudar React"
            className="w-full lgscreen:text-lg rounded-lg border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-600 outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm lgscreen:text-lg font-medium text-gray-300"
          >
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes da tarefa"
            rows={3}
            className="w-full resize-none rounded-lg border lgscreen:text-lg border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-600 outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <span className="mb-1 lgscreen:mb-2 block text-sm lgscreen:text-lg font-medium text-gray-300">
            Status
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStatus("pending")}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium lgscreen:text-lg transition-colors hover:cursor-pointer sm:flex-none ${
                status === "pending"
                  ? "bg-white text-black"
                  : "border-gray-700 bg-black text-gray-400 hover:border-gray-500"
              }`}
            >
              Pendente
            </button>
            <button
              type="button"
              onClick={() => setStatus("completed")}
              className={`flex-1 rounded-lg hover:cursor-pointer border px-3 py-2 text-sm lgscreen:text-lg font-medium transition-colors sm:flex-none ${
                status === "completed"
                  ? " bg-white text-black"
                  : "border-gray-700 bg-black text-gray-400 hover:border-gray-500"
              }`}
            >
              Concluída
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!title.trim()}
          className="mt-2 w-full rounded-lg hover:cursor-pointer bg-white px-3 py-2 font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:self-end lgscreen:text-lg"
        >
          Adicionar Tarefa
        </button>
      </div>
    </form>
  )
}

export default TaskForm
