import { Badge, Card, notification, Rate } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { formatVND, toImageLink } from '../../services/commonService'
import { FavoritesContext } from '../../App'
import userService from '../../services/userService'
import { HeartFilled } from '@ant-design/icons'

const CardProduct = ({ product, isLoading }) => {
  const favorite = useContext(FavoritesContext)
  const [favorites, setFavorite] = favorite

  const isFavorite = favorites.includes(product.id)

  const clickFavorite = async () => {
    try {
      if (isFavorite) {
        await userService.deleteFavorite(product.id)
        setFavorite(favorites.filter((favId) => favId !== product.id))
      } else {
        await userService.addFavorite(product.id)
        setFavorite([...favorites, product.id])
      }
    } catch (error) {
      // showError(error)
      notification.error({ message: 'Bạn chưa đăng nhập tài khoản', placement: 'top' })
    }
  }

  const discountPrice = product.price - product.price * (product.discount / 100)
  return product.discount > 0 ? (
    <Link to={`/product-details/${product.id}?name=${product.name}`}>
      <Badge.Ribbon
        text={product.quantity <= 0 ? 'Hết hàng' : `${product.discount} %`}
        color={product.quantity <= 0 ? 'gold' : 'red'}
      >
        <Card
          hoverable={product.quantity <= 0 ? false : true}
          loading={isLoading}
          className="w-full h-fit"
          cover={
            <img
              // className="h-64 object-cover"
              className={
                product.quantity <= 0 ? 'h-64 object-cover filter grayscale' : 'h-64 object-cover'
              }
              alt={product.name}
              src={toImageLink(product.imageUrl)}
            />
          }
        >
          <div className="truncate w-32 md:w-48">{product.name}</div>
          <div className="py-2 flex justify-between">
            <div>
              <span className="text-red-600 text-lg font-sans">{formatVND(discountPrice)}</span>{' '}
              <span className="line-through">{formatVND(product.price)}</span>
            </div>
            <div onClick={(e) => e.preventDefault()}>
              <button onClick={clickFavorite}>
                <HeartFilled
                  className={`text-2xl z-10 top-1 ${isFavorite ? 'text-red-500' : 'text-gray-200'}`}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between text-gray-400">
            <div>
              <Rate className="text-sm" disabled count={1} value={1} />
              {product.rating}
            </div>
            <div>{product.sold} Đã bán</div>
          </div>
        </Card>
      </Badge.Ribbon>
    </Link>
  ) : (
    <Link to={`/product-details/${product.id}?name=${product.name}`}>
      <Badge.Ribbon text={product.quantity <= 0 && 'Hết hàng'} color="gold">
        <Card
          loading={isLoading}
          hoverable={product.quantity <= 0 ? false : true}
          className="w-full h-fit"
          cover={
            <img
              className={
                product.quantity <= 0 ? 'h-64 object-cover filter grayscale' : 'h-64 object-cover'
              }
              alt={product.name}
              src={toImageLink(product.imageUrl)}
            />
          }
        >
          <div className="truncate w-32 md:w-48">{product.name}</div>
          <div className="py-2 flex justify-between">
            <div>
              <span className="text-red-600 text-lg font-sans">{formatVND(discountPrice)}</span>{' '}
              <span className="line-through">{formatVND(product.price)}</span>
            </div>
            <div onClick={(e) => e.preventDefault()}>
              <button onClick={clickFavorite}>
                <HeartFilled
                  className={`text-2xl z-10 top-1 ${isFavorite ? 'text-red-500' : 'text-gray-200'}`}
                />
              </button>
            </div>
          </div>
          <div className="flex justify-between text-gray-400">
            <div>
              <Rate className="text-sm" disabled count={1} value={1} /> {product.rating}
            </div>
            <div>{product.sold} Đã bán</div>
          </div>
        </Card>
      </Badge.Ribbon>
    </Link>
  )
}

export default CardProduct
