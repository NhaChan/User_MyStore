import React, { Fragment } from 'react'
import { Navigate, Route } from 'react-router-dom'
import DefaultLayout from '../components/Layout/DefaultLayout'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Product from '../pages/Product'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import CartItem from '../pages/CartItem'
import Register from '../pages/Register'
import ResetPassword from '../pages/ResetPassword'

export const navigation = [{ name: 'Home', to: '/' }]

export const publicRoutes = [
  { path: '/', component: Home },
  { path: '/login', component: Login, Layout: null },
  { path: '/register', component: Register, Layout: null },
  { path: '/reset-password', component: ResetPassword, Layout: null },
  // { path: '/register', component: Register, Layout: null },
  { path: '/product', component: Product },
  { path: '/product-details/:id', component: ProductDetail },
]

export const privateRoutes = [{ path: '/cart', component: CartItem }]

export const generatePublicRoutes = () => {
  return publicRoutes.map((route, index) => {
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

export const generatePrivateRoutes = (isAuthenticated) => {
  // console.log(isAuthenticated)
  if (isAuthenticated) {
    return privateRoutes.map((route, index) => {
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
  } else {
    return privateRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={<Navigate to="/login" />} />
    ))
  }
}
