import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('jwt')
            if(token) {
                await fetch('/api/v1/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    if(response.status === 200) {
                        props.authRequest(true)
                        return response.json()
                    }else {
                        props.authRequest(false)
                        return Promise.reject('Neispravan token')
                    }
                }).then((data) => {
                    console.log(data)
                }).catch((error) => {
                    navigate('/login')
                    console.log(error)
                })
            }else {
                props.authRequest(false)
                navigate('/login')
                console.log('Nema tokena')
            }
        })()
    }, [])
    return (
        <>
            <div>Home</div>
        </>
    )
}

export default Home
