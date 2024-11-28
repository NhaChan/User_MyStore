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
    <div className="container mx-auto px-4 py-8 bg-white rounded-xl">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Danh mục sản phẩm</h2> */}
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Carousel
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 7 } },
            { breakpoint: 768, settings: { slidesToShow: 5 } },
            { breakpoint: 640, settings: { slidesToShow: 3 } },
          ]}
          infinite
          arrows
          autoplay
          autoplaySpeed={3000}
          slidesToShow={7}
          className="py-2"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer px-2"
            >
              <div className="flex flex-col items-center space-y-3 py-3">
                <div
                  className="relative p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full 
                              transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                >
                  <Image
                    preview={false}
                    src={toImageLink(category.imageUrl)}
                    alt={category.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default Category
