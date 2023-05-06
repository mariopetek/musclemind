import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        (async () => {
            const response = await fetch('/api/v1/users', {
                method: 'GET',
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            if(response.status === 200) {
                const data = await response.json()
                console.log(data)
            }
        })()
    }, [])
    return (
        <div>Home</div>
    )
}

export default Home
