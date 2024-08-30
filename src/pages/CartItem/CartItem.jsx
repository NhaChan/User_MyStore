import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Divider, Image, Steps } from 'antd'
import React from 'react'

const CartItem = () => {
  return (
    <>
      <div className="bg-gray-50 py-5 px-10 h-screen">
        <div className="flex flex-col md:flex-row sm:flex-col justify-between space-x-4">
          <div className="w-3/4">
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
              <Divider className="my-[0.1rem] border-0" />
              <div className="bg-white p-4 grid grid-cols-6 text-sm">
                <div>Tất cả n sản phẩm</div>
                <div>Tên sản phẩm</div>
                <div>Đơn giá</div>
                <div>Số lượng</div>
                <div>Thành tiền</div>
                <div>
                  <DeleteOutlined className="text-end" />
                </div>
              </div>
              <Divider className="my-[0.3rem] border-0" />
              <div className="bg-white p-4 grid grid-cols-6 text-sm">
                <div className="flex items-center gap-4 ">
                  <Checkbox />
                  <Image src="/img1.jpg" width={100} height={100} />
                </div>
                <div className="flex items-center">Sản phẩm 1</div>
                <div className="flex items-center">20.000đ</div>
                <div className="flex items-center">6</div>
                <div className="flex items-center">120.000đ</div>
                <div className="flex items-center">
                  <DeleteOutlined />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <Card className="rounded-sm" title="Default size card">
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Divider className="my-[0.1rem] border-0" />
            <Button danger type='primary'
              size="large"
              className="w-full rounded-sm"
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItem
