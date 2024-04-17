import { Routes, Route } from 'react-router-dom'

import TaskListPage from '../pages/tasks/TaskListPage'

export function AdminLayout() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <Routes>
            <Route path="admin/tarefas" element={<TaskListPage />} />
            {/* <Route path="admin/logout" element={<LogoutPage />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  )
}
