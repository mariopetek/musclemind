import { useState } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { HiLockClosed, HiPencil } from 'react-icons/hi2'
import axios from 'axios'
import styles from '../styles/EditProfile.module.css'

const EditProfile = () => {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const {
        data: userInfo,
        isLoading: userInfoLoading,
        isError: userInfoError
    } = useQuery(
        ['users', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/users/${localStorage.getItem('id')}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        },
        {
            onSuccess: (data) => {
                setName(data.name)
                if (data.bio === null) {
                    setBio('')
                } else {
                    setBio(data.bio)
                }
            }
        }
    )

    const handleSaveChanges = (event) => {
        event.preventDefault()
    }

    if (userInfoLoading) return <p>Učitavanje</p>
    if (userInfoError) return <p>Nešto je pošlo po zlu</p>
    return (
        <div className={styles.editProfileContainer}>
            <form onSubmit={handleSaveChanges}>
                <h2>Uredi račun</h2>
                <div className={styles.userInfoContainer}>
                    <div className={styles.usernameEmailContainer}>
                        <label htmlFor="username" className={styles.inputField}>
                            <div className={styles.labelContainer}>
                                <HiLockClosed />
                                <p>Korisničko ime</p>
                            </div>
                            <input
                                type="text"
                                id="username"
                                value={userInfo.username}
                                disabled
                                autoComplete="true"
                            />
                        </label>
                        <label htmlFor="email" className={styles.inputField}>
                            <div className={styles.labelContainer}>
                                <HiLockClosed />
                                <p>E-mail</p>
                            </div>
                            <input
                                type="text"
                                id="email"
                                value={userInfo.email}
                                disabled
                                autoComplete="true"
                            />
                        </label>
                    </div>
                    <div className={styles.nameBioContainer}>
                        <label htmlFor="name" className={styles.inputField}>
                            <div className={styles.labelContainer}>
                                <HiPencil />
                                <p>Ime</p>
                            </div>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="true"
                            />
                        </label>
                        <label htmlFor="bio" className={styles.inputField}>
                            <div className={styles.labelContainer}>
                                <HiPencil />
                                <p>Opis</p>
                            </div>
                            <input
                                type="text"
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                autoComplete="true"
                            />
                        </label>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <NavLink
                        className={styles.returnButton}
                        to="/profile"
                        title="Odustani"
                    >
                        Odustani
                    </NavLink>
                    <button type="submit" title="Spremi">
                        Spremi
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile
