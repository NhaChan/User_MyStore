import { Badge, Button, Card, Carousel, Divider, Rate, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'
import React, { useEffect, useState } from 'react'
import { FaCarSide } from 'react-icons/fa'
import { FaArrowsRotate, FaPhoneFlip } from 'react-icons/fa6'
import { MdOutlineSecurity } from 'react-icons/md'
import productService from '../../services/products/productService'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import { Link } from 'react-router-dom'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await productService.getAll()
        console.log(res.data.items)
        setData(res.data.items)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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
              <div className="flex flex-col justify-center items-center px-5 py-6 bg-gray-50 shadow-sm rounded-lg">
                <FaCarSide className="text-white text-6xl p-3 bg-indigo-600 bg-opacity-75 rounded-full " />
                <div className="text-center text-xl text-slate-400 p-3">Miễn phí giao hàng</div>
                <div className="text-slate-500">Khi mua đơn hơn 400.000đ</div>
              </div>

              <div className="flex flex-col items-center px-5 py-6 bg-gray-50 shadow-sm justify-center rounded-lg">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <MdOutlineSecurity className="text-white text-4xl" />
                </div>
                <div className="text-center text-xl text-slate-400 p-3">Thanh toán bảo mật</div>
                <div className="text-slate-500">100% bảo mật</div>
              </div>
              <div className="flex flex-col items-center px-5 py-6 bg-gray-50 shadow-sm justify-center rounded-lg">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <FaArrowsRotate className="text-white text-4xl" />
                </div>
                <div className="text-center text-xl text-slate-400 p-3">30 ngày hoàn trả</div>
                <div className="text-slate-500">Hoàn tiền trong 30 ngày</div>
              </div>
              <div className="flex flex-col items-center px-5 py-6 bg-gray-50 shadow-sm justify-center rounded-lg">
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <FaPhoneFlip className="text-white text-4xl" />
                </div>
                <div className="text-center text-xl text-slate-400 p-3">Hỗ trợ 24/7</div>
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
                <Link to={`product-details/${product.id}`}>
                  <div key={i} className="px-2">
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

          <Divider plain>
            <div className="text-4xl text-secondary">Bán chạy</div>
          </Divider>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 p-4">
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
                      <div className="truncate w-32 md:w-36">{product.name}</div>
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
                        <div>{product.sold} Đã bán</div>
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
                    <div className="truncate w-32 md:w-48">{product.name}</div>
                    <div className="py-2">
                      <span className="text-red-600 text-lg font-sans">
                        {formatVND(product.price)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <div>
                        <Rate className="text-sm" disabled count={1} value={1} /> 4.7
                      </div>
                      <div>{product.sold} Đã bán</div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
          <Divider plain>
            <div className="text-4xl"> Đang giảm giá</div>
          </Divider>
          <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-8 p-4">
            <Card
              hoverable
              className="w-full"
              cover={<img className="h-64 object-cover" alt="example" src="/img2.jpg" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              className="w-full"
              cover={<img className="h-64 object-cover" alt="example" src="/img2.jpg" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              className="w-full"
              cover={<img className="h-64 object-cover" alt="example" src="/img2.jpg" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              className="w-full"
              cover={<img className="h-64 object-cover" alt="example" src="/img2.jpg" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              className="w-full"
              cover={<img className="h-64 object-cover" alt="example" src="/img2.jpg" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              className="w-full"
              cover={<img className="h-64 object-cover" alt="example" src="/img2.jpg" />}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
