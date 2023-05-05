import { Navigate, Outlet } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
import { AuthContext } from '../App'

const ProtectedRoute = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useContext(AuthContext)
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
                response.status === 200 ? setIsAuthenticated(true) : setIsAuthenticated(false)
            }else {
                setIsAuthenticated(false)
            }
            setIsSendingRequest(false)
        })()
    }, [])
    
    if(!isSendingRequest)
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute
