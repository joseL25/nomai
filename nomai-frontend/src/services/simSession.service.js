import axios from 'axios'
import { API_BASE } from '../api.base'

const simSessionApi = axios.create({
  baseURL: `${API_BASE}/sia`
})

export const simSessionService = {
  getAll,
  getById,
  create,
  update,
  remove
}

async function getAll() {
  const response = await simSessionApi.get('/')
  return response.data?.data ?? response.data
}

async function getById(id) {
  const response = await simSessionApi.get(`/${id}`)
  return response.data?.data ?? response.data
}

async function create(data) {
  const response = await simSessionApi.post('/', data)
  return response.data?.data ?? response.data
}

async function update(id, data) {
  const response = await simSessionApi.put(`/${id}`, data)
  return response.data?.data ?? response.data
}

async function remove(id) {
  const response = await simSessionApi.delete(`/${id}`)
  return response.data?.data ?? response.data
}
