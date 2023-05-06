import { useState, createContext } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import ProtectedRoute from './components/partials/ProtectedRoute'
import UnprotectedRoute from './components/partials/UnprotectedRoute'

import Header from './components/partials/Header'

import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'

import Home from './components/Home'
import Explore from './components/Explore'
import NewWorkout from './components/NewWorkout'
import Profile from './components/Profile'

export const AuthContext = createContext()

const App = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false)
    const [ user, setUser] = useState(null)

    return (
        <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated, user, setUser]}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<UnprotectedRoute />}>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/new" element={<NewWorkout />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
