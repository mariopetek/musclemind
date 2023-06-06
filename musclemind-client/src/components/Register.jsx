import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import InputField from './partials/InputField'
import styles from '../styles/Register.module.css'

const Register = () => {
    const [inputValues, setInputValues] = useState({
        name: '',
        surname: '',
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
            regex: /^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$/
        },
        {
            id: 2,
            name: 'surname',
            label: 'Prezime',
            type: 'text',
            regex: /^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$/
        },
        {
            id: 3,
            name: 'username',
            label: 'Korisničko ime',
            type: 'text',
            regex: /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
        },
        {
            id: 4,
            name: 'email',
            label: 'Email',
            type: 'text',
            regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        },
        {
            id: 5,
            name: 'password',
            label: 'Lozinka',
            type: 'password',
            regex: /^(?=.*[A-ZČĆĐŠŽa-zčćđšž])(?=.*\d)(?=.*[@$!%*#?&])[A-ZČĆĐŠŽa-zčćđšž\d@$!%*#?&]{8,40}$/
        },
        {
            id: 6,
            name: 'confirmPassword',
            label: 'Potvrda lozinke',
            type: 'password',
            regex: inputValues.password
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
                            error={
                                inputValues[input.name].length > 0 &&
                                !new RegExp(input.regex).test(
                                    inputValues[input.name]
                                )
                            }
                            key={input.id}
                            name={input.name}
                            value={inputValues[input.name]}
                            label={input.label}
                            type={input.type}
                            onChange={handleInputChange}
                            helperText={input.error}
                            variant="outlined"
                            size="small"
                        ></InputField>
                    ))}
                    <div className={styles.buttonContainer}>
                        <NavLink
                            className={styles.returnButton}
                            to="/"
                            title="Odustani"
                        >
                            Odustani
                        </NavLink>
                        <button
                            type="submit"
                            title="Registriraj se"
                            disabled={
                                inputValues.username.length === 0 ||
                                inputValues.email.length === 0 ||
                                inputValues.password.length === 0 ||
                                inputValues.confirmPassword.length === 0 ||
                                inputs.some(
                                    (input) =>
                                        !new RegExp(input.regex).test(
                                            inputValues[input.name]
                                        )
                                )
                            }
                        >
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
