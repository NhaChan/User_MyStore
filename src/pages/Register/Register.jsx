import { Button, Divider, Form, Input, notification, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { showError } from '../../services/commonService'
import authService from '../../services/authService'

const Register = () => {
  const [form] = Form.useForm()
  const [loadingSendEMail, setLoadingSendEMail] = useState(false)
  const [loadingConfirmCode, setLoadingConfirmCode] = useState(false)
  const [loadingRegister, setLoadingRegister] = useState(false)
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
      await authService.sendCodeRegister(form.getFieldsValue('email'))
      // console.log(res)
      notification.success({
        message: 'Gửi mã thành công',
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
      })
      setIsConfirmCode(true)
    } catch (error) {
      showError(error)
    } finally {
      setLoadingConfirmCode(false)
    }
  }

  const handleRegister = async () => {
    setLoadingRegister(true)
    try {
      const email = form.getFieldValue('email')
      const code = form.getFieldValue('token')
      const items = form.getFieldsValue()
      const data = {
        email: email,
        token: code,
        ...items,
      }
      const res = await authService.register(data)
      console.log(res)
      notification.success({
        message: 'Đăng ký tài khoản thành công',
      })
      navigate('/login')
    } catch (error) {
      showError(error)
    } finally {
      setLoadingRegister(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l to-blue-500 from-sky-50">
      <div className="w-4/5 md:w-3/5 lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-10 py-16 col-span-2 md:col-span-1">
          {!isCodeSent ? (
            <>
              <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đăng ký</h2>
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

              <div className="mt-4 text-center">
                <Divider plain>Hoặc</Divider>
                <div className="flex justify-center mt-4">
                  <button className="flex items-center px-4 py-2 border border-blue-700 rounded-3xl hover:bg-blue-300 mx-2">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt="Google logo"
                      className="w-6 h-6"
                    />
                    Google
                  </button>
                  <button className="flex items-center px-4 py-2 border border-blue-700 rounded-3xl hover:bg-blue-300 mx-2">
                    <img
                      src="https://banner2.cleanpng.com/20180605/zry/kisspng-fynydd-llc-logo-github-organization-andrew-scott-5b16e57c5a0c08.6997461415282271963688.jpg"
                      alt="GitHub logo"
                      className="w-6 h-6 mr-2"
                    />
                    GitHub
                  </button>
                </div>
                <div className="mt-6 text-center">
                  <p className="mt-6 text-sm text-gray-400">
                    Bạn đã có tài khoản?
                    <Link to="/login" className="text-blue-700">
                      {' '}
                      Đăng nhập
                    </Link>
                  </p>
                </div>
              </div>
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
              <Form form={form} onFinish={handleRegister}>
                <Form.Item name="name">
                  <Input
                    prefix={<UserOutlined className="text-gray-300 mx-1" />}
                    placeholder="Tên"
                    size="large"
                    className="text-gray-600"
                  />
                </Form.Item>
                <Form.Item
                  // label="Email"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại!',
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className="text-gray-300 mx-1" />}
                    placeholder="Số điện thoại"
                    size="large"
                    className="text-gray-600"
                  />
                </Form.Item>
                <Form.Item
                  // label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-300 mx-1" />}
                    placeholder="Mật khẩu"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Xác nhận mật khẩu!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Mật khẩu không khớp!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-300 mx-1" />}
                    placeholder="Xác nhận mật khẩu"
                    size="large"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full px-4  text-white bg-blue-700 rounded-3xl hover:bg-blue-600 "
                >
                  {loadingRegister ? <Spin /> : 'Đăng ký'}
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

export default Register
