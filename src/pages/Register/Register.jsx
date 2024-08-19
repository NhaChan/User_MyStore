import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/2 flex items-center justify-center p-12 bg-blue-700 text-white">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/564x/ca/ef/e4/caefe4de901d74fce1fb7162884a5c63.jpg"
              alt="Logo"
              className="w-44 mx-auto"
            />
            <h2 className="mt-6 text-3xl font-bold">Welcome aboard my friend</h2>
            <p className="mt-4">Just a couple of clicks and we start</p>
          </div>
        </div>
        <div className="lg:w-1/2 p-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đăng ký</h2>
          <Form labelCol={{ span: 24 }}>
            <Form.Item>
              <Input
                prefix={<UserOutlined className="text-gray-300 mx-1" />}
                placeholder="Tên"
                size="large"
                className='text-gray-600'
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
                className='text-gray-600'
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
            <div className="flex items-center justify-end">
              <Link className="text-sm text-blue-700 mb-6">Forgot password?</Link>
            </div>
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
