import { useState } from 'react'
import { TaskProvider } from './context/TaskContext'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import Notification from './components/Notification'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filters, setFilters] = useState({
    status: 'todas',
    priority: 'todas',
    sortBy: 'createdAt_desc',
  })

  const handleOpenCreate = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  return (
    <TaskProvider>
      <div className="app-layout">
        <Header onCreateTask={handleOpenCreate} />

        <main className="main-content">
          <FilterBar filters={filters} setFilters={setFilters} />
          <TaskList
            filters={filters}
            onEditTask={handleEdit}
          />
        </main>

        {showForm && (
          <TaskForm
            task={editingTask}
            onClose={handleCloseForm}
          />
        )}

        <Notification />
      </div>
    </TaskProvider>
  )
}

export default App
