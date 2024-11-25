import { Skeleton } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import productService from '../../services/products/productService'
import { showError } from '../../services/commonService'
import { Link } from 'react-router-dom'
import CardProduct from '../../components/CardProduct/CardProduct'
import Category from '../../components/Category'
import Policy from '../../components/Policy'
import CarouselComponent from '../../components/CarouselComponent'
import { ArrowRightOutlined, FireOutlined, PercentageOutlined } from '@ant-design/icons'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const discountSectionRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await productService.getAll()
        setData(data.data.items)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const bestSelling = data.sort((a, b) => b.sold - a.sold).slice(0, 6)

  const discounted = data
    .filter((product) => product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 6)

  const scrollToDiscountSection = () => {
    if (discountSectionRef.current) {
      discountSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <CarouselComponent />
        <section className="py-4">
          <Policy />
        </section>

        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-8 mb-12 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold">Khuyến mãi đặc biệt!</h2>
          <p className="mt-2 text-lg">Giảm giá lên đến 50% cho các sản phẩm văn phòng phẩm</p>
          <button
            onClick={scrollToDiscountSection}
            className="inline-block mt-4 px-6 py-3 bg-white text-orange-500 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
          >
            Xem ngay
          </button>
        </div>
        {/* Categories */}
        {/* <div className="flex justify-between px-8">
          <div>Sản phẩm</div>
          <div className="space-x-4">
            <Button>Tất cả</Button>
            <Button>Bút</Button>
            <Button>Sổ-tập-bao thư</Button>
            <Button>Kệ-rổ</Button>
          </div>
        </div> */}
        <div className="bg-white rounded-xl shadow-sm mb-12">
          <Category />
        </div>

        <div className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <FireOutlined className="text-3xl text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-800">Sản phẩm bán chạy</h2>
          </div>

          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 p-4">
                {bestSelling.map((product, i) => (
                  <CardProduct product={product} key={i} isLoading={isLoading} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link
                  to="/product"
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  <span>Xem tất cả</span>
                  <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Discounted Products Section */}
        <div
          ref={discountSectionRef}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8"
        >
          <div className="flex items-center justify-center gap-2 mb-8 text-red-500">
            <PercentageOutlined className="text-3xl " />
            <h2 className="text-3xl font-bold">Đang giảm giá</h2>
          </div>

          {isLoading ? (
            <Skeleton />
          ) : (
            <>
              <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-6">
                {discounted.map((product, i) => (
                  <CardProduct product={product} key={i} isLoading={isLoading} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Link
                  to="/product"
                  state={{ discount: true }}
                  className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  <span>Xem tất cả sản phẩm giảm giá</span>
                  <ArrowRightOutlined className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Chào mừng đến với cửa hàng của chúng tôi!
              </h2>
              <p className="text-gray-600 mb-4">
                Chúng tôi cung cấp đa dạng các sản phẩm văn phòng phẩm chất lượng cao, đặc biệt là
                các dụng cụ học tập cho học sinh. Khám phá ngay để tìm thấy những sản phẩm phù hợp
                nhất cho bạn!
              </p>
              <Link
                to="/news"
                className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://i.pinimg.com/736x/bb/11/a3/bb11a3fec42cda355df11fbd8b93ddf0.jpg"
                alt="School Supplies"
                className="rounded-lg shadow-lg object-cover w-full h-64"
              />
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        {/* {isLoading ? (
          <Skeleton />
        ) : (
          <Carousel
            responsive={[
              { breakpoint: 900, settings: { slidesToShow: 3 } },
              { breakpoint: 640, settings: { slidesToShow: 2 } },
            ]}
            infinite
            arrows
            autoplay
            autoplaySpeed={3000}
            slidesToShow={4}
            className="py-6"
          >
            {data.map((product, i) => (
              <Link key={i} to={`/product-details/${product.id}?name=${product.name}`}>
                {product.quantity > 0 && (
                  <div className="px-2">
                    <div className="flex flex-col border-2 lg:flex-row items-center justify-around space-x-2 px-2 py-4 bg-white rounded-lg hover:shadow-md hover:text-black transition-shadow duration-300 ease-in-out">
                      <img
                        className="rounded-full object-cover w-24 h-24"
                        src={toImageLink(product.imageUrl)}
                        alt={product.name}
                      />
                      <div className="">
                        <div className="text-md truncate w-32 md:w-36">{product.name}</div>
                        <Rate disabled count={1} value={product.rating || 0} className="mb-4" />
                        {product.rating !== undefined
                          ? product.rating % 2 === 0
                            ? product.rating
                            : product.rating.toFixed(1)
                          : 0}
                        <div className=" text-red-600">{formatVND(product.price)}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </Carousel>
        )} */}
      </div>
    </>
  )
}

export default Home
