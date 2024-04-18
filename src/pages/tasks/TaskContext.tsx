import React, { createContext, useContext, useEffect, useState } from 'react'
import HttpClient from '../../config/api/httpClient'
import Props from '../../common/types/Props'

export interface Task {
  id: number | null
  name: string
  description: string
  delivery_date: string
  status: string
  finished_at: string
}

export const taskItem: Task = {
  id: null,
  name: '',
  description: '',
  status: 'indefinido',
  delivery_date: '',
  finished_at: ''
}

interface TaskContextData {
  task: Task
  tasks: Task[]
  loading: boolean
  fetchTasks: () => Promise<void>
  addTask: (task: Task) => Promise<void>
  updateTask: (updatedTask: Task) => Promise<void>
  removeTask: (taskId: number) => Promise<void>
  handleChange: (e: { target: { name: any; value: any } }) => void
  setCurrentTask: (taskTo: Task) => void
}

const TaskContext = createContext<TaskContextData | undefined>(undefined)

export const TaskProvider: React.FC<Props> = (props) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState<Task>(taskItem)
  const [loading, setLoading] = useState(false)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await HttpClient.get<Task[]>('/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('fetchTasks error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (addedTask: Task) => {
    try {
      setLoading(true)
      const response = await HttpClient.post('/tasks', addedTask)
      setTasks([...tasks, response.data.task])
    } catch (error) {
      console.error('addTask error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (updatedTask: Task) => {
    try {
      setLoading(true)
      await HttpClient.put(`/tasks/${updatedTask.id}`, updatedTask)
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    } catch (error) {
      console.error('updateTask error:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeTask = async (taskId: number) => {
    try {
      setLoading(true)
      await HttpClient.delete(`/tasks/${taskId}`)
      setTasks(tasks.filter((t) => t.id !== taskId))
    } catch (error) {
      console.error('removeTask error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    updateOneFieldOnTask(name, value)
  }

  const updateOneFieldOnTask = (name: any, value: any) => {
    setTask((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const setCurrentTask = (taskTo: Task) => {
    setTask((prevState) => ({
      ...prevState,
      ...taskTo
    }))
  }

  return (
    <TaskContext.Provider
      value={{
        task,
        tasks,
        addTask,
        updateTask,
        removeTask,
        fetchTasks,
        handleChange,
        loading,
        setCurrentTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask deve ser utilizado dentro de um TaskProvider')
  }
  return context
}
