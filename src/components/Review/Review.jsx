import { Card, Divider, Rate } from 'antd'
import React, { useEffect, useState } from 'react'
import { formatDateTime, showError, toImageLink } from '../../services/commonService'
import productService from '../../services/products/productService'
import { CiUser } from 'react-icons/ci'

const Review = ({ id, rating }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getReview(id)
        // console.log(res)
        setData(res.data.items)
      } catch (error) {
        showError(error)
      }
    }
    fetchData()
  }, [id])

  return (
    <>
      <button className="bg-red-50 w-full h-40 border-gray-500 text-red-500 mb-2">
        <span className="text-4xl font-bold">
          {rating !== undefined ? (rating % 2 === 0 ? rating : rating.toFixed(1)) : 0}
        </span>
        <span className="text-2xl"> trên 5</span>
        <Rate className="text-3xl" allowHalf disabled defaultValue={rating} />
      </button>
      {data.map((review, i) => (
        <React.Fragment key={review.id}>
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
          </Card>
          <Divider className="my-[0.5rem]" />
        </React.Fragment>
      ))}
    </>
  )
}

export default Review
