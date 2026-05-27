import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'
import './TaskList.css'

const PRIORITY_ORDER = { alta: 3, media: 2, baja: 1 }

function applyFiltersAndSort(tasks, { status, priority, sortBy }) {
  let result = [...tasks]


  if (status !== 'todas') {
    result = result.filter(t => t.status === status)
  }


  if (priority !== 'todas') {
    result = result.filter(t => t.priority === priority)
  }

  result.sort((a, b) => {
    switch (sortBy) {
      case 'createdAt_desc':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'createdAt_asc':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'deadline_asc': {
        if (!a.deadline && !b.deadline) return 0
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(a.deadline) - new Date(b.deadline)
      }
      case 'priority_desc':
        return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
      case 'priority_asc':
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
      case 'title_asc':
        return a.title.localeCompare(b.title, 'es')
      case 'title_desc':
        return b.title.localeCompare(a.title, 'es')
      default:
        return 0
    }
  })

  return result
}

export default function TaskList({ filters, onEditTask }) {
  const { tasks } = useTasks()
  const filtered = applyFiltersAndSort(tasks, filters)

  if (tasks.length === 0) {
    return (
      <div className="tasklist-empty">
        <h3>No hay tareas todavía</h3>
        <p>Pulsa "Nueva tarea" para empezar a organizar tu trabajo.</p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="tasklist-empty">
        <h3>Sin resultados</h3>
        <p>No hay tareas que coincidan con los filtros seleccionados.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="tasklist-count">
        {filtered.length} {filtered.length === 1 ? 'tarea' : 'tareas'}
        {filtered.length !== tasks.length && ` de ${tasks.length}`}
      </p>
      <div className="tasklist-grid">
        {filtered.map(task => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} />
        ))}
      </div>
    </div>
  )
}
