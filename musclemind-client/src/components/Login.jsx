import { React, useState } from 'react'

import Navbar from './partials/Navbar'
import InputField from './partials/InputField'

import '../styles/Login.css'

const Login = () => {

    const [inputValues, setInputValues] = useState({
        username: '',
        password: ''
    })

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

    const login = (event) => {
        event.preventDefault()
    }

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
                </form>
            </div>
        </>
    )
}

export default Login
