import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({token: null, id: null, username: null, isAuthenticated: false})

    return (
        <AuthContext.Provider value={[userInfo, setUserInfo]}>
            {children}
        </AuthContext.Provider>
    )
}
