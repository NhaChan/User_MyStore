import { Button, Checkbox, Divider, Select, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { showError } from '../../services/commonService'
import productService from '../../services/products/productService'
import { BsFire } from 'react-icons/bs'
import { HomeOutlined } from '@ant-design/icons'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import CardProduct from '../../components/CardProduct/CardProduct'

const breadcrumb = [
  {
    path: '/',
    title: <HomeOutlined />,
  },
  {
    title: 'Sản phẩm',
  },
]

const Product = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [productAttributes, setProductAttributes] = useState({})
  const [selectCategory, setSelectCategory] = useState([])
  const [selectBrand, setSelectBrand] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [sortOption, setSortOption] = useState(0)
  const [filterDiscount, setFilterDiscount] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)

  const fetchData = async (page = 1) => {
    setIsLoading(true)
    try {
      const resAttributes = await productService.fetchProductAttributes()
      const res = await productService.getFilteredProducts(
        page,
        10,
        filterDiscount,
        sortOption,
        selectCategory,
        selectBrand,
        null,
        priceRange[0],
        priceRange[1],
      )
      setProductAttributes(resAttributes)

      setTotalProducts(res.data.totalItems)
      if (page === 1) {
        setData(res.data.items)
      } else {
        setData((preData) => [...preData, ...res.data.items])
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    fetchData(1)
  }, [selectCategory, selectBrand, priceRange, sortOption, filterDiscount])

  const handleLoadMore = () => {
    const loadMore = currentPage + 1
    setCurrentPage(loadMore)
    fetchData(loadMore)
  }

  const handleBrandChange = (checkedBrands) => {
    // console.log(checkedBrands)
    setSelectBrand(checkedBrands)
  }

  const handleCategoryChange = (checkedCategories) => {
    setSelectCategory(checkedCategories)
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const handleSortChange = (value) => {
    setSortOption(value)
  }

  const handleDiscountChange = (e) => {
    setFilterDiscount(e.target.checked)
  }

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-50">
        <BreadcrumbLink breadcrumb={breadcrumb} />
      </div>
      <div className="p-8">
        <div className="flex items-center justify-end py-4">
          <div className="p-3 bg-gray-50 shadow-sm rounded-lg">
            <div>
              Sắp xếp:{' '}
              <Select
                size="large"
                rootClassName="z-10"
                defaultValue={0}
                style={{
                  width: 120,
                }}
                onChange={handleSortChange}
                options={[
                  { value: 0, label: 'Mặc định' },
                  { value: 1, label: 'Bán chạy' },
                  { value: 2, label: 'Giá cao nhất' },
                  { value: 3, label: 'Giá thấp nhất' },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row sm:flex-col justify-between">
          <div className="w-full lg:w-1/5 md:1/3 lg:pr-8 mb-8 md:mb-0">
            <div className="">
              <div className="text-3xl text-sky-700 font-bold pb-3">Danh mục</div>
              <div className="h-[4px] w-[30%] bg-sky-700 mb-4" />
              <Checkbox.Group
                onChange={handleCategoryChange}
                value={selectCategory}
                className="w-full flex-col border-gray-100 bg-gray-50 border-2"
              >
                {productAttributes.categories?.map((category) => (
                  <div key={category.id} className="p-2">
                    <Checkbox value={category.id}>{category.name}</Checkbox>
                  </div>
                ))}
              </Checkbox.Group>
            </div>
            <Divider />
            <div className="text-3xl text-sky-700 font-bold pb-3">Giá</div>
            <Slider
              range
              min={0}
              max={1000000}
              onChange={handlePriceChange}
              value={priceRange}
              step={50000}
            />
            <Divider />
            <div className="">
              <div className="text-3xl text-sky-700 font-bold pb-3">Thương hiệu</div>
              <div className="h-[4px] w-[30%] bg-sky-700 mb-4" />
              <Checkbox.Group
                onChange={handleBrandChange}
                value={selectBrand}
                className="w-full grid grid-cols-2 border-gray-100 bg-gray-50 border-2"
              >
                {productAttributes.brands?.map((brand) => (
                  <div key={brand.id} className="p-2">
                    <Checkbox value={brand.id}>{brand.name}</Checkbox>
                  </div>
                ))}
              </Checkbox.Group>
            </div>
            <Divider />
            <div className="text-3xl">
              <Checkbox onChange={handleDiscountChange} checked={filterDiscount}>
                <span className="flex items-center">
                  <BsFire className="text-red-700 text-2xl" /> Đang giảm giá
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="w-full lg:w-4/5 md:2/3">
            {data.length === 0 ? (
              <div className="text-center text-gray-500">Không có sản phẩm nào</div>
            ) : (
              <div className="grid lg:grid-cols-5 grid-cols-2 gap-4">
                {data.map((product, i) => (
                  <CardProduct product={product} key={i} isLoading={isLoading} />
                ))}
              </div>
            )}
            {data.length > 0 && totalProducts > data.length && (
              <div className="text-center my-4">
                <Button size="large" type="primary" className="bg-sky-700" onClick={handleLoadMore}>
                  Xem thêm
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
