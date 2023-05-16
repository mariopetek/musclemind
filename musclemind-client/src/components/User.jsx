import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../styles/User.module.css'
import SomethingWentWrong from './partials/SomethingWentWrong'
import Loading from './partials/Loading'

const User = () => {
    const { appUserId } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [userWorkouts, setUserWorkouts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)

    const userQuery = useQuery(
        ['users', appUserId],
        async () => {
            return axios
                .get(`/api/v1/users/${appUserId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (data) => {
                setUserInfo(data)
            }
        }
    )
    const getWorkoutsExercises = async (workoutId) => {
        return axios
            .get(`/api/v1/workoutexercises/workout/${workoutId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                return response.data
            })
            .then((data) => {
                setUserWorkouts((prev) => {
                    return prev.map((workout) => {
                        return workout.workoutId === workoutId
                            ? { ...workout, exercises: data }
                            : workout
                    })
                })
            })
    }

    const userWorkoutsQuery = useQuery(
        ['workouts', 'user', appUserId],
        async () => {
            return axios
                .get(`/api/v1/workouts/user/${appUserId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (data) => {
                setUserWorkouts(data)
                data.map((workout) => getWorkoutsExercises(workout.workoutId))
            }
        }
    )

    if (userQuery.isLoading || userWorkoutsQuery.isLoading) return <Loading />
    if (userQuery.error || userWorkoutsQuery.error)
        return <SomethingWentWrong />

    return (
        <div className={styles.userContainer}>
            <div className={styles.userInfoContainer}>
                <div>
                    <h2>@{userInfo.username}</h2>
                    <p>Kontakt: {userInfo.email}</p>
                </div>
                <input
                    type="button"
                    value={isFollowing ? 'Otprati' : 'Prati'}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`${styles.followButtonTemplate} ${
                        isFollowing
                            ? styles.unfollowButton
                            : styles.followButton
                    }`}
                />
                Pratitetlja: Prati:
            </div>
            <div className={styles.separator}></div>
            {console.log(userWorkouts)}
        </div>
    )
}

export default User
