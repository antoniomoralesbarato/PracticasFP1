import { useTasks } from '../context/TaskContext'
import './Notification.css'

export default function Notification() {
  const { notification } = useTasks()

  if (!notification) return null

  return (
    <div className={`notification notification--${notification.type || 'success'}`}>
      {notification.message}
    </div>
  )
}
