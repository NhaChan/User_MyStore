import { CalendarOutlined, HeartOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Menu, Modal, notification, Tooltip, Upload } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import userService from '../../services/userService'
import { showError, toImageLink } from '../../services/commonService'
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
  const [isModalAvt, setIsModalAvt] = useState(false)
  const { dispatch } = useAuth()
  const [fileList, setFileList] = useState([])
  const [loadingUpdate, setLoadingUpdate] = useState()

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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleUpdate = async () => {
    try {
      setLoadingUpdate(true)

      const formData = new FormData()

      const data = {
        image: fileList.length > 0 ? fileList[0]?.originFileObj : null,
      }
      Object.keys(data).forEach((key) => formData.append(key, data[key]))
      const res = await userService.updateAvt(formData)
      console.log(res)
      setData(res.data)
      notification.success({
        message: `Thành công.`,
      })
    } catch (error) {
      showError(error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const showModalAvt = () => {
    setIsModalAvt(true)
  }
  const handleLogout = () => {
    dispatch(authActions.LOGOUT)
    authService.logout()
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsModalAvt(false)
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
      <Modal
        title="Ảnh đại diện"
        open={isModalAvt}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy"
        confirmLoading={loadingUpdate}
        width={195}
      >
        <div className="flex justify-center">
          <Button type="dashed" className="w-full h-full flex items-center text-center">
            <Upload
              listType="picture-circle"
              fileList={fileList}
              onChange={onChange}
              accept="image/png, image/gif, image/jpeg, image/svg"
              maxCount={1}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : (
                <button type="button" className="text-center w-full">
                  <UploadOutlined />
                  <div>Chọn ảnh</div>
                </button>
              )}
            </Upload>
          </Button>{' '}
        </div>
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
            <Tooltip color="blue" title="Nhấn vào để đổi ảnh đại diện">
              {data.imageUrl ? (
                <img
                  onClick={showModalAvt}
                  className="w-32 h-32 rounded-full cursor-pointer"
                  src={toImageLink(data.imageUrl)}
                  alt="user"
                />
              ) : (
                <img
                  onClick={showModalAvt}
                  className="w-32 h-32 rounded-full cursor-pointer"
                  src="https://i.pinimg.com/736x/03/73/62/037362f54125111ea08efb8e42afb532.jpg"
                  alt="user"
                />
              )}
            </Tooltip>
            <div>{data.fullname}</div>
            <div className="flex p-1">
              <div className="px-2">
                <Tooltip color="blue" title="Đổi ảnh đại diện">
                  <Button onClick={showModalAvt}>
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
