import { useSelector } from 'react-redux'
import { selectTotalCount, selectCompletedCount } from '../redux/tasksSlice'
import { IconClipboard } from './icons'

export function Header() {
  const total = useSelector(selectTotalCount)
  const completed = useSelector(selectCompletedCount)

  return (
    <header className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-2xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <IconClipboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-indigo-200 text-xs mt-0.5">Stay organized, stay productive</p>
          </div>
        </div>

        {total > 0 && (
          <div className="bg-white/15 rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-bold leading-none">{completed}/{total}</p>
            <p className="text-indigo-200 text-xs mt-0.5">completed</p>
          </div>
        )}
      </div>
    </header>
  )
}
