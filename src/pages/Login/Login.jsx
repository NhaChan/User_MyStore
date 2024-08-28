import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { LockOutlined, MailOutlined } from '@ant-design/icons'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l to-blue-500 from-sky-50">
      <div className="grid grid-cols-2 w-3/5 md:w-4/5 lg:w-3/5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-sky-100">
          <Link to="/">
            <img src="logo2.png" alt="Logo" className="w-96 mx-auto" />
          </Link>
        </div>
        <div className="px-10 py-16 col-span-2 md:col-span-1">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đăng nhập</h2>
          <Form>
            <Form.Item
              // label="Email"
              name="username"
              rules={[
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
                size="large"
                placeholder="Mật khẩu"
                prefix={<LockOutlined className="text-gray-300 mx-1" />}
              />
            </Form.Item>
            <div className="flex items-center justify-end">
              <Link className="text-sm text-blue-700 mb-6">Quên mật khẩu?</Link>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full px-4  text-white bg-blue-700 rounded-3xl hover:bg-blue-600 "
            >
              Đăng nhập
            </Button>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-gray-700">Hoặc</p>
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
            <p className="mt-6 text-sm text-gray-700">
              Have no account yet?
              <Link to="/register" className="text-blue-700">
                {' '}
                Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
