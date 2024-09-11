import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/cart'

const getAllCartByUserId = async () => await axios.get(API_URL, { headers: authHeader() })

const addToCart = async (data) =>
  await axios.post(API_URL + '/create', data, { headers: authHeader() })

const cartService = {
  getAllCartByUserId,
  addToCart,
}

export default cartService
