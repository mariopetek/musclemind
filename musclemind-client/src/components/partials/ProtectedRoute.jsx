import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../../App'

const ProtectedRoute = () => {
    const [ isAuthenticated, setIsAuthenticated, user, setUser ] = useContext(AuthContext)
    const [ isSendingRequest, setIsSendingRequest ] = useState(true)
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('jwt')
            if(token) {
                const response = await fetch('/api/v1/auth/validate', {
                    method: 'GET',
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                if(response.status === 200) {
                    setIsAuthenticated(true)
                    setUser({id: localStorage.getItem('id'), username: localStorage.getItem('username')})
                }else {
                    localStorage.removeItem('jwt')
                    localStorage.removeItem('id')
                    localStorage.removeItem('username')
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }else {
                setIsAuthenticated(false)
                setUser(null)
            }
            setIsSendingRequest(false)
        })()
    }, [])
    
    if(!isSendingRequest)
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
