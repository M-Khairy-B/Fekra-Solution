import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { toggleTask, deleteTask, editTask } from '../redux/tasksSlice'
import type { Task, Priority } from '../types'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { ConfirmModal } from './ui/ConfirmModal'
import { IconCheck, IconPencil, IconTrash } from './icons'

interface TaskItemProps {
  task: Task
}

const PRIORITIES: Priority[] = ['High', 'Medium', 'Low']

export function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editPriority, setEditPriority] = useState<Priority>(task.priority)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function handleSave() {
    if (!editTitle.trim()) return
    dispatch(editTask({ id: task.id, title: editTitle, priority: editPriority }))
    setIsEditing(false)
  }

  function handleCancelEdit() {
    setEditTitle(task.title)
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  function handleConfirmDelete() {
    dispatch(deleteTask(task.id))
  }

  if (isEditing) {
    return (
      <li className="bg-white border border-indigo-200 rounded-2xl shadow-sm p-4 ring-2 ring-indigo-100">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
          />
          <div className="flex items-center gap-2">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit} className="px-3 py-1.5 text-xs">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave} className="px-3 py-1.5 text-xs">
                Save
              </Button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <>
      <li
        className={`bg-white border border-slate-200 rounded-2xl shadow-sm p-4 transition-opacity ${
          task.completed ? 'opacity-70' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => dispatch(toggleTask(task.id))}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
              task.completed
                ? 'bg-indigo-600 border-indigo-600'
                : 'border-slate-300 hover:border-indigo-400'
            }`}
          >
            {task.completed && <IconCheck className="w-3 h-3 text-white" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-medium leading-snug wrap-break-word ${
                task.completed ? 'line-through text-slate-400' : 'text-slate-800'
              }`}
            >
              {task.title}
            </p>
            <div className="mt-1.5">
              <Badge priority={task.priority} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
              className="p-1.5 rounded-lg"
            >
              <IconPencil className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowDeleteModal(true)}
              aria-label="Delete task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
            >
              <IconTrash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </li>

      {showDeleteModal && (
        <ConfirmModal
          title="Delete Task"
          message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}
