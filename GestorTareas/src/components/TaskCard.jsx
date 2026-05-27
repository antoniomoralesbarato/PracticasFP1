import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import './TaskCard.css'

const PRIORITY_LABELS = { alta: 'Alta', media: 'Media', baja: 'Baja' }
const STATUS_LABELS = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  completada: 'Completada',
}

function formatDeadline(dateStr) {
  if (!dateStr) return null
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24))

  const formatted = date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  })

  if (diff < 0) return { label: `Venció hace ${Math.abs(diff)} días`, type: 'overdue', formatted }
  if (diff === 0) return { label: 'Vence hoy', type: 'today', formatted }
  if (diff <= 3) return { label: `${diff} días`, type: 'soon', formatted }
  return { label: formatted, type: 'normal', formatted }
}

export default function TaskCard({ task, onEdit }) {
  const { deleteTask, toggleComplete } = useTasks()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const isCompleted = task.status === 'completada'
  const deadline = formatDeadline(task.deadline)

  const handleDelete = () => {
    if (confirmDelete) {
      deleteTask(task.id)
    } else {
      setConfirmDelete(true)
    }
  }

  const handleCancelDelete = () => setConfirmDelete(false)

  return (
    <article className={`task-card priority--${task.priority} ${isCompleted ? 'task-card--done' : ''}`}>
      {/* Prioridad*/}
      <div className="task-stripe" />

      <div className="task-card-inner">
        {/* cabezera */}
        <div className="task-card-head">
          <span className={`badge badge--priority badge--${task.priority}`}>
            {PRIORITY_LABELS[task.priority]}
          </span>
          <span className={`badge badge--status badge--${task.status}`}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>

        {/* titulo */}
        <h3 className={`task-title ${isCompleted ? 'task-title--done' : ''}`}>
          {task.title}
        </h3>

        {/* Descripcion */}
        {task.description && (
          <p className="task-description">
            {task.description.length > 120
              ? task.description.slice(0, 120) + '…'
              : task.description}
          </p>
        )}

        {/* limite */}
        {deadline && (
          <div className={`task-deadline deadline--${deadline.type}`}>
            <span className="deadline-icon"></span>
            {deadline.label}
          </div>
        )}

        {/* Acciones */}
        {confirmDelete ? (
          <div className="task-confirm-delete">
            <span>¿Seguro que quieres eliminar esta tarea?</span>
            <div className="confirm-btns">
              <button className="btn btn--danger-sm" onClick={handleDelete}>
                Eliminar
              </button>
              <button className="btn btn--ghost-sm" onClick={handleCancelDelete}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div className="task-actions">
            <button
              className={`btn btn--complete ${isCompleted ? 'btn--uncomplete' : ''}`}
              onClick={() => toggleComplete(task.id)}
              title={isCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
            >
              {isCompleted ? ' -> Reabrir' : ' OK Completar'}
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => onEdit(task)}
              title="Editar tarea"
            >
              Editar
            </button>
            <button
              className="btn btn--danger"
              onClick={handleDelete}
              title="Eliminar tarea"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
