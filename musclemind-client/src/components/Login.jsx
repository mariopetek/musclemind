import { useState } from 'react'
import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import InputField from './partials/InputField'

import styles from '../styles/Login.module.css'

const Login = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const inputs = [
        {
            id: 1,
            type: 'text',
            name: 'username',
            label: 'Korisničko ime'
        },
        {
            id: 2,
            type: 'password',
            name: 'password',
            label: 'Lozinka'
        }
    ]
    const handleInputChange = (event) => {
        setInputValues({
          ...inputValues,
            [event.target.name]: event.target.value
        })
    }
    const login = async (event) => {
        event.preventDefault()
        setError(null)
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            })
            if(response.status === 200) {
                setError(null)
                const data = await response.json()
                localStorage.setItem('jwt', data.token)
                navigate('/home')
            }else {
                throw Error('Neispravno korisničko ime ili lozinka')
            }
        }catch(error) {
            setError(error.message)
        }
    }
    return (
        <>
            <div className={styles.loginContainer}>
                <form onSubmit={login}>
                    <h2>Prijava</h2>
                    {
                        inputs.map((input) => (
                            <InputField key={input.id} 
                                        name={input.name} 
                                        value={inputValues[input.name]} 
                                        label={input.label} 
                                        type={input.type} 
                                        onChange={handleInputChange} 
                                        variant="outlined" 
                                        size="small"/>
                        ))
                    }
                    <div className={styles.buttonContainer}>
                        <NavLink className={styles.returnButton} to="/">Odustani</NavLink>
                        <button>Prijavi se</button>
                    </div>
                </form>
            </div>
            <div className={styles.errorContainer}>
                {error}
            </div>
        </>
    )
}

export default Login
