import { configureStore } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)
  try {
    localStorage.setItem('taskManager', JSON.stringify(store.getState().tasks))
  } catch {
    // ignore QuotaExceededError or private-browsing restrictions
  }
  return result
}

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
