import { useMemo, useState } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import TaskFilter from "./components/TaskFilter"
import TaskList from "./components/TaskList"
import { useTasks } from "./hooks/useTasks"
import type { TaskFilterValue } from "./types/task"

function App() {
  const { tasks, isLoading, error, addTask, toggleStatus, deleteTask } = useTasks()
  const [filter, setFilter] = useState<TaskFilterValue>("all")

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks
    return tasks.filter((task) => task.status === filter)
  }, [tasks, filter])

  return (
    <div className="min-h-screen bg-black">
      <main className="mx-auto max-w-2xl lgscreen:max-w-4xl px-4 py-8 sm:py-12">
        <Header />
        <TaskForm onAdd={addTask} />
        {error && (
          <div className="mb-4 rounded-lg border border-red-800 bg-red-950 px-4 py-2 text-sm text-red-300">
            {error}
          </div>
        )}
        <TaskFilter value={filter} onChange={setFilter} />
        {isLoading ? (
          <p className="text-center text-gray-500">Carregando tarefas...</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleStatus={toggleStatus}
            onDelete={deleteTask}
          />
        )}
      </main>
    </div>
  )
}

export default App
