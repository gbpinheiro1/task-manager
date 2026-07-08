import type { Task } from "../types/task"

interface TaskItemProps {
  task: Task
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
}

function TaskItem({ task, onToggleStatus, onDelete }: TaskItemProps) {
  const isCompleted = task.status === "completed"

  return (
    <li className="flex flex-col gap-3 rounded-xl lgscreen:text-lg border border-gray-800 bg-gray-900 p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`wrap-break-word font-semibold ${
              isCompleted ? "text-gray-500" : "text-white"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`shrink-0 rounded-full border px-2 py-0.5 text-xs lgscreen:text-sm font-medium ${
              isCompleted
                ? "border-gray-800 bg-green-700 text-gray-300"
                : "border-gray-800 bg-amber-700 text-gray-300"
            }`}
          >
            {isCompleted ? "Concluída" : "Pendente"}
          </span>
        </div>
        {task.description && (
          <p
            className={`mt-1 wrap-break-word text-sm lgscreen:text-lg ${
              isCompleted ? "text-gray-600" : "text-gray-300"
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 gap-2 sm:flex-col md:flex-row">
        <button
          type="button"
          onClick={() => onToggleStatus(task.id)}
          className="flex-1 rounded-lg border border-gray-700 px-3 py-1.5 text-sm lgscreen:text-base font-medium text-gray-300 transition-colors hover:border-gray-400 hover:text-white sm:flex-none"
        >
          {isCompleted ? "Reabrir" : "Concluir"}
        </button>
        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="flex-1 rounded-lg border border-gray-700 px-3 py-1.5 text-sm lgscreen:text-lg font-medium text-gray-400 transition-colors hover:border-red-400 hover:text-red-400 sm:flex-none"
        >
          Excluir
        </button>
      </div>
    </li>
  )
}

export default TaskItem
