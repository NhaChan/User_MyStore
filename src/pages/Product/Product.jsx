import { Button, Checkbox, Divider, InputNumber, Pagination, Select, Skeleton, Slider } from 'antd'
import React, { useEffect, useState } from 'react'
import { showError } from '../../services/commonService'
import productService from '../../services/products/productService'
import { HomeOutlined } from '@ant-design/icons'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import CardProduct from '../../components/CardProduct/CardProduct'
import brandService from '../../services/products/brandService'
import categoryService from '../../services/products/categoryService'
import { FaAngleDown } from 'react-icons/fa'
import { BsFire } from 'react-icons/bs'
import Empty from '../../components/Empty'

const breadcrumb = [
  {
    path: '/',
    title: <HomeOutlined />,
  },
  {
    title: 'Sản phẩm',
  },
]

const Product = ({ search }) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [brands, setBrands] = useState([])
  const [categorys, setCategorys] = useState([])
  const [selectedBrandIds, setSelectedBrandIds] = useState([])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const [selectedSorter, setSelectedSorter] = useState(null)
  const [minPrice, setMinPrice] = useState(null)
  const [maxPrice, setMaxPrice] = useState(null)
  const [showAllBrands, setShowAllBrands] = useState(false)
  const [showAllCategorys, setShowAllCategorys] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [discount, setDiscount] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleShowAllBrands = () => {
    setShowAllBrands(true)
  }
  const handleShowAllCategorys = () => {
    setShowAllCategorys(true)
  }
  const handlePageChange = (newPage, newPageSize) => {
    setPage(newPage)
    setPageSize(newPageSize)
  }

  useEffect(() => {
    setLoading(true)
    setIsLoading(true)
    const fetchProducts = async () => {
      try {
        const res = await productService.getFilteredProducts({
          page,
          pageSize,
          search,
          brandIds: selectedBrandIds,
          categoryIds: selectedCategoryIds,
          sorter: selectedSorter,
          minPrice,
          maxPrice,
          discount,
        })
        // console.log("res", res.data.items);
        setProducts(res.data.items)
        setTotalItems(res.data.totalItems)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [
    page,
    pageSize,
    search,
    selectedBrandIds,
    priceRange,
    selectedCategoryIds,
    selectedSorter,
    minPrice,
    maxPrice,
    discount,
  ])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await brandService.getBrands()
        setBrands(res.data)
      } catch (error) {
        showError(error)
      }
    }

    fetchBrands()
  }, [])

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const res = await categoryService.getAllCategory()
        setCategorys(res.data)
      } catch (error) {
        console.error('Error fetching categorys:', error)
      }
    }

    fetchCategorys()
  }, [])

  const handleBrandChange = (brandId) => {
    setSelectedBrandIds((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId],
    )
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleSorterChange = (value) => {
    setSelectedSorter(value)
  }

  const handlePriceChange = (value) => {
    setPriceRange(value)
    setMinPrice(value[0])
    setMaxPrice(value[1])
  }

  const handleDiscountChange = (e) => {
    setDiscount(e.target.checked)
  }

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-50">
        <BreadcrumbLink breadcrumb={breadcrumb} />
      </div>
      <div className="px-8 py-4">
        <div className="flex items-center justify-end py-4">
          <div className="px-3 bg-gray-50 shadow-sm rounded-lg">
            <div>
              Sắp xếp:{' '}
              <Select
                style={{
                  width: 180,
                }}
                rootClassName="z-10"
                size="large"
                value={
                  selectedSorter === 1
                    ? 'Thấp đến Cao'
                    : selectedSorter === 2
                    ? 'Giá cao đến Thấp'
                    : selectedSorter === 3
                    ? 'Sản phẩm mới nhất'
                    : 'Bán chạy'
                }
                allowClear
                onChange={handleSorterChange}
                placeholder="Giá"
                options={[
                  { value: 0, label: 'Bán chạy' },
                  { value: 1, label: 'Giá Thấp đến Cao' },
                  { value: 2, label: 'Giá Cao đến Thấp' },
                  { value: 3, label: 'Sản phẩm mới nhất' },
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
              <div className=" border-gray-100 bg-gray-50 border-2 flex flex-col space-y-4 p-2">
                {categorys.slice(0, showAllCategorys ? categorys.length : 5).map((category) => (
                  <Checkbox key={category.id} onChange={() => handleCategoryChange(category.id)}>
                    <div className="w-full flex-col">{category.name}</div>
                  </Checkbox>
                ))}
              </div>
              {categorys.length > 5 && !showAllCategorys && (
                <div className="text-left text-black">
                  <Button type="text" onClick={handleShowAllCategorys}>
                    <div>
                      <span className="flex items-center">
                        Xem thêm
                        <FaAngleDown />
                      </span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
            <Divider />
            <div className="text-3xl text-sky-700 font-bold pb-3">Giá</div>
            <Slider
              range
              min={0}
              max={500000}
              onChange={handlePriceChange}
              value={priceRange}
              step={10000}
              className="pb-6"
            />
            <div className="flex pb-5 ">
              <InputNumber
                size="large"
                className="rounded-none w-full"
                placeholder="từ"
                formatter={(value) =>
                  value ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
                }
                parser={(value) => value.replace(/₫\s?|(\.*)/g, '').replace(/\./g, '')}
                onChange={(value) => setMinPrice(value)}
              />
              <span className="mx-1"> - </span>
              <InputNumber
                size="large"
                className="rounded-none w-full"
                formatter={(value) =>
                  value ? `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
                }
                parser={(value) => value.replace(/₫\s?|(\.*)/g, '').replace(/\./g, '')}
                placeholder="đến"
                onChange={(value) => setMaxPrice(value)}
              />
            </div>

            <Divider />
            <div className="">
              <div className="text-3xl text-sky-700 font-bold pb-3">Thương hiệu</div>
              <div className="h-[4px] w-[30%] bg-sky-700 mb-4" />
              <div className=" border-gray-100 bg-gray-50 border-2 flex flex-col space-y-4 p-2">
                {brands.slice(0, showAllBrands ? brands.length : 5).map((brand) => (
                  <Checkbox
                    key={brand.id}
                    onChange={() => handleBrandChange(brand.id)}
                    // className="text-lg"
                  >
                    <div className="w-full flex-col">{brand.name}</div>
                  </Checkbox>
                ))}
              </div>

              {brands.length > 5 && !showAllBrands && (
                <div className="text-left">
                  <Button type="text" onClick={handleShowAllBrands}>
                    <div>
                      <span className="flex items-center">
                        Xem thêm
                        <FaAngleDown />
                      </span>
                    </div>
                  </Button>
                </div>
              )}
            </div>
            <Divider />
            <div className="text-3xl">
              <Checkbox onChange={handleDiscountChange} checked={discount}>
                <span className="flex items-center text-2xl text-red-600">
                  <BsFire className=" " /> Đang giảm giá
                </span>
              </Checkbox>
            </div>
          </div>
          <div className="w-full lg:w-4/5 md:2/3">
            {loading ? (
              <Skeleton paragraph={{ rows: 15 }} />
            ) : (
              <>
                {products.length === 0 ? (
                  <div>
                    <Empty title="Không có sản phẩm nào!" />
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 pb-4">
                    {products.map((product, i) => (
                      <CardProduct product={product} key={i} isLoading={isLoading} />
                    ))}
                  </div>
                )}
                <div className="flex justify-center py-4">
                  <Pagination
                    // align="end"
                    hideOnSinglePage
                    showSizeChanger
                    current={page}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
