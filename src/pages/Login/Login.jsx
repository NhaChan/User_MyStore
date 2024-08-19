import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { LockOutlined, MailOutlined, StepBackwardOutlined } from '@ant-design/icons'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
      <Link to="/" className='bg-blue-700 text-white' >
            <StepBackwardOutlined />
          </Link>
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
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Đăng nhập</h2>
          <Form labelCol={{ span: 24 }}>
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
              <Link className="text-sm text-blue-700 mb-6">Forgot password?</Link>
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
            <p className="text-gray-700">Or</p>
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
