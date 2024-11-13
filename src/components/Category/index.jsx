import React, { useState, useEffect } from 'react'
import { Carousel, Image, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'

import categoryService from '../../services/products/categoryService'
import { showError, toImageLink } from '../../services/commonService'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        const res = await categoryService.getAllCategory()
        setCategories(res.data)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (categoryId) => {
    navigate('/product', { state: { selectedCategoryId: categoryId } })
  }

  return (
    <div className="container mx-auto md:px-20 px-4 bg-gray-100">
      {isLoading ? (
        <Skeleton />
      ) : (
        <Carousel
          responsive={[
            { breakpoint: 900, settings: { slidesToShow: 7 } },
            { breakpoint: 640, settings: { slidesToShow: 4 } },
          ]}
          infinite
          arrows
          autoplay
          autoplaySpeed={3000}
          slidesToShow={7}
          className="py-6"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="flex flex-col items-center"
            >
              <div className="items-center">
                <div className="md:px-6 px-2">
                  <Image
                    preview={false}
                    src={toImageLink(category.imageUrl)}
                    alt=""
                    className=" object-cover w-10 h-10 rounded-full drop-shadow-lg cursor-pointer hover: shadow-xl"
                  />
                </div>
                <div className="text-center mt-2">{category.name}</div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default Category
