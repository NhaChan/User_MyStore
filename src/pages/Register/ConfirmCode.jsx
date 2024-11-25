import { Button, Form, Input, notification, Spin } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showError } from '../../services/commonService'
import authService from '../../services/authService'

const ConfirmCode = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleConfirmCode = async (email) => {
    setLoading(true)
    try {
      const res = await authService.sendCodeRegister(form.getFieldsValue(email))
      // console.log(res)
      notification.success({
        message: 'Gửi mã thành công',
        placement: 'top',
      })
      navigate('/confirm-code')
    } catch (error) {
      //   notification.error({
      //     message: 'Mã xác thực không đúng', placement: 'top'
      //   })
      showError(error)
    } finally {
      setLoading(false)
    }
  }

  const onChange = (text) => {
    // console.log('onChange:', text)
  }
  const sharedProps = {
    onChange,
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l to-blue-500 from-sky-50">
      <div className="w-1/3 md:w-4/5 lg:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-10 py-16 col-span-2 md:col-span-1">
          <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">Nhập mã xác nhận</h2>
          <Form form={form}>
            <Form.Item
              // label="Email"
              name="email"
              hasFeedback
              className="flex text-center justify-center p-4"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã xác thực!',
                },
              ]}
            >
              <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} size="large" />
            </Form.Item>

            <Button
              onClick={handleConfirmCode}
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full px-4 text-white bg-blue-700 rounded-sm hover:bg-blue-600"
            >
              {loading ? <Spin /> : 'TIẾP THEO'}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCode
