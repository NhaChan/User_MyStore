import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { generatePrivateRoutes, generatePublicRoutes } from './routes'
import NotFound from './components/NotFound'
import { createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from './services/authReducer'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          {generatePublicRoutes(state.isAuthenticated)}
          {generatePrivateRoutes(state.isAuthenticated)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
