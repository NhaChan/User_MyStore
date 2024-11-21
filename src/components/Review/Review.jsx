import { Button, Card, Divider, Pagination, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatDateTime, showError, toImageLink } from '../../services/commonService'
import productService from '../../services/products/productService'
import { CiUser } from 'react-icons/ci'
import Empty from '../Empty'

const Review = ({ id, rating }) => {
  const [data, setData] = useState([])
  const [filterStar, setFilterStar] = useState(0)
  const [filterDescription, setFilterDescription] = useState(false)
  const [filterImages, setFilterImages] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getReview(id)
        console.log(res.data)
        setData(res.data)
      } catch (error) {
        showError(error)
      }
    }
    fetchData()
  }, [id])

  const filteredItems = data?.items?.filter((review) => {
    const starCondition = filterStar === 0 || review.star === filterStar
    const descriptionCondition =
      !filterDescription || (review.description && review.description.trim() !== '')
    const imagesCondition = !filterImages || (review.imagesUrls && review.imagesUrls.length > 0)
    return starCondition && descriptionCondition && imagesCondition
  })

  return (
    <>
      <div className="flex flex-col-2 sm:flex-row p-8 bg-red-50 w-full border-red-700 text-red-500 mb-2">
        <div className="w-1/4">
          <div>
            <span className="text-4xl font-bold">
              {rating !== undefined ? (rating % 2 === 0 ? rating : rating.toFixed(1)) : 0}
            </span>
            <span className="text-2xl"> trên 5</span>
          </div>
          <Rate
            className="text-2xl hidden sm:block text-red-500"
            allowHalf
            disabled
            defaultValue={rating}
          />
        </div>
        <div className="w-3/4">
          <div className="mb-2">
            <Button
              size="large"
              onClick={() => setFilterStar(0)}
              className={`mx-1 px-6 rounded-none ${
                filterStar === 0 ? 'border-red-500 text-red-500' : ''
              }`}
            >
              Tất cả
            </Button>
            <Button
              size="large"
              onClick={() => setFilterStar(5)}
              className={`mx-1 px-6 rounded-none ${
                filterStar === 5 ? 'border-red-500 text-red-500' : ''
              }`}
            >
              5 Sao
            </Button>
            <Button
              size="large"
              onClick={() => setFilterStar(4)}
              className={`mx-1 px-6 rounded-none ${
                filterStar === 4 ? 'border-red-500 text-red-500' : ''
              }`}
            >
              4 Sao
            </Button>
            <Button
              size="large"
              onClick={() => setFilterStar(3)}
              className={`mx-1 px-6 rounded-none ${
                filterStar === 3 ? 'border-red-500 text-red-500' : ''
              }`}
            >
              3 Sao
            </Button>
            <Button
              size="large"
              onClick={() => setFilterStar(2)}
              className={`mx-1 px-6 rounded-none ${
                filterStar === 2 ? 'border-red-500 text-red-500' : ''
              }`}
            >
              2 Sao
            </Button>
            <Button
              size="large"
              onClick={() => setFilterStar(1)}
              className={`mx-1 px-6 rounded-none ${
                filterStar === 1 ? 'border-red-500 text-red-500' : ''
              }`}
            >
              1 Sao
            </Button>
          </div>
          <div className="">
            <Button
              size="large"
              onClick={() => setFilterDescription((prev) => !prev)}
              className={`mx-1 px-6 rounded-none ${
                filterDescription ? 'border-red-500 text-red-500' : ''
              }`}
            >
              Có Bình Luận
            </Button>
            <Button
              size="large"
              onClick={() => setFilterImages((prev) => !prev)}
              className={`mx-1 px-6 rounded-none ${
                filterImages ? 'border-red-500 text-red-500' : ''
              }`}
            >
              Có Hình Ảnh
            </Button>
          </div>
        </div>
      </div>
      {filteredItems && filteredItems.length > 0 ? (
        filteredItems.map((review, i) => (
          <React.Fragment key={review.id}>
            {review.star > 4 ? (
              <Card
                style={{
                  minWidth: 300,
                }}
                className="border-0"
              >
                <Card.Meta
                  key={i}
                  avatar={
                    <button className="p-2 border-2 border-orange-200 rounded-full hover:bg-orange-200">
                      <CiUser className="text-gray-500 text-2xl" />
                    </button>
                  }
                  title={
                    <div className="flex md:flex-row flex-col justify-between font-normal">
                      <div className="text-gray-600">{review.username}</div>
                      <p className="text-gray-400">{formatDateTime(review.createdAt)}</p>
                    </div>
                  }
                  description={
                    <div>
                      <Rate allowHalf disabled defaultValue={review.star} />
                      <div className="text-black mt-2 text-md sm:text-lg">{review.description}</div>
                    </div>
                  }
                />
                {review.imagesUrls && (
                  <div className="flex flex-wrap md:gap-2 gap-1 mt-2 px-14">
                    {review.imagesUrls.map((url, j) => (
                      <div key={j} className="flex">
                        <img
                          className="object-cover md:w-28 md:h-28 w-10 h-10"
                          src={toImageLink(url)}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="px-14 py-4">
                  <div className="bg-gray-50 p-2">
                    <span className="text-gray-300">Phản hồi từ shop: </span>
                    <span className="text-md sm:text-lg">
                      Cảm ơn bạn đã phản hồi về sản phẩm. Chúc bạn mua sắm vui vẻ. Shop cảm ơn bạn
                      nhé!!
                    </span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card
                style={{
                  minWidth: 300,
                }}
                className="border-0"
              >
                <Card.Meta
                  key={i}
                  avatar={
                    <button className="p-2 border-2 border-orange-200 rounded-full hover:bg-orange-200">
                      <CiUser className="text-gray-500 text-2xl" />
                    </button>
                  }
                  title={
                    <div className="flex md:flex-row flex-col justify-between font-normal">
                      <div className="text-gray-600">{review.username}</div>
                      <p className="text-gray-400">{formatDateTime(review.createdAt)}</p>
                    </div>
                  }
                  description={
                    <div>
                      <Rate allowHalf disabled defaultValue={review.star} />
                      <div className="text-black mt-2">{review.description}</div>
                    </div>
                  }
                />
                {review.imagesUrls && (
                  <div className="flex flex-wrap md:gap-2 gap-1 mt-2 px-14">
                    {review.imagesUrls.map((url, j) => (
                      <div key={j} className="flex">
                        <img
                          className="object-cover md:w-20 md:h-20 w-10 h-10"
                          src={toImageLink(url)}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="px-14 py-4">
                  <div className="bg-gray-50 p-2">
                    <span className="text-gray-300">Phản hồi từ shop: </span>Cảm ơn bạn đã phản hồi
                    về sản phẩm của shop chúng tôi. Nếu sản phẩm không phù hợp hay xảy ra vấn đề,
                    mong bạn nhắn shop giải quyết. Đừng vội đánh giá shop buồn.
                  </div>
                </div>
              </Card>
            )}
            <Divider className="my-[0.5rem]" />
          </React.Fragment>
        ))
      ) : (
        <Empty title="Không có đánh giá nào!" />
      )}
      <div className="flex justify-center py-4">
        <Pagination
          align="center"
          hideOnSinglePage
          showSizeChanger
          defaultCurrent={data.page}
          total={data.pageSize}
        />
      </div>
    </>
  )
}

export default Review
