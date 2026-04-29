export type Priority = 'High' | 'Medium' | 'Low'
export type FilterValue = 'All' | Priority

export interface Task {
  id: string
  title: string
  priority: Priority
  completed: boolean
}

export interface TasksState {
  tasks: Task[]
  filter: FilterValue
}
