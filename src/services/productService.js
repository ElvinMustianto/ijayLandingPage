import api from './api.js'

// ✅ Named export
export const getProducts = () => {
  return api.get('/products')
}