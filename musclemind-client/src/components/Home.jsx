import { useState, useEffect } from 'react'
import Navbar from './partials/Navbar'

const Home = (props) => {
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
                    window.location.href = '/login'
                    console.log(error)
                })
            }else {
                window.location.href = '/login'
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
