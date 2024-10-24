import { Button, Divider, Form, Input, notification, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { showError } from '../../services/commonService'
import userService from '../../services/userService'
import BreadcrumbLink from '../../components/BreadcrumbLink'
import { HomeTwoTone } from '@ant-design/icons'
import SiderMenu from '../../components/SiderMenu/SiderMenu'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  // const [data, setData] = useState({})
  const [form] = Form.useForm()
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const breadcrumb = [
    {
      path: '/',
      title: <HomeTwoTone />,
    },
    {
      title: 'Thông tin cá nhân',
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await userService.getInfo()
        // console.log('info', res)
        // setData(res.data)
        const roles = res.data.roles && res.data.roles.length > 0 ? res.data.roles : ['']
        form.setFieldsValue({
          ...res.data,
          roles: roles,
        })
      } catch (error) {
        showError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [form])

  const handleOk = async () => {
    setLoadingUpdate(true)
    try {
      const value = await form.validateFields()
      //console.log(value)
      await userService.updateInfo(value)
      notification.success({ message: 'Cập nhật thông tin thành công.' })
    } catch (error) {
      showError(error)
    } finally {
      setLoadingUpdate(false)
    }
  }

  return (
    <>
      <div className="py-2 px-8 sticky top-[6rem] z-40 bg-gray-100">
        <BreadcrumbLink breadcrumb={breadcrumb} />
      </div>
      <div className="lg:px-28 px-2 py-4 bg-gray-100">
        <div className="h-[calc(100vh-6rem)] flex justify-between lg:px-28 px-2">
          <div className="w-1/5">
            <SiderMenu />
          </div>
          {isLoading ? (
            <Skeleton paragraph={{ rows: 15 }} />
          ) : (
            <>
              <div className="w-4/5">
                <div>
                  <div className="bg-white px-8 py-4">
                    <span className="text-2xl font-serif">Thông tin cá nhân</span>
                    <Divider />
                    <Form form={form} layout="vertical" onFinish={handleOk}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item name="id" hidden></Form.Item>
                        <Form.Item name="roles" hidden></Form.Item>
                        <Form.Item
                          label="Tên của bạn"
                          name="fullname"
                          rules={[
                            {
                              required: true,
                              message: 'Tên người nhận',
                            },
                          ]}
                        >
                          <Input size="large" placeholder="..." />
                        </Form.Item>
                        <Form.Item
                          label="Số điện thoại"
                          name="phoneNumber"
                          rules={[
                            {
                              required: true,
                              message: 'Số điện thoại là bắt buộc',
                            },
                          ]}
                        >
                          <Input size="large" placeholder="..." />
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: 'Số điện thoại là bắt buộc',
                            },
                          ]}
                        >
                          <Input size="large" placeholder="..." />
                        </Form.Item>
                      </div>
                      <div className="flex justify-end items-end">
                        <Button
                          type="primary"
                          className="border-0 rounded-none"
                          htmlType="submit"
                          size="large"
                          loading={loadingUpdate}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </Form>
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

export default Profile
