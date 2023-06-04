import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAuth } from './AuthContext'

const UnprotectedRoute = () => {
    const [userInfo, setUserInfo] = useAuth()
    const [isSendingRequest, setIsSendingRequest] = useState(true)
    useEffect(() => {
        ;(async () => {
            const token = localStorage.getItem('jwt')
            if (token) {
                const response = await fetch('/api/v1/auth/validate', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setUserInfo({
                        token,
                        id: localStorage.getItem('id'),
                        username: localStorage.getItem('username'),
                        isAuthenticated: true
                    })
                } else {
                    localStorage.removeItem('jwt')
                    localStorage.removeItem('id')
                    localStorage.removeItem('username')
                    setUserInfo({
                        token: null,
                        id: null,
                        username: null,
                        isAuthenticated: false
                    })
                }
            } else {
                setUserInfo({
                    token: null,
                    id: null,
                    username: null,
                    isAuthenticated: false
                })
            }
            setIsSendingRequest(false)
        })()
    }, [])

    if (!isSendingRequest)
        return userInfo.isAuthenticated ? <Navigate to="/home" /> : <Outlet />
    return null
}

export default UnprotectedRoute
