import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import InputField from './partials/InputField'
import styles from '../styles/Register.module.css'

const Register = () => {
    const [inputValues, setInputValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const inputs = [
        {
            id: 1,
            name: 'username',
            label: 'Korisničko ime',
            type: 'text'
        },
        {
            id: 2,
            name: 'email',
            label: 'Email',
            type: 'text'
        },
        {
            id: 3,
            name: 'password',
            label: 'Lozinka',
            type: 'password'
        },
        {
            id: 4,
            name: 'confirmPassword',
            label: 'Potvrda lozinke',
            type: 'password'
        }
    ]
    const handleInputChange = (event) => {
        setInputValues((prevInputValues) => {
            return {
                ...prevInputValues,
                [event.target.name]: event.target.value
            }
        })
    }
    const register = async (event) => {
        event.preventDefault()
        setError(null)
        try {
            const response = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputValues)
            })
            if (response.status === 200) {
                setError(null)
                const data = await response.json()
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('id', data.appUserId)
                localStorage.setItem('username', data.username)
                navigate('/home')
            } else {
                throw Error('Neuspješna registracija')
            }
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <>
            <div className={styles.registerContainer}>
                <form onSubmit={register}>
                    <h2>Registracija</h2>
                    {inputs.map((input) => (
                        <InputField
                            key={input.id}
                            name={input.name}
                            value={inputValues[input.name]}
                            label={input.label}
                            type={input.type}
                            required
                            onChange={handleInputChange}
                            helperText=""
                            variant="outlined"
                            size="small"
                        />
                    ))}
                    <div className={styles.buttonContainer}>
                        <NavLink
                            className={styles.returnButton}
                            to="/"
                            title="Odustani"
                        >
                            Odustani
                        </NavLink>
                        <button type="submit" title="Registriraj se">
                            Registriraj se
                        </button>
                    </div>
                </form>
            </div>
            <div className={styles.errorContainer}>{error}</div>
        </>
    )
}

export default Register
