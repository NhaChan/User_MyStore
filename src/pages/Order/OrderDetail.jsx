import { Button, Divider, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import orderService from '../../services/orderService'
import { HomeTwoTone } from '@ant-design/icons'
import { formatDateTime, formatVND, showError, toImageLink } from '../../services/commonService'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [orderInfo, setOrderInfo] = useState({})

  const { id } = useParams()

  const breadcrumb = (id) => [
    {
      path: '/',
      title: <HomeTwoTone />,
    },
    {
      path: '/orders',
      title: 'Đơn hàng',
    },
    {
      title: `Chi tiết đơn đặt hàng #${id}`,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await orderService.getOrderId(id)
        console.log(res.data)
        setData(res.data.productOrderDetails)
        setOrderInfo(res.data)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-100">
        <BreadcrumbLink breadcrumb={breadcrumb(id)} />
      </div>
      {isLoading ? (
        <Skeleton paragraph={{ rows: 15 }} />
      ) : (
        <>
          <div className="bg-gray-100 md:px-28 px-2 py-4">
            <div className="px-0 md:px-28">
              <div className="bg-white p-4 shadow-lg rounded-md">
                <div className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="pb-4 text-lg">Thông tin nhận hàng</div>
                    </div>

                    <Button ghost disabled>
                      {formatDateTime(orderInfo.orderDate)}
                    </Button>
                  </div>
                  <div className="pb-2 text-gray-500">{orderInfo.receiver}</div>
                  <div className="text-gray-500">{orderInfo.deliveryAddress}</div>

                  {/* <div className="font-light">Mã đơn #{orderInfo.id}</div> */}

                  {/* <span className="text-red-500">
                    <OrderStatusDisplay orderStatus={orderInfo.orderStatus} />
                  </span> */}

                  <Divider />
                  {data.map((product, i) => (
                    <div className="flex justify-between items-center" key={i}>
                      <div className="flex items-center py-2">
                        <img className="w-20 h-20" src={toImageLink(product.imageUrl)} alt="" />
                        <span className="px-4">
                          <div className="">{product.productName}</div>
                          <div>x {product.quantity}</div>
                        </span>
                      </div>
                      <div className="items-end">
                        <span className="line-through font-thin text-gray-400 px-2">
                          {formatVND(product.originPrice)}
                        </span>
                        <span className="text-red-600">{formatVND(product.price)}</span>
                      </div>
                    </div>
                  ))}
                  <Divider />
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div className="col-span-4"></div>
                    <div className="text-left space-y-2">
                      <div>Tạm tính</div>
                      <div>Phí vận chuyển</div>
                      <div>Tổng cộng</div>
                      <div>Đã thanh toán</div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="font-semibold">
                        {formatVND(orderInfo.total - orderInfo.shippingCost)}
                      </div>
                      <div className="font-semibold">{formatVND(orderInfo.shippingCost)}</div>
                      <div className="font-bold text-red-600">{formatVND(orderInfo.total)}</div>
                      <div>{formatVND(orderInfo.amountPaid)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default OrderDetail
