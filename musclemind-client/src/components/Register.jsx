import { React, useState } from 'react'
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Navbar from './partials/Navbar'

import '../styles/Register.css'

const InputField = withStyles({
    root: {
        "& label": {
            color: 'rgba(89, 89, 89, 1)',
        },
        "& label.Mui-focused": {
            color: 'rgba(0, 149, 255, 1)'
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: 'rgba(0, 149, 255, 1)'
            }
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(89, 89, 89, 1)',
          },
    }
})(TextField);

const Register = () => {

    const [inputValues, setInputValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const inputs = [
        {
            id: 1,
            name: 'name',
            label: 'Ime',
            type: 'text'
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
        setInputValues({...inputValues, [event.target.name]: event.target.value})
    }

    const register = (event) => {
        event.preventDefault()
    }

    console.log(inputValues)

    return (
        <>
            <Navbar />
            <div className="registerContainer">
                <form onSubmit={register}>
                    <h2>Registracija</h2>
                    {
                        inputs.map((input) => (
                            <InputField key={input.id} name={input.name} value={inputValues[input.name]} label={input.label} type={input.type} onChange={handleInputChange} variant="outlined" size="small"/>
                        ))
                    }
                    <button>Registriraj se</button>
                </form>
            </div>
        </>
    )
}

export default Register
