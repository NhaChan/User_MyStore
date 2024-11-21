import { DeleteOutlined, DropboxOutlined, HomeOutlined } from '@ant-design/icons'
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
  Result,
  Select,
  Skeleton,
  Steps,
  Table,
} from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import cartService from '../../services/cartService'
import TextArea from 'antd/es/input/TextArea'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { FaMapMarkerAlt } from 'react-icons/fa'
import userService from '../../services/userService'
import addressService from '../../services/addressService'
import debounce from 'debounce'
import orderService from '../../services/orderService'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../App'

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
  const [dataAddress, setDataAddress] = useState('')
  const [form] = Form.useForm()

  const [provinces, setProvince] = useState([])
  const [districts, setDistrict] = useState([])
  const [wards, setWard] = useState([])

  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const navigate = useNavigate()

  const { setCountCart } = useContext(CartContext)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await cartService.getAllCartByUserId()
        const address = await userService.getAddress()
        const result = await addressService.getProvince()
        // console.log('data', result)
        // console.log(address)
        // console.log(res)
        setData(res.data)
        setDataAddress(address.data)
        setProvince(result.data.data || [])
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const debounceUpdateQuantity = debounce(async (id, quantity) => {
    try {
      await cartService.updateQuantity(id, { quantity })
      //notification.success({ message: 'Thành công!' })
    } catch (error) {
      showError(error)
    }
  }, 500)

  const handleQuantityChange = (value, record) => {
    debounceUpdateQuantity(record.id, value)

    setData((prevData) =>
      prevData.map((item) => (item.id === record.id ? { ...item, quantity: value } : item)),
    )

    if (selectedRowKeys.includes(record.productId)) {
      const selectedItems = data
        .map((item) => (item.productId === record.productId ? { ...item, quantity: value } : item))
        .filter((item) => selectedRowKeys.includes(item.productId))

      const newApproximatePrice = selectedItems.reduce(
        (acc, item) => acc + (item.price - (item.price * item.discount) / 100) * item.quantity,
        0,
      )

      setApproximatePrice(newApproximatePrice)
      totalShippingFee(newApproximatePrice)
    }
  }

  const totalShippingFee = (approximate) => {
    if (approximate > 400000 || approximate === 0) {
      setShippingFee(0)
      setCurrentStep(2)
    } else if (approximate >= 200000 && approximate < 400000) {
      setShippingFee(2000)
      setCurrentStep(1)
    } else {
      setShippingFee(4000)
      setCurrentStep(0)
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
    form.setFieldsValue(dataAddress)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleProvinceChange = async (value, option) => {
    setSelectedProvince(value)
    try {
      const res = await addressService.getDistrictsProvice(value)
      // console.log('quan', res.data)
      setDistrict(res.data.data ?? [])
      setWard([])
      form.setFieldsValue({ provinceID: value, provinceName: option.label })
      form.setFieldsValue({ districtID: [], districtName: [] })
      form.setFieldsValue({ wardID: [], wardName: [] })
    } catch (error) {
      showError(error)
    }
  }

  const handleDistrictChange = async (value, option) => {
    setSelectedDistrict(value)
    try {
      const res = await addressService.getWardsProvice(value)
      // console.log('phuong', res)
      setWard(res.data?.data ?? [])
      form.setFieldsValue({ districtID: value, districtName: option.label })
      form.setFieldsValue({ wardID: [], wardName: [] })
    } catch (error) {
      showError(error)
    }
  }

  const handleWardChange = (value, option) => {
    form.setFieldsValue({ wardID: value, wardName: option.label })
  }

  const handleOk = async () => {
    setLoadingUpdate(true)
    try {
      const value = await form.validateFields()
      // console.log(value)
      await userService.updateAddress(value)
      notification.success({ message: 'Cập nhật địa chỉ thành công.' })
      setIsModalOpen(false)
      setDataAddress(value)
    } catch (error) {
      showError(error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const [value, setValue] = useState(1)
  const onChange = (e) => {
    // console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  const handleDelete = async () => {
    try {
      if (selectedRowKeys.length === 0) {
        notification.warning({ message: 'Vui lòng chọn sản phẩm cần xóa' })
        return
      }
      await cartService.deleteCart(selectedRowKeys)
      notification.success({ message: 'Xóa thành công.', placement: 'top' })

      const newData = data.filter((item) => !selectedRowKeys.includes(item.productId))
      setCountCart(newData.map((item) => item.productId))
      setData(newData)
      setSelectedRowKeys([])
    } catch (error) {
      showError(error)
    }
  }

  const handleDeleteIdCart = async (id) => {
    try {
      // if (selectedRowKeys.length === 0) {
      //   notification.warning({ message: 'Vui lòng chọn sản phẩm cần xóa' })
      //   return
      // }
      await cartService.deleteCartId(id)
      notification.success({ message: 'Xóa thành công.' })
      const newData = data.filter((item) => item.id !== id)
      setCountCart(newData.map((item) => item.id))
      setData(newData)
      setSelectedRowKeys([])
    } catch (error) {
      showError(error)
    }
  }

  const handleOrder = async () => {
    try {
      const order = {
        total: approximatePrice + shippingFee,
        shippingCost: shippingFee,
        receiver: `${dataAddress.name} - ${dataAddress.phoneNumber}`,
        deliveryAddress: `${dataAddress.detail}, ${dataAddress.wardName},
                          ${dataAddress.districtName}, ${dataAddress.provinceName}`,
        //code: 'string',
        cartIds: selectedRowKeys.map(String),
        paymentMethodId: value,
        DistrictID: dataAddress.districtID,
        WardID: `${dataAddress.wardID}`,
        //userIP: 'string',
      }
      if (selectedRowKeys.length === 0) {
        notification.warning({ message: 'Vui lòng chọn sản phẩm muốn mua' })
        return
      }
      const res = await orderService.createOrder(order)
      const newData = data.filter((item) => !selectedRowKeys.includes(item.productId))
      setCountCart(newData.map((item) => item.productId))

      if (order.paymentMethodId !== 1) {
        // console.log(res.data)
        window.location.replace(res.data)
      } else {
        notification.success({ message: 'Đặt hàng thành công.' })
        navigate('/orders')
      }
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
      render: (value, record) => (
        <InputNumber
          className="w-14"
          value={value}
          max={record.stock}
          min={1}
          onChange={(newValue) => handleQuantityChange(newValue, record)}
        />
      ),
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
      dataIndex: 'id',
      render: (value) => (
        <Button
          danger
          className="border-0 flex items-center"
          onClick={() => handleDeleteIdCart(value)}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ]

  return (
    <>
      {isLoading ? (
        <Skeleton paragraph={{ rows: 15 }} />
      ) : (
        <>
          <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-100">
            <BreadcrumbLink breadcrumb={breadcrumb} />
          </div>
          {data && data?.length > 0 ? (
            <div className="bg-gray-100 px-2 mb-2 h-full">
              <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
                <div className="w-full lg:2/3 sm:w-full">
                  <div>
                    <div className="bg-white p-4">
                      <Steps size="small" initial={0} current={currentStep}>
                        <Steps.Step title="4.000 VND" description="dưới 200.000 VND" />
                        <Steps.Step
                          title="2.000 VND"
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
                    <div className="space-x-2">
                      <div className="flex-col flex">
                        <div className="flex justify-between">
                          <div className="flex space-x-1 py-2">
                            <FaMapMarkerAlt className="text-xl text-red-700" />
                            <span className="font-bold">
                              {dataAddress.name} - {dataAddress.phoneNumber}
                            </span>
                          </div>
                          <span
                            onClick={showModal}
                            className="text-blue-500 cursor-pointer hover:text-sky-300 py-2"
                          >
                            Thay đổi
                          </span>
                        </div>
                        <span className="truncate w-80 lg:w-80 md:w-full">
                          {dataAddress.detail} - {dataAddress.wardName} - {dataAddress.districtName}{' '}
                          - {dataAddress.provinceName}
                        </span>
                      </div>
                    </div>
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

                      {/* <Radio value={3}>
                      <div className="flex space-x-4 items-center">
                        <img src="pay2.webp" alt="Logo" className="w-12 mx-auto" />
                        <span>Momo</span>
                      </div>
                    </Radio> */}
                    </Radio.Group>
                  </Card>
                  <Divider className="my-[0.1rem] border-0" />
                  <Button
                    onClick={handleOrder}
                    danger
                    type="primary"
                    size="large"
                    className="w-full rounded-sm"
                  >
                    Mua hàng
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Result
              className="h-[calc(100vh-6rem)] py-28"
              icon={<DropboxOutlined className="text-sky-600 text-[10rem]" />}
              title="Bạn chưa chọn sản phẩm nào"
              subTitle="Hãy nhanh tay chọn ngay sản phẩm yêu thích."
              extra={
                <Link to="/product">
                  <Button type="primary">Mua sắm ngay</Button>
                </Link>
              }
            />
          )}
        </>
      )}

      <Modal
        title="Địa chỉ giao hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        loading={loadingUpdate}
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Tên người nhận"
              name="name"
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
              name="phoneNumber"
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
          <Form.Item name="provinceID" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            label="Tỉnh/ Thành Phố"
            name="provinceName"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập giá sản phẩm',
              },
            ]}
          >
            <Select
              className="w-full"
              size="large"
              onChange={handleProvinceChange}
              options={provinces?.map((province) => ({
                value: province.ProvinceID,
                label: province.ProvinceName,
              }))}
            />
          </Form.Item>
          <Form.Item name="districtID" hidden>
            <Input type="hidden" />
          </Form.Item>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Quận/ Huyện"
              name="districtName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá sản phẩm',
                },
              ]}
            >
              <Select
                className="w-full"
                size="large"
                onChange={handleDistrictChange}
                options={districts?.map((district) => ({
                  value: district.DistrictID,
                  label: district.DistrictName,
                }))}
                disabled={!selectedProvince}
              />
            </Form.Item>
            <Form.Item name="wardID" hidden>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              label="Xã/ Phường/ Thị trấn"
              name="wardName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá sản phẩm',
                },
              ]}
            >
              <Select
                className="w-full"
                size="large"
                onChange={handleWardChange}
                options={wards?.map((ward) => ({
                  value: ward.WardCode,
                  label: ward.WardName,
                }))}
                disabled={!selectedDistrict}
              />
            </Form.Item>
          </div>
          <Form.Item
            label="Địa chỉ cụ thể"
            name="detail"
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
