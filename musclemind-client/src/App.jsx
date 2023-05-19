import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import ProtectedRoute from './components/partials/ProtectedRoute'
import UnprotectedRoute from './components/partials/UnprotectedRoute'
import Header from './components/partials/Header'
import { AuthProvider } from './components/partials/AuthContext'

import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Explore from './components/Explore'
import NewWorkout from './components/NewWorkout'
import Profile from './components/Profile'
import User from './components/User'
import EditProfile from './components/EditProfile'

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
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
                            <Route path="/explore">
                                <Route index element={<Explore />} />
                                <Route
                                    path="users/:userId"
                                    element={<User />}
                                />
                            </Route>
                            <Route path="/new" element={<NewWorkout />} />
                            <Route path="/profile">
                                <Route index element={<Profile />} />
                                <Route path="edit" element={<EditProfile />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<h1>Not found</h1>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
