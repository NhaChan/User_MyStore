import { DeleteOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Skeleton,
  Steps,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import cartService from '../../services/cartService'
import TextArea from 'antd/es/input/TextArea'

const CartItem = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await cartService.getAllCartByUserId()
        setData(res.data)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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

  return (
    <>
      <div className="bg-gray-50 py-5 px-2 h-full">
        <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div className="w-full lg:2/3 sm:w-full">
                <div>
                  <div className="bg-white p-4">
                    <Steps
                      current={1}
                      items={[
                        {
                          title: '40.000 VND',
                          description: 'dưới 200.000 VND',
                        },
                        {
                          title: '20.000 VND',
                          description: 'từ 200.000 VND đến dưới 400.000 VND',
                        },
                        {
                          title: 'Miễn phí',
                          description: 'trên 400.000 VND',
                        },
                      ]}
                    />
                  </div>
                  <Divider className="my-[0.1rem] border-0 " />
                  <div className="bg-white p-4 grid grid-cols-6 text-sm">
                    <div>Tất cả n sản phẩm</div>
                    <div>Tên sản phẩm</div>
                    <div>Đơn giá</div>
                    <div>Số lượng</div>
                    <div>Thành tiền</div>
                    <div>
                      <DeleteOutlined className="text-end text-red-600" />
                    </div>
                  </div>
                  <Divider className="my-[0.3rem] border-0" />
                  {data.map((cartItem, i) => {
                    const totalPrice = cartItem.price * cartItem.quantity
                    return (
                      <div key={i}>
                        <div className="bg-white p-4 grid grid-cols-6 text-sm">
                          <div className="flex items-center gap-4 ">
                            <Checkbox />
                            <Image src={toImageLink(cartItem.imageUrl)} width={100} height={100} />
                          </div>
                          <div className="flex items-center truncate w-24 md:w-24 sm:w-6">
                            {cartItem.productName}
                          </div>
                          <div className="flex items-center">{formatVND(cartItem.price)}</div>
                          <div className="flex items-center">
                            <InputNumber defaultValue={cartItem.quantity}></InputNumber>
                          </div>
                          <div className="flex items-center">{formatVND(totalPrice)}</div>
                          <div className="flex items-center">
                            <DeleteOutlined className="text-red-600" />
                          </div>
                        </div>
                        <Divider className="my-[0.2rem] border-0" />
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="w-full lg:w-1/3 sm:w-full">
                <Card className="rounded-sm">
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
                  <Divider className="my-[1rem]" />
                  <div className="flex justify-between">
                    <div>Tạm tính</div>
                    <div>12.000.000đ</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Giảm giá</div>
                    <div>0đ</div>
                  </div>
                  <div className="flex justify-between">
                    <div>Phí giao hàng</div>
                    <div>40.000đ</div>
                  </div>
                  <Divider />
                  <div className="flex justify-between">
                    <div>Tổng tiền</div>
                    <div className="text-xl font-bold text-red-600">12.040.000đ</div>
                  </div>
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
              <Input size="large" />
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
              <Input size="large" />
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
