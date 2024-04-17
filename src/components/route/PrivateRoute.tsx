import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../config/context/AuthContext'
import { useContext } from 'react'

const PrivateRoute = () => {
  const { authenticated } = useContext(AuthContext)

  if (!authenticated) return <Navigate to="/public/login" replace />

  return <Outlet />
}

export default PrivateRoute
