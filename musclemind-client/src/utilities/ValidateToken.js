export default async function validateToken() {
    const token = localStorage.getItem('jwt')
    if(token) {
        await fetch('/api/v1/auth/validate', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.status === 200) {
                return response.json()
            }else {
                return Promise.reject('Neispravan token')
            }
        }).then((data) => {
            console.log(data)
            window.location.href = '/home'
        }).catch((error) => {
            console.log(error)
        })
    }
}
