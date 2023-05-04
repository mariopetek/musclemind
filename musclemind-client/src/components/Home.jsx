import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = (props) => {
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('jwt')
            if(token) {
                try {
                    const response = await fetch('/api/v1/users', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if(response.status === 200) {
                        props.authRequest(true)
                        const data = await response.json()
                        console.log(data)
                    }else {
                        throw Error('Neispravan token')
                    }
                }catch(error) {
                    props.authRequest(false)
                    navigate('/login')
                    console.log(error.message)
                }
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
