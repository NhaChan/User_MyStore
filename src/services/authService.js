import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_BASE_URL + '/api/auth'

const sendCodeRegister = async (email) => await axios.post(API_URL + '/send-code-register', email)

const confirmCode = async (data) => await axios.post(API_URL + '/confirm-code', data)

const register = async (data) => await axios.post(API_URL + '/register', data)

const login = async (data) =>
  await axios.post(API_URL + '/login', data).then((res) => {
    const exp = 12 * 60 * 60 * 1000
    const in12Hours = new Date(new Date().getTime() + exp)

    Cookies.set('user_data', JSON.stringify(res.data), { expires: in12Hours })
    Cookies.set('access_token', res.data?.access_token, { expires: in12Hours })
    return res
  })

const getCurrentUser = () => {
  const user = Cookies.get('user_data')
  return user ? JSON.parse(user) : user
}

const setUserToken = (access_token) =>
  Cookies.set('access_token', access_token, { expires: 5 * 60 * 1000 })

const logout = () => {
  Cookies.remove('user_data')
  Cookies.remove('access_token')
}

const codeResetPassword = async (email) =>
  await axios.post(API_URL + '/send-code-resetpassword', email)

const resetPassword = async (data) => await axios.post(API_URL + '/reset-password', data)

const authService = {
  sendCodeRegister,
  confirmCode,
  register,
  login,
  getCurrentUser,
  setUserToken,
  logout,
  codeResetPassword,
  resetPassword,
}

export default authService
