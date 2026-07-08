import { useMemo, useState } from "react"
import Header from "./components/Header"
import TaskForm from "./components/TaskForm"
import TaskFilter from "./components/TaskFilter"
import TaskList from "./components/TaskList"
import { useTasks } from "./hooks/useTasks"
import type { TaskFilterValue } from "./types/task"

function App() {
  const { tasks, addTask, toggleStatus, deleteTask } = useTasks()
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
        <TaskFilter value={filter} onChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggleStatus={toggleStatus}
          onDelete={deleteTask}
        />
      </main>
    </div>
  )
}

export default App
