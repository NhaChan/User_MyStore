import React, { useState, useEffect } from 'react'
import { Carousel, Image, Skeleton } from 'antd'
import { Link } from 'react-router-dom'

import categoryService from '../../services/products/categoryService'
import { showError, toImageLink } from '../../services/commonService'

const Category = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div className="container mx-auto md:px-20 px-4">
      {isLoading ? (
        <Skeleton />
      ) : (
        <Carousel
          responsive={[
            { breakpoint: 900, settings: { slidesToShow: 4 } },
            { breakpoint: 640, settings: { slidesToShow: 3 } },
          ]}
          infinite
          arrows
          autoplay
          autoplaySpeed={3000}
          slidesToShow={5}
          className="py-6"
        >
          {categories.map((category) => (
            <Link key={category.id}>
              <div className="">
                <div className="md:px-6 px-2">
                  <Image
                    preview={false}
                    src={toImageLink(category.imageUrl)}
                    alt={category.name}
                    className=" object-cover w-32 h-32"
                  />
                </div>
                {/* <div>{category.name}</div> */}
              </div>
            </Link>
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default Category
