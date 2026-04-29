import { Header } from './components/Header'
import { TaskForm } from './components/TaskForm'
import { FilterBar } from './components/FilterBar'
import { TaskList } from './components/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">
        <TaskForm />
        <FilterBar />
        <TaskList />
      </main>
    </div>
  )
}

export default App
