import {
  Button,
  Divider,
  Form,
  Input,
  List,
  Modal,
  notification,
  Popconfirm,
  Rate,
  Skeleton,
  Tabs,
  Tag,
  Upload,
} from 'antd'
import React, { useEffect, useState } from 'react'
import orderService from '../../services/orderService'
import { HomeTwoTone } from '@ant-design/icons'
import { formatDateTime, formatVND, showError, toImageLink } from '../../services/commonService'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { Link } from 'react-router-dom'
import { CancelStatus, OrderStatus } from '../../services/const'
import SiderMenu from '../../components/SiderMenu/SiderMenu'
import { FaCamera } from 'react-icons/fa'

const Order = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize] = useState(5)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fileList, setFileList] = useState([])
  const [dataReview, setDataReview] = useState([])
  const [form] = Form.useForm()
  const [id, setID] = useState()
  const [orderStatus, setOrderStatus] = useState('all')
  const [isReviewSubmit, setIsReviewSubmit] = useState(false)

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
    // console.log(orderStatus)

    const fetchData = async () => {
      setIsLoading(true)
      try {
        let res
        if (orderStatus === 'all') {
          res = await orderService.getAllOrder(currentPage, currentPageSize, '')
          setData((prevData) => [...prevData, ...res.data.items])
        } else {
          res = await orderService.getStatus(orderStatus, currentPage, currentPageSize, '')
          setData(res.data.items)
        }
        // console.log(res.data)
        setTotalItems(res?.data?.totalItems)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [orderStatus, currentPage, currentPageSize, isReviewSubmit])

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const cancelOrder = async (id) => {
    try {
      setLoading(true)
      await orderService.cancel(id)
      setData((pre) =>
        pre.map((order) => (order.id === id ? { ...order, orderStatus: CancelStatus } : order)),
      )
    } catch (error) {
      showError(error)
    } finally {
      setLoading(false)
    }
  }

  const showModal = async (orderId) => {
    form.resetFields()
    setIsModalOpen(true)
    try {
      setID(orderId)
      const res = await orderService.getOrderId(orderId)
      // console.log(res.data)
      setDataReview(res.data.productOrderDetails)
    } catch (error) {
      showError(error)
    }
  }

  const handleCancel = () => {
    // form.resetFields()
    setIsModalOpen(false)
  }

  const onFinish = async ({ review }) => {
    if (id) {
      try {
        // console.log(review)
        setLoading(true)
        const formData = new FormData()

        review.forEach((item, i) => {
          Object.keys(item).forEach((key) => {
            const value = item[key]
            // console.log('value', value)
            if (value) {
              formData.append(`reviews[${i}].${key}`, value.toString())
            }
          })

          const images = fileList.find((e) => e.productId === item.productId)?.files
          if (images) {
            images.forEach((image) => {
              if (image.originFileObj) {
                formData.append(`reviews[${i}].images`, image.originFileObj)
              }
            })
          }
        })
        await orderService.review(id, formData)
        // console.log('res', res)
        notification.success({
          message: 'Thành công',
          description: 'Đã gửi đánh giá của bạn.',
          className: 'text-green-500',
        })

        setData((prevData) =>
          prevData.map((order) => (order.id === id ? { ...order, reviewed: true } : order)),
        )
        setFileList([])
        setIsReviewSubmit(!isReviewSubmit)
      } catch (error) {
        showError(error)
      } finally {
        setLoading(false)
        setIsModalOpen(false)
      }
    }
  }

  const handleChange = (productId, newFileList) => {
    // Tìm xem sản phẩm đã có trong fileList chưa
    const existingProduct = fileList.some((item) => item.productId === productId)

    let updatedList

    if (existingProduct) {
      // Nếu sản phẩm đã tồn tại, cập nhật files của sản phẩm đó
      updatedList = fileList.map((item) =>
        item.productId === productId ? { ...item, files: newFileList } : item,
      )
    } else {
      // Nếu sản phẩm chưa có trong danh sách, thêm mới
      updatedList = [...fileList, { productId, files: newFileList }]
    }

    // Cập nhật lại state
    setFileList(updatedList)
  }

  const nextOrderStatus = async (id) => {
    try {
      setLoading(true)
      await orderService.updateStatus(id)
      // setData((pre) => pre.filter((e) => e.id !== id))
      setData((pre) =>
        pre.map((order) =>
          order.id === id ? { ...order, orderStatus: order.orderStatus + 1 } : order,
        ),
      )
    } catch (error) {
      showError(error)
    } finally {
      setLoading(false)
    }
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
        color = 'blue'
        break
      case 3:
        color = 'lime'
        break
      case 4:
        color = 'cyan'
        break
      case 5:
        color = '#87d068'
        break
      case 6:
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

  const uploadButton = (
    <button type="button">
      <div className="flex items-center">
        <FaCamera className="text-lg" />
        Chọn ảnh
      </div>
    </button>
  )

  const handleStatusChange = (key) => {
    setOrderStatus(key)
    // setCurrentPage(1)
    // setData([])
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        okText="Gửi đánh giá"
        okButtonProps={{
          autoFocus: true,
          htmlType: 'submit',
          danger: true,
          className: 'rounded-sm',
        }}
        confirmLoading={loading}
        cancelButtonProps={{ className: 'rounded-sm', disabled: loading }}
        destroyOnClose
        centered
        title={`Đánh giá đơn hàng`}
        className="rounded-sm"
        styles={{ content: { borderRadius: 3, margin: '0.5rem 0' } }}
        maskClosable={false}
        modalRender={(dom) => (
          <Form layout="vertical" form={form} name="changeEmail" onFinish={onFinish}>
            {dom}
          </Form>
        )}
      >
        <div className="modal-body space-y-4 mt-4">
          <Button danger className="rounded-none w-full">
            Đánh giá sản phẩm để có những trải nghiệm tuyệt vời
          </Button>
          <Form.List
            initialValue={dataReview.map((value) => ({
              productId: value.productId,
              star: 5,
              productName: value.productName,
              imageUrl: value.imageUrl,
            }))}
            name="review"
          >
            {(fields) => (
              <>
                {fields.map((field, i) => (
                  <div key={i}>
                    <Form.Item dependencies={['review', field.name, 'productId']}>
                      {({ getFieldValue }) => {
                        const productName = getFieldValue(['review', field.name, 'productName'])
                        const imageUrl = getFieldValue(['review', field.name, 'imageUrl'])
                        return (
                          <div className="flex items-center">
                            <img
                              className="w-20 h-20 object-cover mr-2"
                              src={toImageLink(imageUrl)}
                              alt={productName}
                            />
                            <span className="text-gray-700">{productName}</span>
                          </div>
                        )
                      }}
                    </Form.Item>

                    <Divider className="my-1" />
                    <Form.Item
                      layout="horizontal"
                      label="Chất lượng sản phẩm"
                      name={[field.name, 'star']}
                      rules={[
                        {
                          validator: (_, value) =>
                            value < 1
                              ? Promise.reject(new Error('Tối thiểu 1 sao'))
                              : Promise.resolve(),
                        },
                      ]}
                      className="mb-0"
                    >
                      <Rate count={5} />
                    </Form.Item>
                    <div className="bg-gray-50 p-4">
                      <Form.Item
                        name={[field.name, 'description']}
                        className="mb-1"
                        // label="Nhận xét của bạn"
                      >
                        <Input.TextArea
                          className="rounded-sm"
                          placeholder="Hãy chia sẽ nhận xét cho sản phẩm này bạn nhé!"
                          showCount
                          maxLength={150}
                          size="large"
                        />
                      </Form.Item>
                      <Form.Item
                        dependencies={['review', field.name, 'productId']}
                        label="Thêm hình ảnh"
                      >
                        {({ getFieldValue }) => {
                          const productId = getFieldValue(['review', field.name, 'productId'])
                          const currentFileList =
                            fileList.find((e) => e.productId === productId)?.files || []

                          return (
                            <Upload
                              multiple
                              beforeUpload={() => false}
                              listType="picture-card"
                              fileList={currentFileList}
                              // onPreview={handlePreview}
                              onChange={({ fileList }) => handleChange(productId, fileList)}
                            >
                              {currentFileList.length >= 3 ? null : uploadButton}
                            </Upload>
                          )
                        }}
                      </Form.Item>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </div>
      </Modal>
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
              <div className="bg-white sticky p-4">
                <Tabs
                  defaultActiveKey="1"
                  size="large"
                  centered
                  // onChange={onChange}
                  onChange={handleStatusChange}
                  items={Object.entries({ all: 'Tất cả', ...OrderStatus }).map(([key, value]) => {
                    return {
                      label: value,
                      key: key,
                      children: (
                        <List
                          itemLayout="vertical"
                          size="large"
                          dataSource={data}
                          loadMore={loadMore}
                          renderItem={(order) => (
                            <List.Item
                              key={order.id}
                              className="bg-white p-4 shadow-lg rounded-md mb-4"
                            >
                              <div className="mb-4">
                                <div className="flex justify-between">
                                  <span>{formatDateTime(order.orderDate)}</span>
                                  {/* <span>Mã đơn #{order.id}</span> */}

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
                                  {(order.orderStatus === 4 || order.orderStatus === 5) &&
                                    order.reviewed === false && (
                                      <Button
                                        onClick={() => showModal(order.id)}
                                        size="large"
                                        className="rounded-none"
                                      >
                                        Đánh giá
                                      </Button>
                                    )}
                                  {order.orderStatus === 4 && (
                                    <Popconfirm
                                      title="Xác nhận đơn hàng đã được giao đến bạn"
                                      loading={loading}
                                      onConfirm={() => nextOrderStatus(order.id)}
                                    >
                                      <Button
                                        size="large"
                                        type="dashed"
                                        danger
                                        className="rounded-none"
                                      >
                                        Đã nhận hàng
                                      </Button>
                                    </Popconfirm>
                                  )}
                                  {order.orderStatus === 0 && (
                                    <Popconfirm
                                      title="Xác nhận hủy đơn"
                                      loading={loading}
                                      onConfirm={() => cancelOrder(order.id)}
                                    >
                                      <Button
                                        loading={loading}
                                        size="large"
                                        type="primary"
                                        danger
                                        className="rounded-none"
                                      >
                                        Xác nhận hủy
                                      </Button>
                                    </Popconfirm>
                                  )}
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
                      ),
                    }
                  })}
                  activeKey={orderStatus}
                />
              </div>
              <Divider className="my-[0.1rem] border-0 " />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Order
