import { Card, Radio, Select, Slider, Space } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useState } from 'react'

const Product = () => {
  const [inputValue, setInputValue] = useState(1)
  const onChange = (newValue) => {
    setInputValue(newValue)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const [value, setValue] = useState(1)
  const onChangeBrand = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <div className="p-8">
      <div className="text-2xl">Văn phòng phẩm</div>
      <div className="flex items-center justify-end py-4">
        <div className="p-3 bg-gray-50 shadow-sm rounded-lg">
          <div>
            Sắp xếp:{' '}
            <Select
              defaultValue="Mặc định"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'Bán chạy',
                  label: 'Bán chạy',
                },
                {
                  value: 'Cao nhất',
                  label: 'Cao nhất',
                },
                {
                  value: 'Thấp nhất',
                  label: 'Thấp nhất',
                },
                {
                  value: 'Bàn',
                  label: 'Bàn',
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row sm:flex-col justify-between">
        <div className="w-full lg:w-1/4 px-4 mb-8 md:mb-0">
          <div className="text-2xl">Danh mục</div>
          <div className="flex justify-between">
            <div>Bút</div>
            <div>(Số lượng)</div>
          </div>
          <div className="flex justify-between">
            <div>Bút</div>
            <div>(Số lượng)</div>
          </div>
          <div className="flex justify-between">
            <div>Bút</div>
            <div>(Số lượng)</div>
          </div>
          <div className="flex justify-between">
            <div>Bút</div>
            <div>(Số lượng)</div>
          </div>
          <div className="text-2xl pt-4">Giá</div>
          <Slider
            min={10}
            max={100}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            className=""
          />
          <div className="text-2xl pt-4">Thương hiệu</div>
          <Radio.Group onChange={onChangeBrand} value={value}>
            <Space direction="vertical">
              <Radio value={1}>A</Radio>
              <Radio value={2}>B</Radio>
              <Radio value={3}>C</Radio>
              <Radio value={4}>D</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full lg:w-3/4">
          <Card
            hoverable
            className="w-full"
            cover={<img className="h-64 object-cover" alt="example" src="/img1.jpg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            className="w-full"
            cover={<img className="h-64 object-cover" alt="example" src="/img1.jpg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            className="w-full"
            cover={<img className="h-64 object-cover" alt="example" src="/img1.jpg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            className="w-full"
            cover={<img className="h-64 object-cover" alt="example" src="/img1.jpg" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Product
