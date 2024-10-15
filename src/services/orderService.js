import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/orders'

const createOrder = async (data) => await axios.post(API_URL, data, { headers: authHeader() })

const orderService = {
  createOrder,
}

export default orderService
