import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l to-blue-500 from-sky-50">
      <div className="grid grid-cols-2 w-3/5 md:w-4/5 lg:w-3/5 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-sky-100">
          <img src="logo2.png" alt="Logo" className="w-96 mx-auto" />
        </div>
        <div className="px-10 py-16 col-span-2 md:col-span-1">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đăng ký</h2>
          <Form>
            <Form.Item>
              <Input
                prefix={<UserOutlined className="text-gray-300 mx-1" />}
                placeholder="Tên"
                size="large"
                className="text-gray-600"
              />
            </Form.Item>
            <Form.Item
              // label="Email"
              name="username"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
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
              Đăng ký
            </Button>
          </Form>
          <div className="mt-6 text-center">
            <p className="mt-6 text-sm text-gray-700">
              Already have an account?
              <Link to="/login" className="text-blue-700">
                {' '}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
