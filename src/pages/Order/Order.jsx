import { Button, Divider, List, Skeleton, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import orderService from '../../services/orderService'
import { HomeTwoTone } from '@ant-design/icons'
import { formatDateTime, formatVND, showError, toImageLink } from '../../services/commonService'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { Link } from 'react-router-dom'
import { OrderStatus } from '../../services/const'
import SiderMenu from '../../components/SiderMenu/SiderMenu'

const Order = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize] = useState(5)

  const breadcrumb = [
    {
      path: '/',
      title: <HomeTwoTone />,
    },
    {
      title: 'Đơn đặt hàng',
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await orderService.getAllOrder(currentPage, currentPageSize)
        console.log(res.data)
        setData((prevData) => [...prevData, ...res.data.items])
        setTotalItems(res.data?.totalItems)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentPage, currentPageSize])

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const loadMore =
    !isLoading && totalItems > data.length ? (
      <div className="text-center my-4">
        <Button onClick={handleLoadMore} size="large" className="rounded-none">
          Xem thêm
        </Button>
      </div>
    ) : null

  const OrderStatusDisplay = ({ orderStatus }) => {
    let color = ''
    switch (orderStatus) {
      case 0:
        color = 'gold'
        break
      case 1:
        color = 'processing'
        break
      case 2:
        color = 'lime'
        break
      case 3:
        color = 'cyan'
        break
      case 4:
        color = 'error'
        break
      default:
        color = 'default'
        break
    }

    return (
      <Tag className="text-lg" bordered={false} color={color}>
        {OrderStatus[orderStatus]}
      </Tag>
    )
  }

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-100">
        <BreadcrumbLink breadcrumb={breadcrumb} />
      </div>

      <div className="lg:px-28 px-2 py-4 bg-gray-100">
        <div className="flex justify-between lg:px-28 px-2">
          <div className="w-1/5">
            <SiderMenu />
          </div>
          {isLoading && currentPage === 1 ? (
            <Skeleton paragraph={{ rows: 15 }} />
          ) : (
            <div className="w-4/5">
              <List
                // className=" md:px-28 sm:px-4 py-4"
                itemLayout="vertical"
                size="large"
                dataSource={data}
                loadMore={loadMore}
                renderItem={(order) => (
                  <List.Item key={order.id} className="bg-white p-4 shadow-lg rounded-md mb-4">
                    <div className="mb-4">
                      <div className="flex justify-between">
                        <span>{formatDateTime(order.orderDate)}</span>
                        <span>Mã đơn #{order.id}</span>

                        <span className="text-red-500">
                          <OrderStatusDisplay orderStatus={order.orderStatus} />
                        </span>
                      </div>
                      <Divider />
                      <div>Phương thức thanh toán: {order.paymentMethod}</div>
                      <Divider />
                      <div className="flex items-center ">
                        <img
                          className="w-20 h-20"
                          src={toImageLink(order.product?.imageUrl)}
                          alt=""
                        />
                        <span className="px-4">{order.product?.name}</span>
                      </div>
                      <Divider />
                      <div className="flex items-center justify-end py-4">
                        Thành tiền:{' '}
                        <span className="text-xl font-semibold text-red-500 px-3">
                          {formatVND(order.total)}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row justify-end sm:space-x-2">
                        <Button size="large" className="rounded-none">
                          Đánh giá
                        </Button>
                        <Button size="large" type="primary" danger className="rounded-none">
                          Xác nhận hủy
                        </Button>
                        <Link to={`/order-details/${order.id}`}>
                          <Button size="large" className="rounded-none w-full">
                            Xem chi tiết
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Order
