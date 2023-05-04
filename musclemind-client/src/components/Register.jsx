import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import InputField from './partials/InputField'

import styles from '../styles/Register.module.css'

const Register = () => {
    const [inputValues, setInputValues] = useState({
        name: '',
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
            name: 'name',
            label: 'Ime',
            type: 'text',
        },
        {
            id: 2,
            name: 'username',
            label: 'Korisničko ime',
            type: 'text'
        },
        {
            id: 3,
            name: 'email',
            label: 'Email',
            type: 'text'
        },
        {
            id: 4,
            name: 'password',
            label: 'Lozinka',
            type: 'password'
        },
        {
            id: 5,
            name: 'confirmPassword',
            label: 'Potvrda lozinke',
            type: 'password'
        }
    ]
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('jwt')
            if(token) {
                try {
                    const response = await fetch('/api/v1/auth/validate', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if(response.status === 200) {
                        throw Error('Odajvite se za pristup stranici za registraciju.')    
                    }
                }catch(error) {
                    navigate('/home')
                    console.log(error.message)
                }
            }
        })()
    }, [])
    const handleInputChange = (event) => {
        setInputValues({
            ...inputValues, 
            [event.target.name]: event.target.value
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
            if(response.status === 200) {
                setError(null)
                const data = await response.json()
                localStorage.setItem('jwt', data.token)
                navigate('/home')
            }else {
                throw Error('Neuspješna registracija')
            }
        }catch(error) {
            setError(error.message)
        }
        /*
        await fetch('/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        }).
        then((response) => {
            if(response.status === 200) {
                return response.json()
            }else {
                return Promise.reject('Neuspješna registracija')
            }
        }).then((data) => {
            setError('')
            localStorage.setItem('jwt', data.token)
            navigate('/home')
        }).catch((error) => {
            setError(error)
        })*/
    }

    return (
        <>
            <div className={styles.registerContainer}>
                <form onSubmit={register}>
                    <h2>Registracija</h2>
                    {
                        inputs.map((input) => (
                            <InputField key={input.id} 
                                        name={input.name} 
                                        value={inputValues[input.name]} 
                                        label={input.label} 
                                        type={input.type}
                                        required
                                        onChange={handleInputChange}
                                        helperText='' 
                                        variant="outlined" 
                                        size="small"/>
                        ))
                    }
                    <div className={styles.buttonContainer}>
                        <NavLink className={styles.returnButton} to="/">Odustani</NavLink>
                        <button>Registriraj se</button>
                    </div>
                </form>
            </div>
            <div className={styles.errorContainer}>
                {error}
            </div>
        </>
    )
}

export default Register
