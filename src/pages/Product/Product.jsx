import { Badge, Card, Checkbox, Rate, Select, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import { Link } from 'react-router-dom'
import productService from '../../services/products/productService'

const Product = () => {
  const [inputValue, setInputValue] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [productAttributes, setProductAttributes] = useState({})
  const [selectCategory, seSelectCategory] = useState([])
  const [selectBrand, setSelectBrand] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await productService.getAll()
        const resAttributes = await productService.fetchProductAttributes()
        // console.log(res.data.items)
        setData(res.data.items)
        // console.log(resAttributes)
        setProductAttributes(resAttributes)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const onChange = (newValue) => {
    setInputValue(newValue)
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const handleBrand = (checkBrand) => {
    setSelectBrand(checkBrand)
  }

  const handleCategory = (checkCategory) => {
    seSelectCategory(checkCategory)
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
        <div className="w-full lg:w-1/4 md:1/3 px-4 mb-8 md:mb-0">
          <div className="text-2xl">Danh mục</div>
          <Checkbox.Group onChange={handleCategory} value={selectCategory} className="w-full">
            {productAttributes.categories?.map((category) => (
              <div key={category.id} className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 p-2">
                <Checkbox value={category.id}>{category.name}</Checkbox>
                {/* <div>(Số lượng)</div> */}
              </div>
            ))}
          </Checkbox.Group>
          <div className="text-2xl pt-4">Giá</div>
          <Slider
            min={10}
            max={100}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            className=""
          />
          <div className="text-2xl pt-4">Thương hiệu</div>
          <Checkbox.Group onChange={handleBrand} value={selectBrand} className="w-full">
            {productAttributes.brands?.map((brand) => (
              <div key={brand.id} className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 p-2">
                <Checkbox value={brand.id}>{brand.name}</Checkbox>
                {/* <div>(Số lượng)</div> */}
              </div>
            ))}
          </Checkbox.Group>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full lg:w-3/4 md:2/3">
          {data.map((product, i) => {
            const discountPrice = product.price - product.price * (product.discount / 100)
            return product.discount > 0 ? (
              <Link to={`product-details/${product.id}`}>
                <Badge.Ribbon key={i} text={`${product.discount} %`} color="red">
                  <Card
                    loading={isLoading}
                    hoverable
                    className="w-full h-fit"
                    cover={
                      <img
                        className="h-64 object-cover"
                        alt={product.name}
                        src={toImageLink(product.imageUrl)}
                      />
                    }
                  >
                    <div className="truncate w-36 md:w-48">{product.name}</div>
                    <div className="py-2">
                      <span className="text-red-600 text-lg font-sans">
                        {formatVND(discountPrice)}
                      </span>{' '}
                      <span className="line-through">{formatVND(product.price)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <div>
                        <Rate className="text-sm" disabled count={1} value={1} /> 4.7
                      </div>
                      <div>30 Đã bán</div>
                    </div>
                  </Card>
                </Badge.Ribbon>
              </Link>
            ) : (
              <Link to={`product-details/${product.id}`}>
                {' '}
                <Card
                  hoverable
                  key={i}
                  className="w-full h-fit"
                  cover={
                    <img
                      className="h-64 object-cover"
                      alt={product.name}
                      src={toImageLink(product.imageUrl)}
                    />
                  }
                >
                  <div className="truncate w-32 lg:w-56 ">{product.name}</div>
                  <div className="py-2">
                    <span className="text-red-600 text-lg font-sans">
                      {formatVND(product.price)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <div>
                      <Rate className="text-sm" disabled count={1} value={1} /> 4.7
                    </div>
                    <div>30 Đã bán</div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Product
