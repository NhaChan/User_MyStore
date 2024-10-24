import React, { useEffect, useState } from 'react'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { HomeTwoTone } from '@ant-design/icons'
import { Button, Divider, Skeleton } from 'antd'
import SiderMenu from '../../components/SiderMenu/SiderMenu'
import userService from '../../services/userService'
import CardProduct from '../../components/CardProduct/CardProduct'
import { showError } from '../../services/commonService'

const Favorite = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize] = useState(5)

  const breadcrumb = [
    {
      path: '/',
      title: <HomeTwoTone />,
    },
    {
      title: 'Sản phẩm yêu thích',
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await userService.getFavoriteProduct(currentPage, currentPageSize)
        console.log(res.data.items)
        setData((prev) => [...prev, ...res.data.items])
        setTotalItems(res.data?.totalItems)
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentPage, currentPageSize])

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const loadMore =
    !isLoading && totalItems > data.length ? (
      <div className="text-center my-4">
        <Button onClick={handleLoadMore} size="large" className="rounded-none">
          Xem thêm
        </Button>
      </div>
    ) : null

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-100">
        <BreadcrumbLink breadcrumb={breadcrumb} />
      </div>
      <div className="lg:px-28 px-2 py-4 bg-gray-100">
        <div className=" flex justify-between lg:px-28 px-2">
          <div className="w-1/5">
            <SiderMenu />
          </div>
          {isLoading && currentPage === 1 ? (
            <Skeleton paragraph={{ rows: 15 }} />
          ) : (
            <>
              <div className="w-4/5">
                <div>
                  <div className="bg-white px-8 py-4">
                    <span className="text-2xl font-serif">Sản phẩm yêu thích</span>
                    <Divider className="mb-[0.1rem]" />
                    <div className="">
                      <div className=" bg-white py-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                        {data.map((product, i) => (
                          <CardProduct product={product} key={i} isLoading={isLoading} />
                        ))}
                      </div>
                    </div>
                    {loadMore}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Favorite
