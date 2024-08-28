import { Button, Carousel, Image, InputNumber, Rate, Tabs, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatVND, showError, toImageLink } from '../../services/commonService'
import productService from '../../services/products/productService'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState('')

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

  return (
    <div className="md:py-10 md:px-20 sm:p-2 bg-gray-50">
      <div className="bg-white">
        <div className="flex flex-col lg:flex-row md:flex-col p-8">
          {isLoading ? (
            <Skeleton.Image className="w-full lg:w-1/2 px-4 mb-8 md:mb-0" />
          ) : (
            <div className="w-full lg:w-1/2 px-4 mb-8 md:mb-0">
              <div className="flex items-center justify-center p-4">
                <Image
                  src={selectedImage}
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
                />
              </div>
              <Carousel
                responsive={[
                  { breakpoint: 770, settings: { slidesToShow: 3 } },
                  { breakpoint: 640, settings: { slidesToShow: 2 } },
                ]}
                infinite
                arrows
                autoplay
                autoplaySpeed={3000}
                slidesToShow={5}
                centerMode
              >
                {data.imageUrls &&
                  data.imageUrls.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(toImageLink(url))}
                      className="cursor-pointer"
                    >
                      <img className="object-cover w-20 h-20" src={toImageLink(url)} alt={url} />
                    </div>
                  ))}
              </Carousel>
            </div>
          )}

          <div className="w-full lg:w-1/2 px-4">
            <Skeleton loading={isLoading} active>
              <div className="md:text-xl sm:text-md font-normal mb-4">{data.name}</div>
              <div>
                <Rate count={1} value={1} className="mb-4" /> 4.7
                <div></div>
              </div>
              <div className="mb-2 p-4 bg-gray-50">
                {data.discount > 0 ? (
                  <>
                    <span className="line-through ">{formatVND(data.price)}</span>
                    <span className="text-2xl text-red-500 font-medium px-4">
                      {formatVND(discountPrice())}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl text-red-500 font-medium">{formatVND(data.price)}</span>
                )}
              </div>
              <div className="text-gray-700 mb-4">{data.description}</div>
              <InputNumber min={1} max={10} defaultValue={1} className="mb-4" />
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button type="primary" className="w-full">
                  Thêm giỏ hàng
                </Button>
                <Button danger className="w-full">
                  Mua ngay
                </Button>
              </div>
            </Skeleton>
          </div>
        </div>
        <Skeleton loading={isLoading} active>
          <Tabs className="p-4" centered defaultActiveKey="1" items={items} onChange={onChange} />
        </Skeleton>
      </div>
    </div>
  )
}

export default ProductDetail
