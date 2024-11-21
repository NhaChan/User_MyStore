import { Avatar, Badge, Card, Drawer, Dropdown, Input, Modal, Skeleton } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CartContext, useAuth } from '../../../App'
import authService from '../../../services/authService'
import authActions from '../../../services/authAction'
import productService from '../../../services/products/productService'
import { formatVND, showError, toImageLink } from '../../../services/commonService'
import Empty from '../../Empty'
import debounce from 'debounce'
import userService from '../../../services/userService'
// import userService from '../../../services/userService'

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { state, dispatch } = useAuth()
  // const [username, setUsername] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [avatar, setAvatar] = useState(null)
  const { countCart } = useContext(CartContext)

  // useEffect(() => {
  //   const user = authService.getCurrentUser()
  //   user ? setUsername(user.name) : setUsername('')
  // }, [state.isAuthenticated])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await productService.getFilteredProducts({
          page: 1,
          pageSize: 4,
          search: searchValue,
        })
        setProducts(res.data.items)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (searchValue) {
      const debouncedFetch = debounce(fetchProducts, 300)
      debouncedFetch()

      return () => debouncedFetch.clear()
    } else {
      setProducts([])
    }
  }, [searchValue])

  useEffect(() => {
    const fetch = async () => {
      if (state.isAuthenticated) {
        try {
          const avt = await userService.getAvatar()
          setAvatar(avt.data?.imageUrl)
          // console.log(avt.data)
        } catch (error) {
          showError(error)
        }
      }
    }
    fetch()
  }, [state.isAuthenticated])

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleLogout = () => {
    dispatch(authActions.LOGOUT)
    authService.logout()
    // if (window.Kommunicate && typeof window.Kommunicate.logout === 'function') {
    //   window.Kommunicate.logout()
    // }
    // window.kommunicate = null
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSearch = (value) => {
    onSearch(value)
    setSearchValue('')
    navigate('/product')
    onClose()
  }

  const items = [
    {
      key: '1',
      label: <Link to="/profile">Thông tin cá nhân</Link>,
    },
    {
      key: '2',
      label: <Link to="/orders">Đơn đặt hàng</Link>,
    },
    {
      key: '3',
      label: <Link to="/favorites">Sản phẩm yêu thích</Link>,
    },
    {
      key: '4',
      label: (
        <div onClick={showModal} className="cursor-pointer">
          Đăng xuất
        </div>
      ),
    },
  ]

  return (
    <>
      <Modal
        title="Xác nhận đăng xuất"
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>
      <nav className="bg-white shadow-md px-6 sticky top-0 z-30 h-24 flex items-center justify-between max-w-screen-2xl">
        <Link to="/" className="flex items-center rtl:space-x-reverse">
          <img src="/logo2.png" className="w-32 md:w-48" alt="logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={showDrawer}
              className="p-2 border-2 border-blue-700 rounded-full hover:bg-orange-200"
            >
              <FaSearch className="text-sky-700 text-xl" />
            </button>
          </div>
          {state.isAuthenticated ? (
            <Badge count={countCart.length} size="small" showZero color="red">
              <Link to="/cart">
                <FaShoppingBag
                  className={`text-3xl text-sky-700 hover:text-orange-300 ml-4 ${
                    location.pathname === '/cart' ? 'text-orange-300' : 'text-sky-700'
                  }`}
                />
              </Link>
            </Badge>
          ) : (
            <Link to="/login">
              <FaShoppingBag
                className={`text-3xl text-sky-700 hover:text-orange-300 ml-4 ${
                  location.pathname === '/cart' ? 'text-orange-300' : 'text-sky-700'
                }`}
              />
            </Link>
          )}

          {state.isAuthenticated ? (
            <div className="pl-4">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <Dropdown menu={{ items }} trigger={['click']}>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      toImageLink(avatar) ||
                      'https://i.pinimg.com/736x/03/73/62/037362f54125111ea08efb8e42afb532.jpg'
                    }
                    alt="user"
                  />
                </Dropdown>
              </button>
              <button
                onClick={toggleMenu}
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                aria-controls="navbar-user"
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <Link to="/login">
              <FaUser className="text-3xl text-sky-700 mx-4" />
            </Link>
          )}
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700 ${
                  location.pathname === '/' ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                className={`block py-2 px-3 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700 ${
                  location.pathname === '/product' ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link
                to="/product-details"
                className={`block py-2 px-3 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700 ${
                  location.pathname === '/product-details' ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                Thông tin
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className={`block py-2 px-3 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700 ${
                  location.pathname === '/news' ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                Tin tức
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Drawer
        title="Tìm kiếm theo tên sản phẩm"
        onClose={onClose}
        open={open}
        placement="right"
        // styles={{ content: { height: 'fit-content' } }}
      >
        <Input.Search
          placeholder="Tìm kiếm"
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
        />

        {loading && searchValue ? (
          <Skeleton active />
        ) : products.length > 0 && searchValue ? (
          products.map((product) => (
            <Card
              className="rounded-none"
              key={product.id}
              style={{ width: '100%', marginBottom: 16 }}
              onClick={() => {
                navigate(`/product-details/${product.id}`)
                onClose()
              }}
            >
              <Card.Meta
                avatar={<Avatar className="w-24 h-24" src={toImageLink(product.imageUrl)} />}
                title={product.name}
                description={`Giá: ${formatVND(
                  product.price - product.price * (product.discount / 100),
                )}`}
              />
            </Card>
          ))
        ) : (
          searchValue && <Empty title="Không có sản phẩm nào được tìm thấy!" />
        )}
      </Drawer>
    </>
  )
}

export default Header
