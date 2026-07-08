import type { TaskFilterValue } from "../types/task"

interface TaskFilterProps {
  value: TaskFilterValue
  onChange: (value: TaskFilterValue) => void
}

const OPTIONS: { value: TaskFilterValue; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "completed", label: "Concluídas" },
]

function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full border px-4 py-1.5 text-sm lgscreen:text-lg font-medium transition-colors ${
            value === option.value
              ? "border-white bg-white text-black"
              : "border-gray-700 bg-transparent text-gray-400 hover:border-gray-500 hover:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter
