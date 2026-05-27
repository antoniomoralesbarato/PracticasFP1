import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const TaskContext = createContext()

const STORAGE_KEY = 'gestor_tareas_v1'

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [notification, setNotification] = useState(null)

  // Usado para que en el localStorage se guarde y al recargar se haga
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (err) {
      console.error('Error guardando en localStorage:', err)
    }
  }, [tasks])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }


  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
    showNotification('Tarea creada correctamente ✓')
    return newTask
  }


  const updateTask = (id, updates) => {
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, ...updates } : task)
    )
    showNotification('Tarea actualizada correctamente ✓')
  }


  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
    showNotification('Tarea eliminada', 'info')
  }


  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task
        const newStatus = task.status === 'completada' ? 'pendiente' : 'completada'
        return { ...task, status: newStatus }
      })
    )
  }

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleComplete,
      notification,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TaskContext)
  if (!ctx) throw new Error('useTasks must be used inside TaskProvider')
  return ctx
}
