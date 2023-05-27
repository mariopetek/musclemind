import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

import styles from '../styles/User.module.css'
import SomethingWentWrong from './partials/SomethingWentWrong'
import Loading from './partials/Loading'
import Workout from './partials/Workout'

const User = () => {
    const { userId } = useParams()
    const queryClient = useQueryClient()

    if (userId === localStorage.getItem('id')) {
        return <Navigate to="/profile" />
    }

    const {
        data: userInfo,
        isLoading: userInfoLoading,
        isError: userInfoError
    } = useQuery(['users', userId], async () => {
        const { data } = await axios.get(`/api/v1/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        return data
    })

    const {
        data: userFollowersCount,
        isLoading: userFollowersCountLoading,
        isError: userFollowersCountError
    } = useQuery(['following', 'followerscount', userId], async () => {
        const { data } = await axios.get(
            `/api/v1/following/followerscount/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: userFollowingCount,
        isLoading: userFollowingCountLoading,
        isError: userFollowingCountError
    } = useQuery(['following', 'followingcount', userId], async () => {
        const { data } = await axios.get(
            `/api/v1/following/followingcount/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: isUserFollowingUser,
        isLoading: isUserFollowingUserLoading,
        isError: isUserFollowingUserError
    } = useQuery(
        ['following', 'isfollowing', localStorage.getItem('id'), userId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/following/isfollowing/${localStorage.getItem(
                    'id'
                )}/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        }
    )

    const {
        data: userWorkouts,
        isLoading: userWorkoutsLoading,
        isError: userWorkoutsError
    } = useQuery(['workouts', 'public', 'user', userId], async () => {
        const { data } = await axios.get(
            `/api/v1/workouts/public/user/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })

    const followUserMutation = useMutation(
        async () => {
            const { data } = await axios.post(
                `/api/v1/following/follow/${localStorage.getItem(
                    'id'
                )}/${userId}`,
                {},
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
                    'following',
                    'followerscount',
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
        async () => {
            const { data } = await axios.delete(
                `/api/v1/following/unfollow/${localStorage.getItem(
                    'id'
                )}/${userId}`,
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
                    'following',
                    'followerscount',
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
        if (isUserFollowingUser) {
            unfollowUserMutation.mutate()
        } else {
            followUserMutation.mutate()
        }
    }

    if (
        userInfoLoading ||
        userFollowersCountLoading ||
        userFollowingCountLoading ||
        isUserFollowingUserLoading ||
        userWorkoutsLoading
    )
        return <Loading />
    if (
        userInfoError ||
        userFollowersCountError ||
        userFollowingCountError ||
        isUserFollowingUserError ||
        userWorkoutsError
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
                        value={isUserFollowingUser ? 'Otprati' : 'Prati'}
                        onClick={handleFollowEvent}
                        className={`${styles.followButtonTemplate} ${
                            isUserFollowingUser
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
                {userWorkouts.length > 0 ? (
                    userWorkouts.map((workout) => (
                        <Workout key={workout.workoutId} workout={workout} />
                    ))
                ) : (
                    <h1>Nema treninga</h1>
                )}
            </div>
        </div>
    )
}

export default User
