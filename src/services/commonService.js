import { notification } from 'antd'

const API_URL = process.env.REACT_APP_BASE_URL

export const toImageLink = (link) => {
  return link ? API_URL + '/' + link : undefined
}

export const showError = (error) => {
  const errorMessage =
    // error?.response?.message ||
    error?.response?.data?.title || error?.response?.data || error?.message

  // error?.response?.data?.title || error?.response?.data || error?.message

  notification.error({
    message: 'Lỗi',
    description: errorMessage,
    placement: 'top',
  })
}

export const toImageSrc = (url) => API_URL + '/' + url

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export const dataValueLabel = (data) => {
  return data.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
  }))
}

export const formatVND = (value) => {
  const format = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
  })
  return format.format(value)
}

export const formatDateTime = (date) => new Date(date).toLocaleString('vi-VN')
