import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { NavLink } from 'react-router-dom'
import { IconContext } from 'react-icons'
import {
    HiLockClosed,
    HiPencil,
    HiUser,
    HiOutlineUser,
    HiQueueList,
    HiOutlineQueueList
} from 'react-icons/hi2'
import { FaUserEdit } from 'react-icons/fa'
import axios from 'axios'

import styles from '../styles/EditProfile.module.css'
import EditWorkout from './partials/EditWorkout'

const EditProfile = () => {
    const [initialName, setInitialName] = useState('')
    const [initialSurname, setInitialSurname] = useState('')
    const [initialBio, setInitialBio] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [bio, setBio] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isUserInfoOptionSelected, setIsUserInfoOptionSelected] =
        useState(true)
    const queryClient = useQueryClient()

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
                setInitialName(data.name)
                setInitialSurname(data.surname)
                setInitialBio(data.bio === null ? '' : data.bio)
                setName(data.name)
                setSurname(data.surname)
                setBio(data.bio === null ? '' : data.bio)
            }
        }
    )

    const {
        data: userWorkouts,
        isLoading: userWorkoutsLoading,
        isError: userWorkoutsError
    } = useQuery(
        ['workouts', 'user', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/workouts/user/${localStorage.getItem('id')}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        },
        {
            enabled: !isUserInfoOptionSelected
        }
    )

    const updateUserMutation = useMutation(
        async (appUserUpdate) => {
            const { data } = await axios.put(
                `/api/v1/users/update/${userInfo.appUserId}`,
                appUserUpdate,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return data
        },
        {
            onSuccess: () => {
                setErrorMessage('')
                setSuccessMessage('Uspješna promjena')
            },
            onError: () => {
                setErrorMessage('Došlo je do pogreške')
                setSuccessMessage('')
            }
        }
    )

    const deleteWorkoutMutation = useMutation(
        async (workout) => {
            const { data } = await axios.delete(
                `/api/v1/workouts/delete/${workout.workoutId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    'workouts',
                    'user',
                    localStorage.getItem('id')
                ])
            }
        }
    )

    const handleSaveChanges = (event) => {
        event.preventDefault()
        updateUserMutation.mutate({ name, surname, bio })
    }

    if (userInfoLoading || userWorkoutsLoading) return <p>Učitavanje</p>
    if (userInfoError || userWorkoutsError) return <p>Nešto je pošlo po zlu</p>
    return (
        <div className={styles.editProfileContainer}>
            <div className={styles.headerText}>
                <IconContext.Provider value={{ size: '30px' }}>
                    <FaUserEdit />
                </IconContext.Provider>
                <h2>Uredi račun</h2>
            </div>
            <div className={styles.selectionContainer}>
                <div
                    className={`${styles.userInfoOption} ${
                        isUserInfoOptionSelected && styles.optionSelected
                    }`}
                    onClick={() => {
                        setIsUserInfoOptionSelected(true)
                        queryClient.invalidateQueries([
                            'users',
                            localStorage.getItem('id')
                        ])
                    }}
                    onKeyDown={() => {
                        setIsUserInfoOptionSelected(true)
                        queryClient.invalidateQueries([
                            'users',
                            localStorage.getItem('id')
                        ])
                    }}
                    role="button"
                    tabIndex={0}
                    title="Korisnički podaci"
                >
                    <IconContext.Provider value={{ size: '30px' }}>
                        {isUserInfoOptionSelected ? (
                            <HiUser />
                        ) : (
                            <HiOutlineUser />
                        )}
                    </IconContext.Provider>
                    Korisnički podaci
                </div>
                <div
                    className={`${styles.userWorkoutsOption} ${
                        !isUserInfoOptionSelected && styles.optionSelected
                    }`}
                    onClick={() => {
                        setIsUserInfoOptionSelected(false)
                        queryClient.invalidateQueries([
                            'workouts',
                            'user',
                            localStorage.getItem('id')
                        ])
                    }}
                    onKeyDown={() => {
                        setIsUserInfoOptionSelected(false)
                        queryClient.invalidateQueries([
                            'workouts',
                            'user',
                            localStorage.getItem('id')
                        ])
                    }}
                    role="button"
                    tabIndex={0}
                    title="Treninzi"
                >
                    <IconContext.Provider value={{ size: '30px' }}>
                        {isUserInfoOptionSelected ? (
                            <HiOutlineQueueList />
                        ) : (
                            <HiQueueList />
                        )}
                    </IconContext.Provider>
                    Treninzi
                </div>
            </div>
            {isUserInfoOptionSelected ? (
                <>
                    <form onSubmit={handleSaveChanges}>
                        <div className={styles.userInfoContainer}>
                            <div className={styles.usernameEmailContainer}>
                                <label
                                    htmlFor="username"
                                    className={styles.inputField}
                                >
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
                                <label
                                    htmlFor="email"
                                    className={styles.inputField}
                                >
                                    <div className={styles.labelContainer}>
                                        <HiLockClosed />
                                        <p>Email</p>
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
                                <label
                                    htmlFor="name"
                                    className={styles.inputField}
                                >
                                    <div className={styles.labelContainer}>
                                        <HiPencil />
                                        <p>Ime</p>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        autoComplete="true"
                                        placeholder="Unesi ime (max. 50 znakova)"
                                        maxLength="50"
                                    />
                                </label>
                                <label
                                    htmlFor="surname"
                                    className={styles.inputField}
                                >
                                    <div className={styles.labelContainer}>
                                        <HiPencil />
                                        <p>Prezime</p>
                                    </div>
                                    <input
                                        type="text"
                                        id="surname"
                                        value={surname}
                                        onChange={(e) =>
                                            setSurname(e.target.value)
                                        }
                                        autoComplete="true"
                                        placeholder="Unesi prezime (max. 50 znakova)"
                                        maxLength="50"
                                    />
                                </label>
                                <label
                                    htmlFor="bio"
                                    className={styles.inputField}
                                >
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
                                        placeholder="Unesi opis (max. 500 znakova)"
                                        maxLength="500"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={styles.buttonContainer}>
                            <NavLink
                                className={styles.returnButton}
                                to="/profile"
                                title="Povratak"
                            >
                                Povratak
                            </NavLink>
                            <button
                                type="submit"
                                title="Spremi"
                                disabled={
                                    (initialName === name &&
                                        initialBio === bio &&
                                        initialSurname === surname) ||
                                    !/^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$/.test(
                                        name
                                    ) ||
                                    !/^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$/.test(
                                        surname
                                    )
                                }
                            >
                                Spremi
                            </button>
                        </div>
                    </form>
                    {successMessage && (
                        <div className={styles.successMessageContainer}>
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className={styles.errorMessageContainer}>
                            {errorMessage}
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.userWorkoutsContainer}>
                    {userWorkouts.length > 0 ? (
                        userWorkouts.map((workout) => (
                            <EditWorkout
                                key={workout.workoutId}
                                workout={workout}
                                deleteWorkoutMutation={deleteWorkoutMutation}
                            />
                        ))
                    ) : (
                        <div className={styles.noWorkoutsYet}>
                            <p>
                                Trenutno nemaš treninga za urediti. Treninzi
                                koje izradiš pojaviti će se ovdje.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default EditProfile
