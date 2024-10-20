import { Button, Card, Divider, Form, Input, notification, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { showError } from '../../services/commonService'
import userService from '../../services/userService'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})
  const [form] = Form.useForm()
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await userService.getInfo()
        // console.log('info', res)
        setData(res.data)
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
    <div className="bg-gray-100 px-28 py-4 mb-2 h-full">
      <div className="flex flex-col lg:flex-row sm:flex-col justify-between lg:space-x-4">
        {isLoading ? (
          <Skeleton paragraph={{ rows: 15 }} />
        ) : (
          <>
            <div className="w-full lg:w-1/3 sm:w-full">
              <Card className="rounded-sm mb-2">
                <div className=" flex flex-col space-y-2 items-center justify-center">
                  <img
                    className="w-32 h-32 rounded-full "
                    src="https://i.pinimg.com/564x/c0/d3/21/c0d32107d903d756e9b14a24e8f34736.jpg"
                    alt="user"
                  />
                  <div>{data.fullname}</div>
                </div>
              </Card>
            </div>
            <div className="w-full lg:2/3 sm:w-full">
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
  )
}

export default Profile
