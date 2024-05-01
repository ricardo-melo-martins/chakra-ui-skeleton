import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api'

const HttpClient = axios.create({
  timeout: 20000
})

HttpClient.interceptors.request.use(
  (config) => {
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] =
      `Bearer ${String(sessionStorage.getItem('token'))}`
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default HttpClient
