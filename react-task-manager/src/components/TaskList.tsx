import { useSelector } from 'react-redux'
import { selectFilteredTasks, selectFilter } from '../redux/tasksSlice'
import { TaskItem } from './TaskItem'
import { IconDocumentList } from './icons'

export function TaskList() {
  const tasks = useSelector(selectFilteredTasks)
  const filter = useSelector(selectFilter)

  if (tasks.length === 0) {
    const message =
      filter === 'All'
        ? 'No tasks yet. Add one above!'
        : `No ${filter} priority tasks.`

    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm py-16 text-center">
        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <IconDocumentList className="w-7 h-7 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">{message}</p>
        {filter === 'All' && (
          <p className="text-slate-400 text-sm mt-1">Your task list is empty.</p>
        )}
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
