import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import paymentService from '../../services/paymentService'
import NotFound from '../../components/NotFound'
import { notification } from 'antd'

export default function Payment() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [params, setParams] = useState(null)

  useEffect(() => {
    const newParams = Object.fromEntries(searchParams.entries()) // Chuyển các tham số URL thành đối tượng
    if (Object.values(newParams).some((value) => !value)) {
      setParams(undefined)
    } else {
      setParams(newParams)
    }
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await paymentService.payOSCallback(params)
        notification.success({
          message: 'Thành công',
          description: 'Thanh toán thành công',
        })
      } catch (error) {
        notification.error({
          message: 'Thất bại',
          description: 'Thanh toán thất bại',
        })
      } finally {
        navigate('/orders')
      }
    }
    if (params) {
      fetchData()
    }
  }, [params, navigate])

  if (!params) return <NotFound />

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <Spin /> Đang xử lý thanh toán...
      </div>
    </div>
  )
}
