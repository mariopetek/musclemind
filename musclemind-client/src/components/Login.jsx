import { React, useState } from 'react'

import Navbar from './partials/Navbar'
import InputField from './partials/InputField'

import '../styles/Login.css'

const Login = () => {

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
        await fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${inputValues.username}&password=${inputValues.password}`
        }).then((response) => {
            if(response.status === 401) {
                setError('Login failed')
            }else {
                /*window.location.href = '/home'*/
            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })

    }

    console.log(inputValues)

    return (
        <>
            <Navbar />
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
                    <div>
                        {error}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
