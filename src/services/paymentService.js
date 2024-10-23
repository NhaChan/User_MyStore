import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/payments'

const payOSCallback = async (params) =>
  await axios.get(API_URL + '/payos-callback', { headers: authHeader(), params: params })

const paymentService = {
  payOSCallback,
}

export default paymentService
