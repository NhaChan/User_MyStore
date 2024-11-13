import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { generatePrivateRoutes, generatePublicRoutes } from './routes'
import NotFound from './components/NotFound'
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { initialState, reducer } from './services/authReducer'
import { showError } from './services/commonService'
import userService from './services/userService'
import ChatBot from './chat'
import cartService from './services/cartService'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const FavoritesContext = createContext()

export const CartContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [favorite, setFavorite] = useState([])
  const [countCart, setCountCart] = useState([])

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        if (state.isAuthenticated) {
          const res = await userService.getFavorite()
          const countCart = await cartService.count()
          // console.log(countCart.data)
          setCountCart(countCart.data)
          setFavorite(res.data)
        }
      } catch (error) {
        showError(error)
      }
    }
    fetchFavorite()
  }, [state.isAuthenticated])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <FavoritesContext.Provider value={[favorite, setFavorite]}>
        <CartContext.Provider value={{ countCart, setCountCart }}>
          <ChatBot />
          <Router>
            <Routes>
              {generatePublicRoutes(state.isAuthenticated)}
              {generatePrivateRoutes(state.isAuthenticated)}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CartContext.Provider>
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
