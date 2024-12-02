import { Avatar, Badge, Card, Drawer, Dropdown, Input, Modal, Skeleton, Spin } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
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

import * as tf from '@tensorflow/tfjs'
import ButtonHandler from '../../ImageSearch/ImageSearch'
import { detect } from '../../../utils/detect'

const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  const [openDrawer, setOpenDrawer] = useState(false)
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }) // init model & input shape

  // references
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

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
    setOpenDrawer(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen)
  // }

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

  const showImageDrawer = () => {
    setOpenDrawer(true)
  }

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        // `${window.location.href}/${modelName}_web_model/model.json`,
        'yolov8n_web_model/model.json',
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }) // set loading fractions
          },
        },
      ) // load model

      // warming up model
      // const dummyInput = tf.ones(yolov8.inputs[0].shape)
      const dummyInput = tf.zeros(yolov8.inputs[0].shape)
      const warmupResults = yolov8.execute(dummyInput)

      setLoading({ loading: false, progress: 1 })
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      }) // set model & input shape

      tf.dispose([warmupResults, dummyInput]) // cleanup memory
    })
  }, [])

  const handleImageDetection = async (imageElement) => {
    setLoading(true)
    try {
      const labels = await detect(imageElement, model) // Gọi hàm detect để lấy predictedLabels
      setSearchValue(labels)
      // setSearchValue(labels.join(' ')) // Cập nhật searchValue với các label dự đoán
      setOpenDrawer(true)
    } catch (error) {
      console.error('Error detecting image:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProductsByKeywords = async (keywords) => {
    setLoading(true)
    try {
      const allResults = await Promise.all(
        keywords.map((keyword) =>
          productService.getFilteredProducts({
            page: 1,
            pageSize: 4,
            search: keyword,
          }),
        ),
      )
      // Hợp nhất các sản phẩm từ các kết quả tìm kiếm
      const mergedResults = allResults.flatMap((res) => res.data.items)
      // Loại bỏ sản phẩm trùng lặp (dựa trên ID hoặc thuộc tính duy nhất)
      const uniqueProducts = Array.from(
        new Map(mergedResults.map((item) => [item.id, item])).values(),
      )
      setProducts(uniqueProducts)
    } catch (error) {
      console.error('Error fetching products by keywords:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('Search value:', searchValue) // Log kiểm tra giá trị
    if (searchValue) {
      const fetchProducts = async () => {
        if (Array.isArray(searchValue)) {
          await fetchProductsByKeywords(searchValue)
        } else {
          // Trường hợp là chuỗi
          setLoading(true)
          try {
            const res = await productService.getFilteredProducts({
              page: 1,
              pageSize: 4,
              search: searchValue,
            })
            console.log('API response:', res.data.items)
            setProducts(res.data.items)
          } catch (error) {
            console.error('Error:', error)
          } finally {
            setLoading(false)
          }
        }
      }

      const debouncedFetch = debounce(fetchProducts, 300)
      debouncedFetch()
      return () => debouncedFetch.clear()
    } else {
      setProducts([])
    }
  }, [searchValue])

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
      <Drawer
        title={
          <span className="text-xl font-semibold text-sky-700">Tìm kiếm theo ảnh sản phẩm</span>
        }
        onClose={onClose}
        open={openDrawer}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src={imageRef.current?.src}
            alt="Uploaded"
            style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '20px' }}
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
        </div>
      </Drawer>

      <nav className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo với responsive */}
            <div className="flex-shrink-0">
              <Link to="/" className="block hover:opacity-90 transition-opacity">
                <img src="/logo2.png" className="h-12 w-auto sm:h-14 md:h-16" alt="logo" />
              </Link>
            </div>

            {/* Menu chính - ẩn trên mobile */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-base font-medium transition-all duration-200 border-b-2 hover:border-blue-600 py-1 ${
                  location.pathname === '/'
                    ? 'text-sky-700 border-sky-700 font-semibold'
                    : 'text-gray-700 border-transparent'
                }`}
              >
                Trang chủ
              </Link>
              <Link
                to="/product"
                className={`text-base font-medium transition-all duration-200 border-b-2 hover:border-blue-600 py-1 ${
                  location.pathname === '/product'
                    ? 'text-sky-700 border-sky-700 font-semibold'
                    : 'text-gray-700 border-transparent'
                }`}
              >
                Sản phẩm
              </Link>
              <Link
                to="/news"
                className={`text-base font-medium transition-all duration-200 border-b-2 hover:border-blue-600 py-1 ${
                  location.pathname === '/news'
                    ? 'text-sky-700 border-sky-700 font-semibold'
                    : 'text-gray-700 border-transparent'
                }`}
              >
                Giới thiệu
              </Link>
            </div>

            {/* Icons group */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div>
                {loading.loading && <Spin className="absolute z-10" />}
                <div className="relative flex flex-col items-center justify-center max-w-2xl mx-auto">
                  <img
                    src="#"
                    className="max-w-full h-auto rounded-md"
                    ref={imageRef}
                    alt=""
                    // onLoad={() => detect(imageRef.current, model, canvasRef.current)}
                    onLoad={() => {
                      handleImageDetection(imageRef.current) // Gọi tự động khi ảnh được tải lên
                      showImageDrawer() // Hiển thị Drawer ngay sau khi ảnh được xử lý
                    }}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  />
                </div>
                <ButtonHandler imageRef={imageRef} />
              </div>

              {/* Search button */}
              <button
                type="button"
                onClick={showDrawer}
                className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-200 relative group"
              >
                <FaSearch className="text-sky-700 text-xl" />
                {/* <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Tìm kiếm
                </span> */}
              </button>

              {/* Cart icon với badge được cải thiện */}
              {state.isAuthenticated ? (
                <div className="relative group">
                  <Badge
                    count={countCart.length}
                    size="small"
                    showZero
                    // color="red"
                    className="cursor-pointer"
                  >
                    <Link
                      to="/cart"
                      className={
                        location.pathname === '/cart'
                          ? 'text-2xl text-blue-500'
                          : 'text-2xl text-sky-700'
                      }
                    >
                      <FaShoppingBag className="text-2xl hover:text-blue-500 transition-colors duration-200" />
                    </Link>
                  </Badge>
                  {/* <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Giỏ hàng
                  </span> */}
                </div>
              ) : (
                <Link to="/login">
                  <FaShoppingBag
                    className={`text-2xl text-sky-700 hover:text-orange-300 ${
                      location.pathname === '/cart' ? 'text-orange-300' : 'text-sky-700'
                    }`}
                  />
                </Link>
              )}

              {/* User avatar/profile với hiệu ứng mới */}
              {state.isAuthenticated ? (
                <div className="group relative">
                  <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
                    <div className="cursor-pointer">
                      <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 hover:border-blue-400 transition-all duration-200 shadow-sm"
                        src={
                          toImageLink(avatar) ||
                          'https://i.pinimg.com/736x/03/73/62/037362f54125111ea08efb8e42afb532.jpg'
                        }
                        alt="user"
                      />
                    </div>
                  </Dropdown>
                </div>
              ) : (
                <Link to="/login" className="group relative">
                  <FaUser className="text-2xl text-sky-700 hover:text-blue-500 transition-colors duration-200" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Đăng nhập
                  </span>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-4`}>
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-sky-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Trang chủ
              </Link>
              <Link
                to="/product"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === '/product'
                    ? 'bg-blue-50 text-sky-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Sản phẩm
              </Link>
              <Link
                to="/news"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  location.pathname === '/news'
                    ? 'bg-blue-50 text-sky-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Giới thiệu
              </Link>
              {/* ... các menu item khác tương tự ... */}
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer search được cải thiện */}
      <Drawer
        title={<span className="text-xl font-semibold text-sky-700">Tìm kiếm sản phẩm</span>}
        onClose={onClose}
        open={open}
        placement="right"
        className="rounded-l-lg"
        width={320}
      >
        <Input.Search
          placeholder="Nhập tên sản phẩm..."
          size="large"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={handleSearch}
          className="mb-4"
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
