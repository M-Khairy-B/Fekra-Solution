import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import type { Task, TasksState, Priority, FilterValue } from '../types'

const STORAGE_KEY = 'taskManager'

function loadFromLocalStorage(): TasksState {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY)
    if (!serialized) return { tasks: [], filter: 'All' }
    const parsed = JSON.parse(serialized) as Partial<TasksState>
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      filter: parsed.filter ?? 'All',
    }
  } catch {
    return { tasks: [], filter: 'All' }
  }
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadFromLocalStorage(),
  reducers: {
    addTask(state, action: PayloadAction<{ title: string; priority: Priority }>) {
      const { title, priority } = action.payload
      state.tasks.push({
        id: crypto.randomUUID(),
        title: title.trim(),
        priority,
        completed: false,
      })
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload)
    },

    toggleTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((t) => t.id === action.payload)
      if (task) task.completed = !task.completed
    },

    editTask(
      state,
      action: PayloadAction<{ id: string; title: string; priority: Priority }>
    ) {
      const { id, title, priority } = action.payload
      const task = state.tasks.find((t) => t.id === id)
      if (task) {
        task.title = title.trim()
        task.priority = priority
      }
    },

    setFilter(state, action: PayloadAction<FilterValue>) {
      state.filter = action.payload
    },
  },
})

export const { addTask, deleteTask, toggleTask, editTask, setFilter } =
  tasksSlice.actions

// Selectors
export const selectAllTasks = (state: RootState): Task[] => state.tasks.tasks
export const selectFilter = (state: RootState): FilterValue => state.tasks.filter
export const selectTotalCount = (state: RootState): number => state.tasks.tasks.length
export const selectCompletedCount = (state: RootState): number =>
  state.tasks.tasks.filter((t) => t.completed).length
export const selectFilteredTasks = (state: RootState): Task[] => {
  const { tasks, filter } = state.tasks
  if (filter === 'All') return tasks
  return tasks.filter((t) => t.priority === filter)
}

export default tasksSlice.reducer
