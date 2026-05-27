import { useTasks } from '../context/TaskContext'
import './Header.css'

export default function Header({ onCreateTask }) {
  const { tasks } = useTasks()

  const pending = tasks.filter(t => t.status === 'pendiente').length
  const inProgress = tasks.filter(t => t.status === 'en_progreso').length
  const done = tasks.filter(t => t.status === 'completada').length

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <h1 className="header-title">GestorTareas</h1>
        </div>

        <div className="header-stats">
          <div className="stat">
            <span className="stat-value">{tasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat">
            <span className="stat-value" style={{ color: 'var(--status-pending)' }}>{pending}</span>
            <span className="stat-label">Pendientes</span>
          </div>
          <div className="stat">
            <span className="stat-value" style={{ color: 'var(--status-progress)' }}>{inProgress}</span>
            <span className="stat-label">En progreso</span>
          </div>
          <div className="stat">
            <span className="stat-value" style={{ color: 'var(--status-done)' }}>{done}</span>
            <span className="stat-label">Completadas</span>
          </div>
        </div>

        <button className="btn-create" onClick={onCreateTask}>
          <span>+</span> Nueva tarea
        </button>
      </div>
    </header>
  )
}
