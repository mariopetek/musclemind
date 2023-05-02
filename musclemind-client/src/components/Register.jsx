import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputField from './partials/InputField'

import '../styles/Register.css'

const Register = () => {
    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
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
    const handleInputChange = (event) => {
        const { name, value} = event.target
        setInputValues({...inputValues, [name]: value})
    }
    const register = async (event) => {
        event.preventDefault()
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
        })
    }

    return (
        <>
            <div className="registerContainer">
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
                    <div className="registerButtonSection">
                        <a href="/">Odustani</a>
                        <button>Registriraj se</button>
                    </div>
                </form>
            </div>
            <div className="errorMessage">{error}</div>
        </>
    )
}

export default Register
