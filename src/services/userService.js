import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/user'

const getAddress = async () => await axios.get(API_URL + '/get-address', { headers: authHeader() })

const updateAddress = async (data) =>
  await axios.put(API_URL + '/update-address', data, { headers: authHeader() })

const userService = {
  getAddress,
  updateAddress,
}

export default userService