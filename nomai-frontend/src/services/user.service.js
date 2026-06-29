import axios from 'axios'

const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    'Content-Type': 'application/json'
  }
})

export const userService = {
  getAll,
  getById,
  create,
  update,
  remove
}

async function getAll() {
  const response = await userApi.get('/users')
  return response.data?.data ?? response.data
}

async function getById(id) {
  const response = await userApi.get(`/users/${id}`)
  return response.data?.data ?? response.data
}

async function create(data) {
  const response = await userApi.post('/users', data)
  return response.data?.data ?? response.data
}

async function update(id, data) {
  const response = await userApi.put(`/users/${id}`, data)
  return response.data?.data ?? response.data
}

async function remove(id) {
  const response = await userApi.delete(`/users/${id}`)
  return response.data?.data ?? response.data
}
