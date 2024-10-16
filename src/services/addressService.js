import axios from 'axios'

// const API_URL = 'https://provinces.open-api.vn/api'

const API_URL = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data'

const TOKEN = '53184e3d-8b95-11ef-8e53-0a00184fe694'

// const getProvince = async () => await axios.get(API_URL + '/p')
// const getProvince = async () =>
//   await axios.get(API_URL + '/province', { headers: { TOKEN: TOKEN } })

const getProvince = async () =>
  await axios.get(`${API_URL}/province`, {
    headers: {
      Token: TOKEN,
    },
  })

// const getDistrictsProvice = async (provinceCode) =>
//   await axios.get(`${API_URL}/p/${provinceCode}?depth=2`)

const getDistrictsProvice = async (province_id) =>
  await axios.get(API_URL + `/district`, {
    headers: { Token: TOKEN },
    params: { province_id: province_id },
  })

// const getWardsProvice = async (districtCode) =>
//   await axios.get(`${API_URL}/d/${districtCode}?depth=2`)

const getWardsProvice = async (district_id) =>
  await axios.get(API_URL + `/ward`, {
    headers: { Token: TOKEN },
    params: { district_id: district_id },
  })

const addressService = {
  getProvince,
  getDistrictsProvice,
  getWardsProvice,
}

export default addressService
