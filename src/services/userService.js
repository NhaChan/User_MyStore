import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/user'

const getAddress = async () => await axios.get(API_URL + '/get-address', { headers: authHeader() })

const updateAddress = async (data) =>
  await axios.put(API_URL + '/update-address', data, { headers: authHeader() })

const getInfo = async () => await axios.get(API_URL + '/info', { headers: authHeader() })

const updateInfo = async (data) =>
  await axios.put(API_URL + '/info', data, { headers: authHeader() })

const userService = {
  getAddress,
  updateAddress,
  getInfo,
  updateInfo,
}

export default userService
