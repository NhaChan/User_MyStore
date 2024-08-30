import { Drawer, Dropdown, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../App'
import authService from '../../../services/authService'
import authActions from '../../../services/authAction'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { state, dispatch } = useAuth()
  // const [username, setUsername] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  // useEffect(() => {
  //   const user = authService.getCurrentUser()
  //   user ? setUsername(user.name) : setUsername('')
  // }, [state.isAuthenticated])

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
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const items = [
    {
      key: '1',
      label: <Link to="/login">Thông tin cá nhân</Link>,
    },
    {
      key: '2',
      label: (
        <Link target="_blank" rel="noopener noreferrer" to="/">
          Đơn đặt hàng
        </Link>
      ),
    },
    {
      key: '3',
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
          <Link to="/cart">
            <FaShoppingBag className="text-3xl text-sky-700 mx-4" />
          </Link>
          {state.isAuthenticated ? (
            <>
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
                    src="https://i.pinimg.com/564x/c0/d3/21/c0d32107d903d756e9b14a24e8f34736.jpg"
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
            </>
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
                to="/product"
                className={`block py-2 px-3 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-blue-700 ${
                  location.pathname === '/product' ? 'text-blue-700' : 'text-gray-900'
                }`}
              >
                Liên lạc
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Drawer onClose={onClose} open={open} placement="top" height={150}>
        <Input.Search placeholder="Tìm kiếm" size="large" />
      </Drawer>
    </>
  )
}

export default Header
