import axios from 'axios'
import { API_BASE } from '../api.base'

const userApi = axios.create({
  baseURL: `${API_BASE}/users`
})

export const userService = {
  getAll,
  getById,
  create,
  update,
  remove
}

async function getAll() {
  const response = await userApi.get('/')
  return response.data?.data ?? response.data
}

async function getById(id) {
  const response = await userApi.get(`/${id}`)
  return response.data?.data ?? response.data
}

async function create(data) {
  const response = await userApi.post('/', data)
  return response.data?.data ?? response.data
}

async function update(id, data) {
  const response = await userApi.put(`/${id}`, data)
  return response.data?.data ?? response.data
}

async function remove(id) {
  const response = await userApi.delete(`/${id}`)
  return response.data?.data ?? response.data
}
