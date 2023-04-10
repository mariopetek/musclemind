import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
