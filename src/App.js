import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { generatePrivateRoutes, generatePublicRoutes } from './routes'
import NotFound from './components/NotFound'
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { initialState, reducer } from './services/authReducer'
import { showError } from './services/commonService'
import userService from './services/userService'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const FavoritesContext = createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [favorite, setFavorite] = useState([])

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        if (state.isAuthenticated) {
          const res = await userService.getFavorite()
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
        <Router>
          <Routes>
            {generatePublicRoutes(state.isAuthenticated)}
            {generatePrivateRoutes(state.isAuthenticated)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </FavoritesContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
