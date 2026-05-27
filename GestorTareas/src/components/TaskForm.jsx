import { useState, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'
import './TaskForm.css'

const INITIAL_FORM = {
  title: '',
  description: '',
  priority: 'media',
  status: 'pendiente',
  deadline: '',
}

export default function TaskForm({ task, onClose }) {
  const { addTask, updateTask } = useTasks()
  const isEditing = !!task

  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  // Auto relleno
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'media',
        status: task.status || 'pendiente',
        deadline: task.deadline || '',
      })
    } else {
      setForm(INITIAL_FORM)
    }
  }, [task])

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) {
      newErrors.title = 'El título es obligatorio'
    } else if (form.title.trim().length > 100) {
      newErrors.title = 'El título no puede superar los 100 caracteres'
    }
    if (form.description.length > 500) {
      newErrors.description = 'La descripción no puede superar los 500 caracteres'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      status: form.status,
      deadline: form.deadline || null,
    }

    if (isEditing) {
      updateTask(task.id, data)
    } else {
      addTask(data)
    }
    onClose()
  }


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2 className="modal-title">
            {isEditing ? 'Editar tarea' : 'Nueva tarea'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* titulo */}
          <div className="field">
            <label className="field-label" htmlFor="title">
              Título <span className="required">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              className={`field-input ${errors.title ? 'field-input--error' : ''}`}
              placeholder="¿Qué hay que hacer?"
              maxLength={110}
              autoFocus
            />
            <div className="field-footer">
              {errors.title
                ? <span className="field-error">{errors.title}</span>
                : <span />
              }
              <span className={`char-count ${form.title.length > 90 ? 'char-count--warn' : ''}`}>
                {form.title.length}/100
              </span>
            </div>
          </div>

          {/* descripcion */}
          <div className="field">
            <label className="field-label" htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={`field-textarea ${errors.description ? 'field-input--error' : ''}`}
              placeholder="Añade más detalles (opcional)..."
              rows={3}
            />
            <div className="field-footer">
              {errors.description
                ? <span className="field-error">{errors.description}</span>
                : <span />
              }
              <span className={`char-count ${form.description.length > 450 ? 'char-count--warn' : ''}`}>
                {form.description.length}/500
              </span>
            </div>
          </div>

          {/* prioridad y barra de estaddos */}
          <div className="field-row">
            <div className="field">
              <label className="field-label" htmlFor="priority">Prioridad</label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="field-select"
              >
                <option value="alta"> Alta</option>
                <option value="media"> Media</option>
                <option value="baja"> Baja</option>
              </select>
            </div>

            <div className="field">
              <label className="field-label" htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="field-select"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>
          </div>

          {/* fecha limite */}
          <div className="field">
            <label className="field-label" htmlFor="deadline">Fecha límite</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              className="field-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* aaciones */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? 'Guardar cambios' : 'Crear tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
