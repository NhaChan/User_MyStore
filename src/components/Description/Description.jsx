import React, { useEffect, useState } from 'react'
import productService from '../../services/products/productService'
import { showError, toImageLink } from '../../services/commonService'
import { Image, Skeleton } from 'antd'

const Description = ({ id }) => {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await productService.getById(id)
        console.log(res)
        setData(res.data)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="bg-gray-50 p-10 text-lg">{data.description}</div>
          {data.imageUrls &&
            data.imageUrls.length > 0 &&
            data.imageUrls.map((img, i) => (
              <div key={i} className="flex items-center justify-around">
                <div className="flex mb-2">
                  <Image
                    key={i}
                    width={500}
                    height={500}
                    src={toImageLink(img)}
                    className="object-cover rounded-md"
                    alt={`Product image ${i + 1}`}
                  />
                </div>
              </div>
            ))}
        </>
      )}
    </>
  )
}

export default Description
