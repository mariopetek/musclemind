import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

const Home = () => {
    useEffect(() => {
        ;(async () => {
            const response = await fetch('/api/v1/users', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
            }
        })()
    }, [])
    return (
        <>
            <Helmet>
                <title>Musclemind | Početna</title>
            </Helmet>
            <div>Home</div>
        </>
    )
}

export default Home
