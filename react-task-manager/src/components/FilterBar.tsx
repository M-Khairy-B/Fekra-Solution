import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { selectFilter, setFilter } from '../redux/tasksSlice'
import type { FilterValue, Priority } from '../types'
import { Button } from './ui/Button'

const FILTERS: FilterValue[] = ['All', 'High', 'Medium', 'Low']

const DOT_COLORS: Record<Priority, string> = {
  High:   'bg-red-500',
  Medium: 'bg-yellow-500',
  Low:    'bg-green-500',
}

export function FilterBar() {
  const dispatch = useDispatch<AppDispatch>()
  const activeFilter = useSelector(selectFilter)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
        Filter:
      </span>
      {FILTERS.map((f) => {
        const isActive = f === activeFilter
        return (
          <Button
            key={f}
            variant={isActive ? 'active' : 'outline'}
            onClick={() => dispatch(setFilter(f))}
            className="px-3 py-1.5 text-xs"
          >
            {f !== 'All' && (
              <span className={`w-2 h-2 rounded-full ${DOT_COLORS[f as Priority]}`} />
            )}
            {f}
          </Button>
        )
      })}
    </div>
  )
}
