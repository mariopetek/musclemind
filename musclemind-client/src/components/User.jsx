import { useState } from 'react'
import { useQuery, useQueries } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../styles/User.module.css'
import SomethingWentWrong from './partials/SomethingWentWrong'
import Loading from './partials/Loading'
import UserWorkout from './partials/UserWorkout'

const User = () => {
    const { appUserId } = useParams()
    const [userInfo, setUserInfo] = useState({})
    const [userWorkouts, setUserWorkouts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)

    const userQuery = useQuery(
        ['users', appUserId],
        () => {
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

    const userWorkoutsQuery = useQuery(
        ['workouts', 'user', appUserId],
        () => {
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
            }
        }
    )

    const workoutsExercises = useQueries(
        userWorkouts.map((workout) => {
            return {
                queryKey: ['workoutexercises', 'workout', workout.workoutId],
                queryFn: () => {
                    return axios
                        .get(
                            `/api/v1/workoutexercises/workout/${workout.workoutId}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                        'jwt'
                                    )}`
                                }
                            }
                        )
                        .then((response) => {
                            return { ...workout, exercises: response.data }
                        })
                }
            }
        })
    )

    const handleFollowEvent = () => {
        setIsFollowing(!isFollowing)
    }

    if (
        userQuery.isLoading ||
        userWorkoutsQuery.isLoading ||
        workoutsExercises.filter((workoutExercises) => {
            return workoutExercises.isLoading
        }).length > 0
    )
        return <Loading />
    if (
        userQuery.isError ||
        userWorkoutsQuery.isError ||
        workoutsExercises.filter((workoutExercises) => {
            return workoutExercises.isError
        }).length > 0
    )
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
                    onClick={handleFollowEvent}
                    className={`${styles.followButtonTemplate} ${
                        isFollowing
                            ? styles.unfollowButton
                            : styles.followButton
                    }`}
                />
                <div className={styles.followCountContainer}>
                    <div className={styles.followersCount}>Pratitetlja:</div>
                    <div className={styles.followingCount}>Prati:</div>
                </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.userWorkoutsContainer}>
                <h2>Treninzi</h2>
                {workoutsExercises.map(({ data }) => (
                    <UserWorkout key={data.workoutId} workoutInfo={data} />
                ))}
            </div>
            {console.log(workoutsExercises)}
        </div>
    )
}

export default User
