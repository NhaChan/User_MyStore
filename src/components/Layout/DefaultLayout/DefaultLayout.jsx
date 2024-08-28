import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'

const DefaultLayout = ({ children }) => {
  return (
    <ConfigProvider locale={viVN}>
      <Header />
      <div>{children}</div>
      <Footer />
    </ConfigProvider>
  )
}

export default DefaultLayout
