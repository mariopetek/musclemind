import { useState } from 'react'
import { useQuery, useQueries, useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../styles/User.module.css'
import SomethingWentWrong from './partials/SomethingWentWrong'
import Loading from './partials/Loading'
import UserWorkout from './partials/UserWorkout'

const User = () => {
    const { userId } = useParams()
    const [userWorkouts, setUserWorkouts] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [userFollowersCount, setUserFollowersCount] = useState(null)
    const [userFollowingCount, setUserFollowingCount] = useState(null)
    const queryClient = useQueryClient()

    const {
        data: userInfo,
        isLoading: userInfoLoading,
        isError: userInfoError
    } = useQuery(['users', userId], () => {
        return axios
            .get(`/api/v1/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                return response.data
            })
    })

    const userFollowersCountQuery = useQuery(
        ['following', 'followedbycount', userId],
        () => {
            return axios
                .get(`/api/v1/following/followedbycount/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (data) => setUserFollowersCount(data)
        }
    )
    const userFollowingCountQuery = useQuery(
        ['following', 'followingcount', userId],
        () => {
            return axios
                .get(`/api/v1/following/followingcount/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (data) => setUserFollowingCount(data)
        }
    )
    const isAppUserFollowingUserQuery = useQuery(
        ['following', 'isfollowing', localStorage.getItem('id'), userId],
        () => {
            return axios
                .get(
                    `/api/v1/following/isfollowing/${localStorage.getItem(
                        'id'
                    )}/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'jwt'
                            )}`
                        }
                    }
                )
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (data) => setIsFollowing(data)
        }
    )

    const userWorkoutsQuery = useQuery(
        ['workouts', 'user', userId],
        () => {
            return axios
                .get(`/api/v1/workouts/user/${userId}`, {
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

    const followUserMutation = useMutation(
        () => {
            return axios
                .post(
                    `/api/v1/following/follow/${localStorage.getItem(
                        'id'
                    )}/${userId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'jwt'
                            )}`
                        }
                    }
                )
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    'following',
                    'followedbycount',
                    userId
                ])
                queryClient.invalidateQueries([
                    'following',
                    'followingcount',
                    userId
                ])
                queryClient.invalidateQueries([
                    'following',
                    'isfollowing',
                    localStorage.getItem('id'),
                    userId
                ])
            }
        }
    )
    const unfollowUserMutation = useMutation(
        () => {
            return axios
                .delete(
                    `/api/v1/following/unfollow/${localStorage.getItem(
                        'id'
                    )}/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'jwt'
                            )}`
                        }
                    }
                )
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    'following',
                    'followedbycount',
                    userId
                ])
                queryClient.invalidateQueries([
                    'following',
                    'followingcount',
                    userId
                ])
                queryClient.invalidateQueries([
                    'following',
                    'isfollowing',
                    localStorage.getItem('id'),
                    userId
                ])
            }
        }
    )

    const handleFollowEvent = () => {
        if (isFollowing) {
            unfollowUserMutation.mutate()
        } else {
            followUserMutation.mutate()
        }
    }

    if (
        userInfoLoading ||
        userWorkoutsQuery.isLoading ||
        userFollowersCountQuery.isLoading ||
        userFollowingCountQuery.isLoading ||
        isAppUserFollowingUserQuery.isLoading ||
        workoutsExercises.filter((workoutExercises) => {
            return workoutExercises.isLoading
        }).length > 0
    )
        return <Loading />
    if (
        userInfoError ||
        userWorkoutsQuery.isError ||
        userFollowersCountQuery.isError ||
        userFollowingCountQuery.isError ||
        isAppUserFollowingUserQuery.isError ||
        workoutsExercises.filter((workoutExercises) => {
            return workoutExercises.isError
        }).length > 0
    )
        return <SomethingWentWrong />

    return (
        <div className={styles.userContainer}>
            <div className={styles.userInfoContainer}>
                <div className={styles.usernameContactButton}>
                    <div className={styles.usernameAndContact}>
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
                </div>
                <div className={styles.followCountContainer}>
                    <div className={styles.followersCount}>
                        Pratitetlja: <p>{userFollowersCount}</p>
                    </div>
                    <div className={styles.followingCount}>
                        Prati: <p>{userFollowingCount}</p>
                    </div>
                </div>
            </div>
            <div className={styles.nameBioContainer}>
                <h3>{userInfo.name}</h3>
                <p>{userInfo.bio}</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.userWorkoutsContainer}>
                <h2>Treninzi</h2>
                {workoutsExercises.length > 0 ? (
                    workoutsExercises.map(({ data }) => (
                        <UserWorkout key={data.workoutId} workoutInfo={data} />
                    ))
                ) : (
                    <h1>Nema treninga</h1>
                )}
                {}
            </div>
        </div>
    )
}

export default User
