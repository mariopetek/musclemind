import { useState, createContext } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/partials/Header'
import ProtectedRoute from './components/ProtectedRoute'

export const AuthContext = createContext()

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return (
        <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>Not found</h1>} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
