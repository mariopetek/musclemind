import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputField from './partials/InputField'

import '../styles/Login.css'

const Login = () => {
    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const handleInputChange = (event) => {
        setInputValues({
          ...inputValues,
            [event.target.name]: event.target.value
        })
    }
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
    const login = async (event) => {
        event.preventDefault()
        setError('')
        await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        }).then((response) => {
            if(response.status === 200) {
                return response.json()
            }else {
                return Promise.reject('Neispravno korisničko ime ili lozinka')
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
            <div className="loginContainer">
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
                    <div className="loginButtonSection">
                        <a href="/">Odustani</a>
                        <button>Prijavi se</button>
                    </div>
                </form>
            </div>
            <div>
                {error}
            </div>
        </>
    )
}

export default Login
