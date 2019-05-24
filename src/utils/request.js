import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'

const { protocol, host } = location

export const request = axios.create({
  baseURL: `${protocol}//${host}`,
  headers: { 'Content-Type': 'application/json' },
  json: true
})

request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return { ...config }
  },
  error => Promise.reject(error))

request.interceptors.response.use(
  response => response,
  error => {
    switch (error.response.status) {
      case 401:
        console.error({ message: error.response.status + ': ' + error.response.data.error })
        store.commit('LOGOUT')
        break
      case 504:
        console.error({ message: '504: Gateway Time-out' })
        break
      default:
        console.error({ message: error.response.status + ': ' + error.response.data.message })
        break
    }
    return Promise.reject(error.response)
  })
