import { React, useState } from 'react'
import InputField from './partials/InputField'
import axios from 'axios'

import Navbar from './partials/Navbar'

import '../styles/Register.css'


const Register = () => {

    const [inputValues, setInputValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [inputErrors, setInputErrors] = useState({
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
        
        switch(name) {
            case 'name': {
                if(value.length === 0) {
                    setInputErrors({...inputErrors, [name]: 'Ime smije sadržavati samo velika i mala slova'})
                } else {
                    setInputErrors({...inputErrors, [name]: ''})
                }
                break;
            }
            case 'username': {
                setInputErrors({...inputErrors, [name]: 'Korisničko ime treba sadržavati 4 - 20 znakova bez specijalnih znakova'})
                break;
            }
            case 'email': {
                setInputErrors({...inputErrors, [name]: 'Email treba biti u obliku example@mail.com'})
                break;
            }
            case 'password': {
                setInputErrors({...inputErrors, [name]: 'Lozinka treba sadržavati 8 - 20 znakova koji uključuju velika i mala slova, brojeve i specijalne znakove'})
                break;
            }
            case 'confirmPassword': {
                if(value !== inputValues.password) {
                    setInputErrors({...inputErrors, [name]: 'Lozinke se ne poklapaju'})
                } else {
                    setInputErrors({...inputErrors, [name]: ''})
                }
                break;
            }
        }
    }

    const register = (event) => {
        event.preventDefault()
        axios.post('/api/v1/auth/new', inputValues).
        then((response) => {
            console.log(response)
            window.location.href = '/home';
        }).catch((error) => {
            console.log(error)
        })
    }

    const isValid = () => {
        
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
                            <InputField key={input.id} 
                                        name={input.name} 
                                        value={inputValues[input.name]} 
                                        label={input.label} 
                                        type={input.type}
                                        required
                                        onChange={handleInputChange}
                                        helperText={inputErrors[input.name]} 
                                        variant="outlined" 
                                        size="small"/>
                        ))
                    }
                    <div className="registerButtonSection">
                        <a href="/">Odustani</a>
                        <button disabled={isValid()}>Registriraj se</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
