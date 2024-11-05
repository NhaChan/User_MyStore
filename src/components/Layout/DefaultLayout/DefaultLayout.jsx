import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'

const DefaultLayout = ({ children }) => {
  const [search, setSearch] = useState('')

  const handleSearch = (searchQuery) => {
    setSearch(searchQuery)
    console.log('Search query:', searchQuery)
  }

  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { search })
    }
    return child
  })

  return (
    <ConfigProvider locale={viVN}>
      <Header onSearch={handleSearch} />
      <div>{modifiedChildren}</div>
      <Footer />
    </ConfigProvider>
  )
}

export default DefaultLayout
