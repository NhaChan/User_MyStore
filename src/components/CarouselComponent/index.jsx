import { Carousel, Button } from 'antd'
import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons'

const CarouselComponent = () => {
  const carouselImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073',
      alt: 'Đa dạng sản phẩm về tập sách',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?q=80&w=2048',
      alt: 'Dụng cụ học tập với nhiều kiểu dáng khác nhau',
    },
    {
      id: 3,
      url: 'https://i.pinimg.com/736x/8d/69/2a/8d692a178823267102b688381f85fb2f.jpg',
      alt: 'Trang trí khuôn viên làm việc thân thiện',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1568205612837-017257d2310a?q=80&w=2070',
      alt: 'Mua sắm dễ dàng',
    },
    {
      id: 5,
      url: 'https://i.pinimg.com/736x/bb/11/a3/bb11a3fec42cda355df11fbd8b93ddf0.jpg',
      alt: 'Desk Accessories and Stationery',
    },
  ]

  return (
    <div className="h-[calc(100vh-6rem)] bg-gradient-to-r from-blue-50 to-pink-50">
      <div className="h-full flex flex-col md:flex-row justify-around items-center px-4 md:px-12">
        {/* Left content section */}
        <div className="p-2 w-full md:w-1/2 animate-fadeIn">
          <p className="mt-4 text-2xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-pink-600 text-transparent bg-clip-text">
            Mua sắm và trải nghiệm
          </p>
          <p className="mt-2 text-xl md:text-4xl font-black bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
            các ưu đãi hấp dẫn!
          </p>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Khám phá bộ sưu tập mới nhất với các ưu đãi độc quyền
          </p>
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            className="mt-8 bg-gradient-to-r from-pink-500 to-purple-600 border-none hover:opacity-90 transform hover:scale-105 transition-all duration-300"
          >
            Mua sắm ngay
          </Button>
        </div>

        {/* Carousel section */}
        {/* <div className="w-full md:w-1/2 p-4">
          <Carousel
            className="w-full max-w-2xl mx-auto"
            autoplay
            autoplaySpeed={3000}
            effect="fade"
            dots={{ className: 'text-pink-600' }}
          >
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="p-2">
                <div className="relative group overflow-hidden rounded-2xl">
                  <img
                    src={`/Carousel${num}.jpg`}
                    alt={`Slide ${num}`}
                    className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </Carousel>
        </div> */}

        <div className="w-full md:w-1/2 p-4">
          <Carousel
            className="w-full max-w-2xl mx-auto"
            autoplay
            autoplaySpeed={3000}
            effect="fade"
            dots={{ className: 'text-pink-600' }}
          >
            {carouselImages.map((image) => (
              <div key={image.id} className="p-2">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-semibold mb-2">{image.alt}</h3>
                    <p className="text-sm opacity-90">Khám phá bộ sưu tập độc đáo của chúng tôi</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default CarouselComponent
