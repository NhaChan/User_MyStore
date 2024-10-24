import axios from 'axios'
import { authHeader } from './authHeader'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/user'

const getAddress = async () => await axios.get(API_URL + '/get-address', { headers: authHeader() })

const updateAddress = async (data) =>
  await axios.put(API_URL + '/update-address', data, { headers: authHeader() })

const getInfo = async () => await axios.get(API_URL + '/info', { headers: authHeader() })

const updateInfo = async (data) =>
  await axios.put(API_URL + '/info', data, { headers: authHeader() })

const addFavorite = async (productId) =>
  await axios.post(API_URL + '/favorite', { id: productId }, { headers: authHeader() })

const getFavorite = async () => await axios.get(API_URL + '/favorite', { headers: authHeader() })

const deleteFavorite = async (productId) =>
  await axios.delete(API_URL + `/favorite/${productId}`, { headers: authHeader() })

const getFavoriteProduct = async (page, pageSize, search) =>
  await axios.get(API_URL + '/favorite-product', {
    headers: authHeader(),
    params: {
      page: page,
      pageSize: pageSize,
      search: search ?? '',
    },
  })

const userService = {
  getAddress,
  updateAddress,
  getInfo,
  updateInfo,
  addFavorite,
  getFavorite,
  deleteFavorite,
  getFavoriteProduct,
}

export default userService
