import { DeleteOutlined, HomeOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  notification,
  Radio,
  Select,
  Skeleton,
  Steps,
  Table,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import cartService from '../../services/cartService'
import TextArea from 'antd/es/input/TextArea'
import BreadcrumbLink from '../../components/BreadcrumbLink'

const breadcrumb = [
  {
    path: '/',
    title: <HomeOutlined />,
  },
  {
    title: 'Giỏ hàng',
  },
]

const CartItem = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [approximatePrice, setApproximatePrice] = useState(0)
  const [shippingFee, setShippingFee] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await cartService.getAllCartByUserId()
        console.log(res)
        setData(res.data)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalShippingFee = (approximate) => {
    if (approximate < 200000) {
      setShippingFee(40000)
      setCurrentStep(1)
    } else if (approximate >= 200000 && approximate < 400000) {
      setShippingFee(20000)
      setCurrentStep(2)
    } else {
      setShippingFee(0)
      setCurrentStep(3)
    }
  }
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)

    const selectItems = data.filter((item) => newSelectedRowKeys.includes(item.productId))
    const approximate = selectItems.reduce(
      (acc, item) => acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
      0,
    )
    setApproximatePrice(approximate)
    totalShippingFee(approximate)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const handleDelete = async () => {
    try {
      if (selectedRowKeys.length === 0) {
        notification.warning({ message: 'Vui lòng chọn sản phẩm cần xóa' })
        return
      }
      await cartService.deleteCart(selectedRowKeys)
      notification.success({ message: 'Xóa thành công.' })
      setData(data.filter((item) => !selectedRowKeys.includes(item.productId)))
      setSelectedRowKeys([])
    } catch (error) {
      showError(error)
    }
  }

  const handleDeleteIdCart = async () => {
    try {
      if (selectedRowKeys.length === 0) {
        notification.warning({ message: 'Vui lòng chọn sản phẩm cần xóa' })
        return
      }
      await cartService.deleteCart(selectedRowKeys)
      notification.success({ message: 'Xóa thành công.' })
      setData(data.filter((item) => !selectedRowKeys.includes(item.productId)))
      setSelectedRowKeys([])
    } catch (error) {
      showError(error)
    }
  }

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'imageUrl',
      render: (imageUrl, record) => (
        <div className="flex items-center">
          <Image
            className="rounded-md"
            width={100}
            height={100}
            src={toImageLink(imageUrl)}
            alt={record.productName}
          />
          <span className="ml-4 md:truncate md:w-96 truncate w-40">{record.productName}</span>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      align: 'center',
      dataIndex: 'priceExp',
      render: (_, record) => {
        const priceExp = record.price - (record.price * record.discount) / 100
        return <span>{formatVND(priceExp)}</span>
      },
    },
    {
      title: 'Số lượng',
      align: 'center',
      dataIndex: 'quantity',
      render: (value) => <InputNumber className="w-14" value={value} />,
    },
    {
      title: 'Thành tiền',
      align: 'center',
      key: 'total',
      render: (_, record) => {
        const total = (record.price - (record.price * record.discount) / 100) * record.quantity
        return <span>{formatVND(total)}</span>
      },
    },
    {
      title: (
        <Button danger className="border-0 flex items-center" onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      ),
      align: 'center',
      render: () => (
        <Button danger className="border-0 flex items-center" onClick={handleDeleteIdCart}>
          <DeleteOutlined />
        </Button>
      ),
    },
  ]

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-100">
        <BreadcrumbLink breadcrumb={breadcrumb} />
      </div>
      <div className="bg-gray-100 px-2 mb-2 h-full">
        <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
          {isLoading ? (
            <Skeleton paragraph={{ rows: 15 }} />
          ) : (
            <>
              <div className="w-full lg:2/3 sm:w-full">
                <div>
                  <div className="bg-white p-4">
                    <Steps initial={0} current={currentStep}>
                      <Steps.Step title="40.000 VND" description="dưới 200.000 VND" />
                      <Steps.Step
                        title="20.000 VND"
                        description="từ 200.000 VND đến dưới 400.000 VND"
                      />
                      <Steps.Step title="Miễn phí" description="trên 400.000 VND" />
                    </Steps>
                  </div>
                  <Divider className="my-[0.1rem] border-0 " />
                  <Table
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.productId}
                    className="overflow-x-auto"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/3 sm:w-full">
                <Card className="rounded-sm mb-2">
                  <span className="space-x-2">
                    <span>Địa chỉ giao hàng:</span>
                    <span className="font-bold">Ninh Kiều - Cần Thơ</span>
                    <span
                      onClick={showModal}
                      className="text-blue-500 cursor-pointer hover:text-sky-300"
                    >
                      Thay đổi
                    </span>
                  </span>
                  <Divider className="my-[0.8rem]" />
                  <div className="flex justify-between py-2">
                    <div>Tạm tính</div>
                    <div>{formatVND(approximatePrice)}</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Phí giao hàng</div>
                    <div>{formatVND(shippingFee)}</div>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <div>Tổng tiền</div>
                    <div className="text-xl font-bold text-red-600">
                      {formatVND(approximatePrice + shippingFee)}
                    </div>
                  </div>
                </Card>
                <Card className="rounded-sm" title="Thanh toán">
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    className="flex flex-col space-y-3"
                  >
                    <Radio value={1}>
                      <div className="flex p-2 items-center">
                        <span>Thanh toán khi nhận hàng</span>
                      </div>
                    </Radio>
                    <Radio value={2}>
                      <div className="flex space-x-4 p-2 items-center">
                        <img src="pay1.svg" alt="Logo" className="w-12 mx-auto" />
                        <span>PayOS</span>
                      </div>
                    </Radio>

                    <Radio value={3}>
                      <div className="flex space-x-4 items-center">
                        <img src="pay2.webp" alt="Logo" className="w-12 mx-auto" />
                        <span>Momo</span>
                      </div>
                    </Radio>
                  </Radio.Group>
                </Card>
                <Divider className="my-[0.1rem] border-0" />
                <Button danger type="primary" size="large" className="w-full rounded-sm">
                  Mua hàng
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal title="Địa chỉ giao hàng" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tên người nhận"
              name=""
              rules={[
                {
                  required: true,
                  message: 'Tên người nhận',
                },
              ]}
            >
              <Input size="large" placeholder="..." />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name=""
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại là bắt buộc',
                },
              ]}
            >
              <Input size="large" placeholder="..." />
            </Form.Item>
          </div>
          <Form.Item
            label="Tỉnh/ Thành Phố"
            name=""
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá sản phẩm',
              },
            ]}
          >
            <Select
              ClassName="w-full"
              size="large"
              defaultValue="Cần Thơ"
              onChange={handleChange}
              options={[
                {
                  value: 'Cần Thơ',
                  label: 'Cần Thơ',
                },
                {
                  value: 'Vĩnh Long',
                  label: 'Vĩnh Long',
                },
              ]}
            />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Quận/ Huyện"
              name=""
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá sản phẩm',
                },
              ]}
            >
              <Select
                ClassName="w-full"
                size="large"
                defaultValue="Cần Thơ"
                onChange={handleChange}
                options={[
                  {
                    value: 'Cần Thơ',
                    label: 'Cần Thơ',
                  },
                  {
                    value: 'Vĩnh Long',
                    label: 'Vĩnh Long',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Xã/ Phường/ Thị trấn"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá sản phẩm',
                },
              ]}
            >
              <Select
                ClassName="w-full"
                size="large"
                defaultValue="Cần Thơ"
                onChange={handleChange}
                options={[
                  {
                    value: 'Cần Thơ',
                    label: 'Cần Thơ',
                  },
                  {
                    value: 'Vĩnh Long',
                    label: 'Vĩnh Long',
                  },
                ]}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Địa chỉ cụ thể"
            name=""
            rules={[
              {
                required: true,
                message: 'Địa chỉ là bắt buộc',
              },
            ]}
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="Nhập địa chỉ..."
              style={{ height: 70, resize: 'none' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CartItem
