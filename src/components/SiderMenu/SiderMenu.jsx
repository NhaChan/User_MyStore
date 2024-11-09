import { CalendarOutlined, HeartOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Menu, Modal, Tooltip } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import userService from '../../services/userService'
import { showError } from '../../services/commonService'
import { IoSettingsOutline } from 'react-icons/io5'
import { CiLogin } from 'react-icons/ci'
import { useAuth } from '../../App'
import authService from '../../services/authService'
import authActions from '../../services/authAction'

const items = [
  {
    key: '/profile',
    icon: <MailOutlined />,
    label: <Link to="/profile">Thông tin cá nhân</Link>,
  },
  {
    key: '/orders',
    icon: <CalendarOutlined />,
    label: <Link to="/orders">Đơn hàng</Link>,
  },
  {
    key: '/favorites',
    icon: <HeartOutlined />,
    label: <Link to="/favorites">Yêu thích</Link>,
  },
]

export default function SiderMenu() {
  const [collapsed, setCollapsed] = useState()
  const location = useLocation()
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { dispatch } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      //   setIsLoading(true)
      try {
        const res = await userService.getInfo()
        setData(res.data)
      } catch (error) {
        showError(error)
      }
      //   finally {
      //     setIsLoading(false)
      //   }
    }
    fetchData()
  }, [])

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
      
      <Sider
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        onBreakpoint={() => setCollapsed(false)}
        className="h-fit w-full"
        breakpoint="md"
        theme="light"
      >
        <Card className="rounded-sm mb-2">
          <div className="flex flex-col space-y-2 items-center justify-center">
                <img
                  className="w-32 h-32 rounded-full"
                  src="https://i.pinimg.com/736x/03/73/62/037362f54125111ea08efb8e42afb532.jpg"
                  alt="user"
                />
            <div>{data.fullname}</div>
            <div className="flex p-1">
              <div className="px-2">
                <Tooltip color="blue" title="Đổi mật khẩu">
                  <Button>
                    <IoSettingsOutline />
                  </Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip color="blue" title="Đăng xuất">
                  <Button onClick={showModal}>
                    <CiLogin />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </Card>
        <Menu
          className="rounded-lg drop-shadow"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  )
}
