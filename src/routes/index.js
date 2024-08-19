import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'

export const navigation = [
  {name: 'Home', to: '/'}
]

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, Layout: null },
  { path: '/register', component: Register, Layout: null },
]

const GenerateRoutes = (route) => {
  return route.map((route, index) => {
    const Page = route.component
    let Layout = DefaultLayout

    if (route.Layout) {
      Layout = route.Layout
    } else if (route.Layout === null) {
      Layout = Fragment
    }
    return (
      <Route
        key={index}
        path={route.path}
        element={
          <Layout>
            <Page />
          </Layout>
        }
      />
    )
  })
}

export default GenerateRoutes