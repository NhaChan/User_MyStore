import { Button, Carousel, Image, InputNumber, Rate, Tabs, Skeleton, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import productService from '../../services/products/productService'
import { useParams } from 'react-router-dom'
import { BsCartPlus, BsFire } from 'react-icons/bs'
import cartService from '../../services/cartService'
import { HomeOutlined } from '@ant-design/icons'
import BreadcrumbLink from '../../components/BreadcrumbLink'

const breadcrumb = (id) => [
  {
    path: '/',
    title: <HomeOutlined />,
  },
  {
    path: '/product',
    title: 'Sản phẩm',
  },
  {
    title: `Chi tiết sản phẩm #${id}`,
  },
]

const ProductDetail = () => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isAddCart, setIsAddCart] = useState(false)
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const onChange = (key) => {
    console.log(key)
  }
  const items = [
    {
      key: '1',
      label: 'Mô tả',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Đánh giá',
      children: 'Content of Tab Pane 2',
    },
  ]

  const discountPrice = () => {
    return data.price - (data.price * data.discount) / 100
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await productService.getById(id)
        setData(res.data)
        setSelectedImage(toImageLink(res.data.imageUrls[0]))
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  const addToCart = async () => {
    setIsAddCart(true)
    try {
      const cartItem = {
        productId: id,
        quantity: quantity,
      }
      await cartService.addToCart(cartItem)
      notification.success({ message: 'Thêm vào giỏ hành thành công.' })
    } catch (error) {
      if (error.response?.status === 401) {
        notification.error({ message: error.response.data || 'Bạn chưa đăng nhập tài khoản!' })
      }
    } finally {
      setIsAddCart(false)
    }
  }

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-50">
        <BreadcrumbLink breadcrumb={breadcrumb(id)} />
      </div>
      <div className="md:px-10 sm:p-2 bg-gray-50">
        <div className="bg-white">
          <div className="flex flex-col lg:flex-row md:flex-col p-8">
            {isLoading ? (
              <Skeleton.Image className="w-full lg:w-1/2 px-4 mb-8 md:mb-0" />
            ) : (
              <div className="w-full lg:w-1/3 px-4 mb-8 md:mb-0 space-y-1">
                <div className="flex items-center justify-center">
                  <Image
                    width={500}
                    height={450}
                    src={selectedImage}
                    className="w-full max-w-md h-auto"
                  />
                </div>
                <Carousel
                  responsive={[
                    { breakpoint: 770, settings: { slidesToShow: 2 } },
                    { breakpoint: 640, settings: { slidesToShow: 3 } },
                  ]}
                  infinite
                  arrows
                  autoplay
                  autoplaySpeed={3000}
                  slidesToShow={4}
                  centerMode
                >
                  {data.imageUrls &&
                    data.imageUrls.map((url, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImage(toImageLink(url))}
                        className={`cursor-pointer p-1 ${
                          selectedImage === toImageLink(url)
                            ? 'border-2 border-gray-300'
                            : 'border-none'
                        }`}
                      >
                        <img
                          className="object-cover w-20 h-20  md:w-20 md:h-20"
                          src={toImageLink(url)}
                          alt={url}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            )}

            <div className="w-full lg:w-2/3 px-4 space-y-4">
              <Skeleton loading={isLoading} active>
                <div className="md:text-xl sm:text-md font-normal mb-4">{data.name}</div>
                <div className="text-gray-500 space-x-6">
                  <span>
                    <Rate count={1} value={1} className="mb-4" /> 4.7
                  </span>
                  <span>|</span>
                  <span>6.8k Đánh giá</span>
                  <span>|</span>
                  <span>{data.sold} Đã bán</span>
                </div>
                <div>
                  <div className="flex items-center w-full bg-gradient-to-r from-red-700 via-red-500 to-pink-500 p-2 text-white text-2xl">
                    <BsFire className="text-red-300 text-2xl" />
                    Flash Sale
                  </div>
                  <div className="mb-2 p-4 bg-gray-50">
                    {data.discount > 0 ? (
                      <>
                        <span className="line-through text-xl">{formatVND(data.price)}</span>
                        <span className="text-3xl text-red-600 font-medium px-4">
                          {formatVND(discountPrice())}
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl text-red-500 font-medium">
                        {formatVND(data.price)}
                      </span>
                    )}
                  </div>
                </div>
                {/* <div className="text-gray-700 mb-4">{data.description}</div> */}
                <div className="space-x-4 pt-4">
                  <span className="text-gray-500">Số lượng:</span>
                  <InputNumber
                    size="large"
                    min={1}
                    max={data.quantity}
                    defaultValue={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                    className="mb-4 rounded-none"
                  />
                  <span className="text-gray-500">{data.quantity} Sản phẩm có sẵn</span>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button
                    size="large"
                    danger
                    type="primary"
                    className="rounded-none flex items-center justify-center p-6"
                  >
                    Mua ngay
                  </Button>
                  <Button
                    onClick={addToCart}
                    size="large"
                    danger
                    loading={isAddCart}
                    disabled={isAddCart}
                    className="rounded-none flex items-center justify-center p-6"
                  >
                    <BsCartPlus className="text-xl" />
                    <span className="px-2">Thêm vào giỏ hàng</span>
                  </Button>
                </div>
              </Skeleton>
            </div>
          </div>
          <div className="p-12">
            <Tabs
              size="large"
              className="p-4 border border-gray-100"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
