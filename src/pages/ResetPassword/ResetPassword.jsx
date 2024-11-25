import { Button, Form, Input, notification, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { showError } from '../../services/commonService'
import authService from '../../services/authService'

const ResetPassword = () => {
  const [form] = Form.useForm()
  const [loadingSendEMail, setLoadingSendEMail] = useState(false)
  const [loadingConfirmCode, setLoadingConfirmCode] = useState(false)
  const [loadingResetPW, setLoadingResetPW] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isConfirmCode, setIsConfirmCode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((preTimer) => preTimer - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [timer])

  const handleSendCode = async () => {
    setLoadingSendEMail(true)
    try {
      await authService.codeResetPassword(form.getFieldsValue('email'))
      // console.log(res)
      notification.success({
        message: 'Gửi mã thành công',
        placement: 'top',
      })
      setTimer(60)
      setIsCodeSent(true)
    } catch (error) {
      showError(error)
    } finally {
      setLoadingSendEMail(false)
    }
  }

  const handleConfirmCode = async () => {
    setLoadingConfirmCode(true)
    try {
      const email = form.getFieldValue('email')
      const code = form.getFieldValue('token')
      await authService.confirmCode({ email: email, token: code })
      notification.success({
        message: 'Xác nhận mã thành công',
        placement: 'top',
      })
      setIsConfirmCode(true)
    } catch (error) {
      showError(error)
    } finally {
      setLoadingConfirmCode(false)
    }
  }

  const handleResetPassword = async () => {
    setLoadingResetPW(true)
    try {
      const email = form.getFieldValue('email')
      const code = form.getFieldValue('token')
      const items = form.getFieldsValue()
      const data = {
        email: email,
        token: code,
        ...items,
      }
      await authService.resetPassword(data)
      // console.log(res)
      notification.success({
        message: 'Đổi mật khẩu thành công.',
        placement: 'top',
      })
      navigate('/login')
    } catch (error) {
      showError(error)
      // console.log(error)
    } finally {
      setLoadingResetPW(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l to-blue-500 from-sky-50">
      <div className="w-4/5 md:w-3/5 lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-10 py-16 col-span-2 md:col-span-1">
          {!isCodeSent ? (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đổi mật khẩu</h2>
              <Form form={form} onFinish={handleSendCode}>
                <Form.Item
                  // label="Email"
                  name="email"
                  hasFeedback
                  rules={[
                    {
                      type: 'email',
                      message: 'Email không đúng định dạng',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-300 mx-1" />}
                    placeholder="Email"
                    size="large"
                    className="text-gray-600"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={loadingSendEMail}
                  className="w-full px-4 text-white bg-blue-700 rounded-sm hover:bg-blue-600"
                >
                  {loadingSendEMail ? <Spin /> : 'TIẾP THEO'}
                </Button>
              </Form>
            </>
          ) : !isConfirmCode ? (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                Nhập mã xác nhận
              </h2>
              <Form form={form} onFinish={handleConfirmCode}>
                <Form.Item
                  // label="Email"
                  name="token"
                  hasFeedback
                  className="flex text-center justify-center p-4"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mã xác thực!',
                    },
                  ]}
                >
                  <Input.OTP size="large" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full px-4 text-white bg-blue-700 rounded-sm hover:bg-blue-600"
                >
                  {loadingConfirmCode ? <Spin /> : 'TIẾP THEO'}
                </Button>
              </Form>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center justify-center ">
                <img src="logo2.png" alt="Logo" className="w-96 mx-auto" />
              </div>
              {/* <div className="px-10 py-16 col-span-2 md:col-span-1">
                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đăng ký</h2> */}
              <Form form={form} onFinish={handleResetPassword}>
                <Form.Item
                  // label="Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Không để trống',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-300 mx-1" />}
                    placeholder="Mật khẩu mới"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Xác nhận mật khẩu mới!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-300 mx-1" />}
                    placeholder="Xác nhận mật khẩu mới"
                    size="large"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full px-4  text-white bg-blue-700 rounded-3xl hover:bg-blue-600 "
                >
                  {loadingResetPW ? <Spin /> : 'Xác nhận'}
                </Button>
              </Form>
              {/* </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
