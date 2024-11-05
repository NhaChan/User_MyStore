import { SmileOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React from 'react'

export default function Empty({ title }) {
  return <Result icon={<SmileOutlined />} title={title} />
}
