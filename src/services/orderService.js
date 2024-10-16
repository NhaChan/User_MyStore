import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/orders'

const createOrder = async (data) => await axios.post(API_URL, data, { headers: authHeader() })

const getAllOrder = async (page, pageSize, search) =>
  await axios.get(API_URL + '/order-user', {
    headers: authHeader(),
    params: {
      page: page,
      pageSize: pageSize,
      search: search ?? '',
    },
  })

const getOrderId = async (id) => await axios.get(API_URL + `/${id}`, { headers: authHeader() })

const orderService = {
  createOrder,
  getAllOrder,
  getOrderId,
}

export default orderService
