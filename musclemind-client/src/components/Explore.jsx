import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import styles from '../styles/Explore.module.css'

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

    useEffect(() => {
        axios
            .get(`/api/v1/users/search?username=${searchValue}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                return response.data
            })
            .then((data) => {
                setFoundUsers(data)
            })
    }, [searchValue])
    console.log(searchValue)
    return (
        <div className={styles.exploreContainer}>
            <div className={styles.userSearchContainer} ref={searchMenuRef}>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Pretražite korisnike"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
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
                                key={user.appUserId}
                                className={`${styles.foundUser} ${
                                    idx % 2 === 1
                                        ? styles.oddFoundUserIdx
                                        : null
                                }`}
                            >
                                {user.username}
                            </NavLink>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className={styles.popularWorkoutsContainer}>
                <h3>Popularni treninzi</h3>
            </div>
        </div>
    )
}

export default Explore
