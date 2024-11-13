import { Carousel, Rate, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import productService from '../../services/products/productService'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import { Link } from 'react-router-dom'
import CardProduct from '../../components/CardProduct/CardProduct'
import Category from '../../components/Category'
import Policy from '../../components/Policy'
import CarouselComponent from '../../components/CarouselComponent'
import { ArrowRightOutlined } from '@ant-design/icons'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

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

  return (
    <>
      <div className="">
        <CarouselComponent />
        <section className="py-4">
          <Policy />
        </section>
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
        <div>
          <Category />
        </div>

        <div className="">
          <div className="bg-gray-50 p-8">
            <div className="flex justify-center text-4xl text-secondary items-center">Bán chạy</div>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 p-4">
                  {bestSelling.map((product, i) => (
                    <CardProduct product={product} key={i} isLoading={isLoading} />
                  ))}
                </div>
                <div className="flex justify-center">
                  <Link to="/product" className="flex items-center hover:text-blue-600">
                    <span>Xem tất cả</span> <ArrowRightOutlined />
                  </Link>{' '}
                </div>
              </>
            )}
          </div>
          <div className="p-8">
            <div className="flex justify-center p-4 text-4xl text-secondary items-center">
              Đang giảm giá
            </div>
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-8 p-4">
                  {discounted.map((product, i) => (
                    <CardProduct product={product} key={i} isLoading={isLoading} />
                  ))}
                </div>
                <Link
                  to="/product"
                  state={{ discount: true }}
                  className="flex justify-center hover:text-blue-600"
                >
                  <span>Xem tất cả</span> <ArrowRightOutlined />
                </Link>
              </>
            )}
          </div>
          {isLoading ? (
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
                </Link>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
