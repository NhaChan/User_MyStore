import { SmileOutlined } from '@ant-design/icons'
import { Result } from 'antd'
import React from 'react'

export default function Empty() {
  return <Result icon={<SmileOutlined />} title="Không có sản phẩm nào!" />
}
