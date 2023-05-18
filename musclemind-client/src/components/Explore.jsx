import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { IconContext } from 'react-icons'
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
        if (/\S/.test(searchValue)) {
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
                    setFoundUsers(
                        data.filter((element) => {
                            return (
                                element.appUserId !==
                                Number(localStorage.getItem('id'))
                            )
                        })
                    )
                })
        }
    }, [searchValue])
    console.log(foundUsers)
    return (
        <div className={styles.exploreContainer}>
            <div className={styles.userSearchContainer} ref={searchMenuRef}>
                <IconContext.Provider value={{ size: '30px' }}>
                    <BiSearch className={styles.searchIcon} />
                </IconContext.Provider>
                <input
                    className={styles.searchInput}
                    type="text"
                    placeholder="Pretražite korisnike"
                    value={searchValue}
                    onChange={(event) => {
                        setSearchValue(event.target.value)
                        if (!/\S/.test(event.target.value)) setFoundUsers([])
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
                                <p>{user.name}</p>
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
            <div className={styles.popularWorkoutsContainer}>
                <h3>Popularni treninzi</h3>
            </div>
        </div>
    )
}

export default Explore
