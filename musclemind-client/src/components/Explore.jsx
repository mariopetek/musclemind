import { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { MdExplore } from 'react-icons/md'
import { IconContext } from 'react-icons'
import axios from 'axios'

import styles from '../styles/Explore.module.css'
import Workout from './partials/Workout'

const Explore = () => {
    const [searchValue, setSearchValue] = useState('')
    const [foundUsers, setFoundUsers] = useState([])
    const searchMenuRef = useRef()

    useEffect(() => {
        const handler = (event) => {
            if (!searchMenuRef.current.contains(event.target)) {
                setSearchValue('')
                setFoundUsers('')
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    const handleInputChange = async (event) => {
        setSearchValue(event.target.value)
        if (!/\S/.test(event.target.value)) {
            setFoundUsers([])
        } else {
            const { data } = await axios.get(
                `/api/v1/users/search?pattern=${event.target.value}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            setFoundUsers(
                data.filter((element) => {
                    return (
                        element.appUserId !== Number(localStorage.getItem('id'))
                    )
                })
            )
        }
    }

    const {
        data: popularWorkouts,
        isLoading: popularWorkoutsLoading,
        isError: popularWorkoutsError
    } = useQuery(['workouts', 'popular'], async () => {
        const { data } = await axios.get('/api/v1/workouts/popular', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        return data
    })

    if (popularWorkoutsLoading) return <p>Učitavanje</p>
    if (popularWorkoutsError) return <p>Nešto je pošlo po zlu</p>

    return (
        <div className={styles.exploreContainer}>
            <div className={styles.headerText}>
                <IconContext.Provider value={{ size: '30px' }}>
                    <MdExplore />
                </IconContext.Provider>
                <h2>Istraži</h2>
            </div>
            <div className={styles.userSearchContainer} ref={searchMenuRef}>
                <IconContext.Provider value={{ size: '30px' }}>
                    <BiSearch className={styles.searchIcon} />
                </IconContext.Provider>
                <input
                    name="searchBar"
                    className={styles.searchInput}
                    type="text"
                    placeholder="Pretraži korisnike"
                    value={searchValue}
                    onChange={(event) => {
                        handleInputChange(event)
                    }}
                />

                <input
                    type="button"
                    value=" ⨉ "
                    className={styles.clearSearchInput}
                    onClick={() => {
                        setSearchValue('')
                        setFoundUsers([])
                    }}
                ></input>
                {foundUsers.length > 0 && /\S/.test(searchValue) ? (
                    <div className={styles.foundUsersContainer}>
                        {foundUsers.map((user, idx) => (
                            <NavLink
                                to={`/explore/users/${user.appUserId}`}
                                key={user.appUserId}
                                className={`${styles.foundUser} ${
                                    idx % 2 === 1
                                        ? styles.oddFoundUserIdx
                                        : null
                                }`}
                            >
                                <p>{user.username}</p>
                                <p>{`${user.name} ${user.surname}`}</p>
                            </NavLink>
                        ))}
                    </div>
                ) : null}
                {foundUsers.length === 0 && /\S/.test(searchValue) ? (
                    <div className={styles.foundUsersContainer}>
                        <div className={styles.foundUser}>Nema rezultata</div>
                    </div>
                ) : null}
            </div>
            {popularWorkouts.length > 0 ? (
                <div className={styles.popularWorkoutsContainer}>
                    <p className={styles.popularWorkoutsContainerLabel}>
                        Popularni treninzi:
                    </p>
                    {popularWorkouts.map((workout) => (
                        <Workout key={workout.workoutId} workout={workout} />
                    ))}
                </div>
            ) : (
                <p className={styles.noPopularWorkoutsText}>
                    Trenutno nema popularnih treninga. Treninzi s najviše oznaka
                    sviđanja pojaviti će se ovdje.
                </p>
            )}
        </div>
    )
}

export default Explore
