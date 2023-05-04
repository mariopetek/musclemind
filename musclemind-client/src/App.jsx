import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/partials/Header'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const authRequest = (auth) => {
        setIsAuthenticated(auth);
    }

    return (
        <BrowserRouter>
            <Header isAuthenticated={isAuthenticated} authRequest={authRequest}/>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home authRequest={authRequest}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
