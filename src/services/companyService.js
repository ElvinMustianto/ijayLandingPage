import api from './api.js'

// ✅ Named export — TIDAK ADA `default`
export const getCompanies = () => {
  return api.get('/companies')
}