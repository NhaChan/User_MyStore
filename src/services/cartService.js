import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/cart'

const getAllCartByUserId = async () => await axios.get(API_URL, { headers: authHeader() })

const addToCart = async (data) =>
  await axios.post(API_URL + '/create', data, { headers: authHeader() })

const updateQuantity = async (id, quantity) =>
  await axios.put(API_URL + `/update/${id}`, quantity, { headers: authHeader() })

const deleteCart = async (productIds) => {
  const params = new URLSearchParams()
  productIds.forEach((id) => params.append('productId', id))

  return await axios.delete(API_URL + '/delete', {
    params,
    headers: authHeader(),
  })
}

const cartService = {
  getAllCartByUserId,
  addToCart,
  deleteCart,
  updateQuantity,
}

export default cartService
