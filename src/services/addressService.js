import axios from 'axios'

const API_URL = 'https://provinces.open-api.vn/api'

const getProvince = async () => await axios.get(API_URL + '/p')

const getDistrictsProvice = async (provinceCode) =>
  await axios.get(`${API_URL}/p/${provinceCode}?depth=2`)

const getWardsProvice = async (districtCode) =>
  await axios.get(`${API_URL}/d/${districtCode}?depth=2`)

const addressService = {
  getProvince,
  getDistrictsProvice,
  getWardsProvice,
}

export default addressService
