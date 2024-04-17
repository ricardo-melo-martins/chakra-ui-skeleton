import { lazy, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import AboutPage from '../pages/about/AboutPage'
import RegisterPage from '../pages/auth/RegisterPage'
import TaskListPage from '../pages/tasks/TaskListPage'
import TaskEditPage from '../pages/tasks/TaskEditPage'
import LoginPage from '../pages/auth/LoginPage'
import { AuthLayout } from '../layouts/AuthLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import PrivateRoute from '../components/route/PrivateRoute'
import { AuthContext } from '../config/context/AuthContext'
import Props from '../common/types/Props'

const NotFoundPage = lazy(() => import('../pages/errors/NotFoundPage'))

const routes = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/public/login',
    element: <LoginPage />
  },
  {
    path: '/public/registro',
    element: <RegisterPage />
  },
  {
    path: '/public/sobre',
    element: <AboutPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/404',
    element: <NotFoundPage />
  }
]

const privateRoutes = [
  {
    path: '/admin/tarefas',
    element: <TaskListPage />
  },
  {
    path: '/admin/tarefas/editar',
    element: <TaskEditPage />
  }
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RouterFabric = (props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authenticated } = useContext(AuthContext)

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="admin/*" element={<AdminLayout />} />

        {privateRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/" element={<LoginPage />} />

      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default RouterFabric
