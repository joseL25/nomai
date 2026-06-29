import axios from 'axios'

const simSessionApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    'Content-Type': 'application/json'
  }
})

export const simSessionService = {
  getAll,
  getById,
  create,
  update,
  remove
}

async function getAll() {
  const response = await simSessionApi.get('/sia')
  return response.data?.data ?? response.data
}

async function getById(id) {
  const response = await simSessionApi.get(`/sia/${id}`)
  return response.data?.data ?? response.data
}

async function create(data) {
  const response = await simSessionApi.post('/sia', data)
  return response.data?.data ?? response.data
}

async function update(id, data) {
  const response = await simSessionApi.put(`/sia/${id}`, data)
  return response.data?.data ?? response.data
}

async function remove(id) {
  const response = await simSessionApi.delete(`/sia/${id}`)
  return response.data?.data ?? response.data
}
