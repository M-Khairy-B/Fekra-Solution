import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { addTask } from '../redux/tasksSlice'
import type { Priority } from '../types'
import { Button } from './ui/Button'
import { IconPlus } from './icons'

const PRIORITIES: Priority[] = ['High', 'Medium', 'Low']

export function TaskForm() {
  const dispatch = useDispatch<AppDispatch>()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('Medium')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Task title cannot be empty.')
      return
    }
    dispatch(addTask({ title, priority }))
    setTitle('')
    setPriority('Medium')
    setError(null)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (error) setError(null)
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-shadow"
            />
          </div>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="px-3 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent cursor-pointer"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p} Priority
              </option>
            ))}
          </select>

          <Button type="submit" variant="primary" className="px-6">
            <IconPlus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {error && (
          <p className="mt-2 text-red-500 text-xs font-medium">{error}</p>
        )}
      </form>
    </div>
  )
}
