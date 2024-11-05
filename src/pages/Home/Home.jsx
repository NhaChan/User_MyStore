import { Button, Carousel, Divider, Rate, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaCarSide } from 'react-icons/fa'
import { FaArrowsRotate, FaPhoneFlip } from 'react-icons/fa6'
import { MdOutlineSecurity } from 'react-icons/md'
import productService from '../../services/products/productService'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import { Link } from 'react-router-dom'
import CardProduct from '../../components/CardProduct/CardProduct'

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
      <div className="bg-gray-50">
        <div className="h-[calc(100vh-6rem)] bg-[url('/public/Carousel1.jpg')] bg-cover">
          <div className="h-full flex flex-col md:flex-row justify-around items-center backdrop-blur-md">
            <div className="p-4 w-full md:w-1/3">
              <p className="mt-4 text-xl md:text-3xl font-black text-blue-600 text-opacity-75 ">
                Mua sắm và trải nghiệm các ưu đãi!
              </p>
              <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full">
                Mua ngay
              </button>
            </div>
            <Carousel
              className="w-80 md:w-[30rem] h-64 md:h-80"
              autoplay
              autoplaySpeed={3000}
              infinite
            >
              <div>
                <img
                  src="/Carousel1.jpg"
                  alt=""
                  className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
                ></img>
              </div>
              <div>
                <img
                  src="/Carousel2.jpg"
                  alt=""
                  className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
                ></img>
              </div>
              <div>
                <img
                  src="/Carousel3.jpg"
                  alt=""
                  className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
                ></img>
              </div>
              <div>
                <img
                  src="/Carousel4.jpg"
                  alt=""
                  className="w-80 md:w-[30rem] h-64 md:h-80 bg-slate-800 text-red-500 rounded-lg drop-shadow-2xl"
                ></img>
              </div>
            </Carousel>
          </div>
        </div>

        {/* Categories */}

        <div className="p-4">
          <section className="py-8">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-16 px-8">
              <div className="flex flex-col justify-center items-center px-5 py-6 bg-white shadow-sm rounded-lg">
                <FaCarSide className="text-white text-6xl p-3 bg-indigo-600 bg-opacity-75 rounded-full " />
                <div className="text-center text-lg text-slate-400 p-3">Miễn phí giao hàng</div>
                <div className="text-slate-500">Khi mua đơn hơn 400.000đ</div>
              </div>

              <div className="flex flex-col items-center px-5 py-6 bg-white shadow-sm justify-center rounded-lg">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <MdOutlineSecurity className="text-white text-4xl" />
                </div>
                <div className="text-center text-lg text-slate-400 p-3">Thanh toán bảo mật</div>
                <div className="text-slate-500">100% bảo mật</div>
              </div>
              <div className="flex flex-col items-center px-5 py-6 bg-white shadow-sm justify-center rounded-lg">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <FaArrowsRotate className="text-white text-4xl" />
                </div>
                <div className="text-center text-lg text-slate-400 p-3">30 ngày hoàn trả</div>
                <div className="text-slate-500">Hoàn tiền trong 30 ngày</div>
              </div>
              <div className="flex flex-col items-center px-5 py-6 bg-white shadow-sm justify-center rounded-lg">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <FaPhoneFlip className="text-white text-4xl" />
                </div>
                <div className="text-center text-lg text-slate-400 p-3">Hỗ trợ 24/7</div>
                <div className="text-slate-500">Hỗ trợ mọi lúc nhanh nhất</div>
              </div>
            </div>
          </section>
          <div className="flex justify-between px-8">
            <div>Sản phẩm</div>
            <div className="space-x-4">
              <Button>Tất cả</Button>
              <Button>Bút</Button>
              <Button>Sổ-tập-bao thư</Button>
              <Button>Kệ-rổ</Button>
            </div>
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
                    <div className="flex flex-col lg:flex-row items-center justify-around space-x-2 px-2 py-4 bg-white shadow-md rounded-lg hover:shadow-lg hover:text-black transition-shadow duration-300 ease-in-out">
                      <img
                        className="rounded-full object-cover w-24 h-24"
                        src={toImageLink(product.imageUrl)}
                        alt={product.name}
                      />
                      <div className="">
                        <div className="text-md truncate w-32 md:w-36">{product.name}</div>
                        <Rate value={1} count={1} disabled />
                        <div className=" text-red-600">{formatVND(product.price)}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Carousel>
          )}

          <Divider plain className="border-0">
            <div className="text-4xl text-secondary">Bán chạy</div>
          </Divider>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 p-4">
              {bestSelling.map((product, i) => (
                <CardProduct product={product} key={i} isLoading={isLoading} />
              ))}
            </div>
          )}
          <Divider plain>
            <div className="text-4xl"> Đang giảm giá</div>
          </Divider>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-8 p-4">
              {discounted.map((product, i) => (
                <CardProduct product={product} key={i} isLoading={isLoading} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
