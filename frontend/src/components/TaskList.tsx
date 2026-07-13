import type { Task } from "../types/task"
import CreatingTaskItem from "./CreatingTaskItem"
import TaskItem from "./TaskItem"

interface TaskListProps {
  tasks: Task[]
  isCreating: boolean
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
}

function TaskList({ tasks, isCreating, onToggleStatus, onDelete }: TaskListProps) {
  if (tasks.length === 0 && !isCreating) {
    return (
      <div className="rounded-xl border border-dashed lgscreen:border-2 lgscreen:text-lg border-gray-800 p-8 text-center text-gray-500">
        Nenhuma tarefa encontrada. Adicione uma tarefa para começar.
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {isCreating && <CreatingTaskItem />}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TaskList
