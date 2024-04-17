import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MTMzMjgxMzIsImV4cCI6MTcxMzMzMTczMiwibmJmIjoxNzEzMzI4MTMyLCJqdGkiOiJzNWtiZDgzVXNoYnFwdVpsIiwic3ViIjoiNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.biLRSvWJVxfhfRldezPCUlo3NziLu9OJwT6VlBRNXmg';
// const token = JSON.parse(sessionStorage.getItem('token')); getToken()
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const HttpClient = axios.create({
  timeout: 20000
});

HttpClient.interceptors.request.use(
  config => {
    
    config.headers["Accept"] = 'application/json';
    config.headers["Content-Type"] = 'application/json';
    // config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default HttpClient;
