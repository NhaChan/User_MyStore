import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/payments'

const payOSCallback = async () => await axios.get(API_URL + '/payos-callback')

const paymentService = {
  payOSCallback,
}

export default paymentService
