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
import * as tf from '@tensorflow/tfjs'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const FavoritesContext = createContext()

export const CartContext = createContext()

const ModelContext = createContext() // Create Model Context
export const useModel = () => useContext(ModelContext)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [favorite, setFavorite] = useState([])
  const [countCart, setCountCart] = useState([])

  const [model, setModel] = useState(null)
  const [loading, setLoading] = useState({ loading: true, progress: 0 })

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

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready()
        const yolov8 = await tf.loadGraphModel('yolov8n_web_model/model.json', {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions })
          },
        })
        const dummyInput = tf.zeros(yolov8.inputs[0].shape)
        yolov8.execute(dummyInput) // Warm up model
        tf.dispose(dummyInput)

        setModel({
          net: yolov8,
          inputShape: yolov8.inputs[0].shape,
        })
        setLoading({ loading: false, progress: 1 })
      } catch (error) {
        console.error('Error loading TensorFlow model:', error)
        setLoading({ loading: false, progress: 0 })
      }
    }

    loadModel()
  }, [])

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <FavoritesContext.Provider value={[favorite, setFavorite]}>
        <CartContext.Provider value={{ countCart, setCountCart }}>
          <ModelContext.Provider value={{ model, loading }}>
            <ChatBot />
            <Router>
              <Routes>
                {generatePublicRoutes(state.isAuthenticated)}
                {generatePrivateRoutes(state.isAuthenticated)}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </ModelContext.Provider>
        </CartContext.Provider>
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
