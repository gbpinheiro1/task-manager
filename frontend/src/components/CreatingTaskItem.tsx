function CreatingTaskItem() {
  return (
    <li className="flex items-center justify-center rounded-xl lgscreen:text-lg border border-gray-800 bg-gray-900 p-4 text-gray-400">
      <span>
        Criando tarefa
        <span className="animate-pulse">...</span>
      </span>
    </li>
  )
}

export default CreatingTaskItem
