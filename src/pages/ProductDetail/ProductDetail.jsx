import {
  Button,
  Carousel,
  Image,
  InputNumber,
  Rate,
  Tabs,
  Skeleton,
  notification,
  Divider,
} from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import productService from '../../services/products/productService'
import { useLocation, useParams } from 'react-router-dom'
import { BsCartPlus, BsFire } from 'react-icons/bs'
import cartService from '../../services/cartService'
import { HeartFilled, HeartOutlined, HomeOutlined } from '@ant-design/icons'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import userService from '../../services/userService'
import { CartContext, FavoritesContext } from '../../App'
import Review from '../../components/Review'
import { FaCheckCircle } from 'react-icons/fa'
import { TbArrowsRandom } from 'react-icons/tb'
import Description from '../../components/Description/Description'

const breadcrumb = (id, name) => [
  {
    path: '/',
    title: <HomeOutlined />,
  },
  {
    path: '/product',
    title: 'Sản phẩm',
  },
  {
    title: `${name}`,
  },
]

const ProductDetail = ({ product }) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isAddCart, setIsAddCart] = useState(false)
  // const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const favorite = useContext(FavoritesContext)
  const [favorites, setFavorite] = favorite
  const { countCart, setCountCart } = useContext(CartContext)
  // const [cartItems, setCartItems] = useState([])

  const { id: stringId } = useParams()
  const id = parseInt(stringId, 10)

  const isFavorite = favorites.includes(id)

  const clickFavorite = async () => {
    try {
      if (isFavorite) {
        await userService.deleteFavorite(id)
        setFavorite(favorites.filter((favId) => favId !== id))
      } else {
        await userService.addFavorite(id)
        setFavorite([...favorites, id])
      }
    } catch (error) {
      if (error.response?.status === 401) {
        notification.error({
          message: error.response.data || 'Bạn chưa đăng nhập tài khoản!',
          placement: 'top',
        })
      } else showError(error)
    }
  }

  const onChange = (key) => {
    // console.log(key)
  }
  const items = [
    {
      key: '1',
      label: <span className="">ĐÁNH GIÁ</span>,
      children: <Review id={id} rating={data.rating} />,
    },
    {
      key: '3',
      label: 'CHI TẾT SẨN PHẨM',
      children: <Description id={id} />,
    },
    {
      key: '2',
      label: 'VẬN CHUYỂN & TRẢ HÀNG',
      children: (
        <>
          <div className="py-6 text-lg">
            <div className="font-bold">VẬN CHUYỂN</div>
            <div>
              Phí giao hàng dao động từ 10.000đ đến 30.000đ, vận chuyển trong vòng 1 đến 7 ngày làm
              việc. Khách hàng có bất kỳ thắc mắc vui lòng liên hệ đến số điện thoại{' '}
              <span className="text-blue-700">090108912</span> để được tư vấn.
            </div>
          </div>
          <div className="text-lg">
            <div className="font-bold">TRẢ LẠI VÀ ĐỔI HÀNG</div>
            <div>
              Dễ dàng và miễn phí, trong vòng 14 ngày. Xem các điều kiện và thủ tục trong Câu hỏi
              thường gặp về hoàn trả của chúng tôi.
            </div>
          </div>
        </>
      ),
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
        console.log(res)
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

      const isProductInCart = countCart.some((productId) => productId === id)
      if (!isProductInCart) setCountCart((prev) => [...prev, id])

      notification.success({ message: 'Thêm vào giỏ hành thành công.', placement: 'top' })
    } catch (error) {
      // console.log(error)
      if (error.response?.status === 401) {
        notification.error({
          message: error.response.data || 'Bạn chưa đăng nhập tài khoản!',
          placement: 'top',
        })
      } else showError(error)
    } finally {
      setIsAddCart(false)
    }
  }

  return (
    <>
      <div className="py-2 px-8 sticky top-[5rem] z-40 bg-gray-50">
        <BreadcrumbLink breadcrumb={breadcrumb(id, queryParams.get('name'))} />
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
                    className="w-full max-w-md h-auto object-cover"
                  />
                </div>
                <Carousel
                  responsive={[
                    { breakpoint: 770, settings: { slidesToShow: 2 } },
                    { breakpoint: 640, settings: { slidesToShow: 3 } },
                  ]}
                  infinite
                  //arrows
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
                          className="object-contain w-20 h-20  md:w-20 md:h-20"
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
                <div className="flex flex-row justify-between items-baseline">
                  <div className="md:text-xl sm:text-md font-normal mb-2 pr-4">{data.name}</div>
                  <button onClick={clickFavorite}>
                    {isFavorite ? (
                      <HeartFilled className="text-xl md:text-3xl text-red-500" />
                    ) : (
                      <HeartOutlined className="text-xl md:text-3xl text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="text-gray-500 space-x-6 text-xl">
                  <span>
                    <Rate disabled allowHalf value={data.rating || 0} className="mb-2" />
                    {data.rating !== undefined
                      ? data.rating % 2 === 0
                        ? data.rating
                        : data.rating.toFixed(1)
                      : 0}
                  </span>
                  <span>|</span>
                  <span>{data.ratingCount} Đánh giá</span>
                  <span>|</span>
                  <span>{data.sold} Đã bán</span>
                </div>
                <div>
                  {data.discount > 0 ? (
                    <>
                      <div className="flex items-center w-full bg-gradient-to-r from-red-700 via-red-500 to-pink-500 p-2 text-white text-2xl">
                        <BsFire className="text-red-300 text-2xl" />
                        Đang được giảm giá
                      </div>
                      <div className="mb-2 p-4 bg-gray-50">
                        <span className="line-through text-xl">{formatVND(data.price)}</span>
                        <span className="text-3xl text-red-600 font-medium px-4">
                          {formatVND(discountPrice())}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="mb-2 p-4 bg-gray-50">
                      <span className="text-3xl font-medium text-red-500 ">
                        {formatVND(data.price)}
                      </span>
                    </div>
                  )}
                </div>
                {/* <div className="text-gray-700 mb-4">{data.description}</div> */}
                <div className="space-x-4 pt-2">
                  <span className="text-gray-500">Số lượng:</span>
                  <InputNumber
                    size="large"
                    min={1}
                    max={data.quantity}
                    defaultValue={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value)}
                    className="mb-2 rounded-none"
                  />
                  <span className="text-gray-500">{data.quantity} Sản phẩm có sẵn</span>
                </div>
                <div className="p-4 bg-gray-50">
                  <div className="flex text-2xl space-x-4 text-green-700 items-center">
                    <TbArrowsRandom className=" " />
                    <span>Màu ngẫu nhiên</span>
                  </div>
                  <Divider className="border-lime-500 my-[1rem]" />
                  <div className="flex mb-2 space-x-2 items-center">
                    <FaCheckCircle className="text-2xl text-red-700" />
                    <span>Dịch vụ gói quà miễn phí, nếu nhắn tin cho shop</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <FaCheckCircle className="text-2xl text-red-700" />
                    <span>Nhắn tin shop nếu muốn chọn màu bạn nhé!</span>
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  {/* <Button
                    size="large"
                    danger
                    type="primary"
                    className="rounded-none flex items-center justify-center p-6"
                  >
                    Mua ngay
                  </Button> */}

                  <Button
                    onClick={addToCart}
                    size="large"
                    danger
                    type="primary"
                    loading={isAddCart}
                    disabled={data.quantity <= 0 || isAddCart}
                    className="rounded-none flex items-center justify-center p-6"
                  >
                    <BsCartPlus className="text-xl" />
                    <div className="px-2 hidden sm:block">Thêm vào giỏ hàng</div>
                  </Button>
                </div>
              </Skeleton>
            </div>
          </div>
          <div className="p-12">
            <Tabs
              size="large"
              centered
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
