import { Suspense } from 'react'
import Fallback from './components/Fallback'
import Navbar from './components/navbar/Navbar'
import RouterFabric from './router/RouterFabric'
import { history } from './boot/history'
import { useLocation, useNavigate } from 'react-router-dom'

export default function App() {
  history.navigate = useNavigate()
  history.location = useLocation()

  return (
    <Suspense fallback={<Fallback />}>
      <Navbar />

      <RouterFabric />
    </Suspense>
  )
}
