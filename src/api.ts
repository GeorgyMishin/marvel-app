import axios from 'axios'
import calculatedParams from './utils/calculatedParams'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  params: {
    apikey: process.env.REACT_APP_PUBLIC_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

api.interceptors.request.use((request) => {
  const params = { ...request.params, ...calculatedParams() }

  return {
    ...request,
    params,
  }
})

export default api
