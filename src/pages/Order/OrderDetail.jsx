import { Divider, Skeleton, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import orderService from '../../services/orderService'
import { HomeTwoTone } from '@ant-design/icons'
import { formatDateTime, formatVND, showError, toImageLink } from '../../services/commonService'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { useParams } from 'react-router-dom'
import { FaTruck } from 'react-icons/fa'
import { MdAssignmentReturned, MdCancel, MdOutlineRecommend } from 'react-icons/md'
import { IoDocumentSharp } from 'react-icons/io5'
import { PiCopyFill } from 'react-icons/pi'
import { BsHourglassTop } from 'react-icons/bs'

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
        // console.log(res.data)
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

  const getCurrentStep = (status) => {
    switch (status) {
      case 'Processing':
        return 0
      case 'Confirmed':
        return 1
      case 'AwaitingPickup':
        return 2
      case 'Shipping':
        return 3
      case 'Received':
        return 4
      case 'Finish':
        return 5
      case 'Canceled':
        return -1
      default:
        return 0
    }
  }

  const currentStep = getCurrentStep(orderInfo.orderStatus)

  return (
    <>
      <div className="py-2 px-8 sticky top-[5rem] z-40 bg-gray-100">
        <BreadcrumbLink breadcrumb={breadcrumb(id)} />
      </div>
      {isLoading ? (
        <Skeleton paragraph={{ rows: 15 }} />
      ) : (
        <>
          <div className="bg-gray-100 md:px-28 px-2 py-4">
            <div className="px-0 md:px-28">
              <div className="bg-white p-4 flex justify-between font-thin">
                <div>MÃ ĐƠN HÀNG: #{orderInfo.id}</div>
                <div className="flex">
                  <span>Phương thức thanh toán: </span>
                  <span className="font-semibold text-green-600">
                    {orderInfo.paymentMethodName === 'COD'
                      ? 'Thanh toán khi nhận hàng'
                      : 'Thanh toán bằng PayOS'}
                  </span>
                </div>
              </div>
              <Divider className="my-[0.1rem] border-0 " />

              <div className="bg-white p-4">
                <Steps
                  current={currentStep}
                  status="process"
                  labelPlacement="vertical"
                  items={[
                    {
                      title: 'Đã đặt hàng',
                      description: <div>{formatDateTime(orderInfo.orderDate)}</div>,
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === 0
                              ? 'bg-orange-200 text-orange-500'
                              : currentStep > 0
                              ? 'bg-green-200 text-green-500'
                              : 'border-green-500 text-green-500'
                          }`}
                        >
                          <IoDocumentSharp className="text-3xl" />
                        </button>
                      ),
                    },
                    {
                      title: 'Đã xác nhận',
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === 1
                              ? 'bg-orange-200 text-orange-500'
                              : currentStep > 1
                              ? 'bg-green-200 text-green-500'
                              : 'border-green-500 text-green-500'
                          }`}
                        >
                          <PiCopyFill className="text-3xl" />
                        </button>
                      ),
                    },
                    {
                      title: 'Chờ đơn vị vận chuyển lấy hàng',
                      // description: <div>{formatDateTime(orderInfo.updatedAt)}</div>,
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === 2
                              ? 'bg-orange-200 text-orange-500'
                              : currentStep > 2
                              ? 'bg-green-200 text-green-500'
                              : 'border-green-500 text-green-500'
                          }`}
                        >
                          <BsHourglassTop className="text-3xl" />
                        </button>
                      ),
                    },
                    {
                      title: 'Đang giao hàng',
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === 3
                              ? 'bg-orange-200 text-orange-500'
                              : currentStep > 3
                              ? 'bg-green-200 text-green-500'
                              : 'border-green-500 text-green-500'
                          }`}
                        >
                          <FaTruck className="text-3xl" />
                        </button>
                      ),
                    },
                    {
                      title: 'Đã nhận hàng',
                      description: (
                        <div>
                          {(currentStep === 4 || currentStep === 5) &&
                            formatDateTime(orderInfo.dateReceived)}
                        </div>
                      ),
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === 4
                              ? 'bg-orange-200 text-orange-500'
                              : currentStep > 4
                              ? 'bg-green-200 text-green-500'
                              : 'border-green-500 text-green-500'
                          }`}
                        >
                          <MdAssignmentReturned className="text-3xl" />
                        </button>
                      ),
                    },
                    {
                      title: 'Hoàn thành',
                      description: (
                        <div>
                          {' '}
                          {currentStep === 4 &&
                            orderInfo.updatedAt &&
                            formatDateTime(orderInfo.dateReceived)}
                          {/* {formatDateTime(orderInfo.dateReceived)} */}
                        </div>
                      ),
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === 5 ? 'bg-orange-200' : 'border-green-500'
                          }`}
                        >
                          <MdOutlineRecommend
                            className={`${
                              currentStep === 5 ? 'text-orange-500' : 'text-green-500'
                            } text-3xl`}
                          />
                        </button>
                      ),
                    },
                    {
                      title: 'Đã hủy',
                      icon: (
                        <button
                          className={`p-2 border-2 rounded-full ${
                            currentStep === -1 ? 'bg-orange-200' : 'border-red-500'
                          }`}
                        >
                          <MdCancel
                            className={`${
                              currentStep === -1 ? 'text-orange-500' : 'text-red-500'
                            } text-3xl`}
                          />
                        </button>
                      ),
                    },
                  ]}
                />
              </div>
              {/* ) : (
                <div className="bg-white p-4 text-center text-red-500 font-semibold">
                  Đơn hàng đã bị hủy
                </div>
              )} */}
              <Divider className="my-[0.1rem] border-0 " />
              <div className="flex flex-col sm:flex-row justify-between bg-white p-4 font-thin">
                <div className="pb-4 text-lg">Thông tin nhận hàng</div>
                <div className="pb-2 text-gray-500">{orderInfo.receiver}</div>
                <div className="text-gray-500">{orderInfo.deliveryAddress}</div>
              </div>
              <Divider className="my-[0.1rem] border-0" />
              <div className="bg-white p-4 shadow-lg rounded-md">
                <div className="mb-4">
                  {data.map((product, i) => (
                    <>
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
                      <Divider />
                    </>
                  ))}
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
