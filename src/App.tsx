import { Suspense } from 'react'
import Fallback from './components/Fallback'
import Navbar from './components/navbar/Navbar'
import RouterFabric from './router/RouterFabric'
import { history } from './boot/navigator/history'
import { useLocation, useNavigate } from 'react-router-dom'
import { TaskProvider } from './pages/tasks/TaskContext'

export default function App() {
  history.navigate = useNavigate()
  history.location = useLocation()

  return (
    <TaskProvider>
      <Suspense fallback={<Fallback />}>
        <Navbar />

        <RouterFabric />
      </Suspense>
    </TaskProvider>
  )
}
