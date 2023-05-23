import { useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { BsSave2, BsSave2Fill, BsGrid1X2, BsGrid1X2Fill } from 'react-icons/bs'
import axios from 'axios'

import Loading from './partials/Loading'
import SomethingWentWrong from './partials/SomethingWentWrong'

import styles from '../styles/Profile.module.css'
import Workout from './partials/Workout'
import UserFollowers from './partials/UserFollowers'
import UserFollowing from './partials/UserFollowing'

const Profile = () => {
    const [isSavedWorkoutsSelected, setIsSavedWorkoutsSelected] =
        useState(false)
    const [isFollowersDialogShown, setIsFollowersDialogShown] = useState(false)
    const [isFollowingDialogShown, setIsFollowingDialogShown] = useState(false)

    const {
        data: userInfo,
        isLoading: userInfoLoading,
        isError: userInfoError
    } = useQuery(['users', localStorage.getItem('id')], async () => {
        const { data } = await axios.get(
            `/api/v1/users/${localStorage.getItem('id')}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: userFollowersCount,
        isLoading: userFollowersCountLoading,
        isError: userFollowersCountError
    } = useQuery(
        ['following', 'followerscount', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/following/followerscount/${localStorage.getItem(
                    'id'
                )}`,
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
        data: userFollowingCount,
        isLoading: userFollowingCountLoading,
        isError: userFollowingCountError
    } = useQuery(
        ['following', 'followingcount', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/following/followingcount/${localStorage.getItem(
                    'id'
                )}`,
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
    } = useQuery(['workouts', 'user', localStorage.getItem('id')], async () => {
        const { data } = await axios.get(
            `/api/v1/workouts/user/${localStorage.getItem('id')}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: savedWorkouts,
        isLoading: savedWorkoutsLoading,
        isError: savedWorkoutsError
    } = useQuery(['saving', 'saved', localStorage.getItem('id')], async () => {
        const { data } = await axios.get(
            `/api/v1/saving/saved/${localStorage.getItem('id')}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data.map((el) => {
            return el.savedId.workout
        })
    })

    const workouts = isSavedWorkoutsSelected ? savedWorkouts : userWorkouts

    if (
        userInfoLoading ||
        userFollowersCountLoading ||
        userFollowingCountLoading ||
        userWorkoutsLoading ||
        savedWorkoutsLoading
    )
        return <Loading />
    if (
        userInfoError ||
        userFollowersCountError ||
        userFollowingCountError ||
        userWorkoutsError ||
        savedWorkoutsError
    )
        return <SomethingWentWrong />
    return (
        <div className={styles.userContainer}>
            <UserFollowers
                isFollowersDialogShown={isFollowersDialogShown}
                setIsFollowersDialogShown={setIsFollowersDialogShown}
            />
            <UserFollowing
                isFollowingDialogShown={isFollowingDialogShown}
                setIsFollowingDialogShown={setIsFollowingDialogShown}
            />
            <div className={styles.userInfoContainer}>
                <div className={styles.usernameContactContainer}>
                    <h2>@{userInfo.username}</h2>
                    <p>Kontakt: {userInfo.email}</p>
                </div>
                <div className={styles.followCountContainer}>
                    <div
                        className={styles.followersCount}
                        onClick={() => setIsFollowersDialogShown(true)}
                        onKeyDown={() => setIsFollowersDialogShown(true)}
                        role="button"
                        tabIndex={0}
                    >
                        Pratitetlja: <p>{userFollowersCount}</p>
                    </div>
                    <div
                        className={styles.followingCount}
                        onClick={() => setIsFollowingDialogShown(true)}
                        onKeyDown={() => setIsFollowingDialogShown(true)}
                        role="button"
                        tabIndex={0}
                    >
                        Pratim: <p>{userFollowingCount}</p>
                    </div>
                </div>
            </div>
            <div className={styles.nameBioContainer}>
                <h3>{userInfo.name}</h3>
                <p>{userInfo.bio}</p>
            </div>
            <Link to="/profile/edit" className={styles.editProfileButton}>
                Uredi račun
            </Link>
            <div className={styles.separator}></div>
            <div className={styles.workoutsSection}>
                <div className={styles.workoutsLabelsContainer}>
                    <div
                        className={`${styles.userWorkoutsLabelContainer} ${
                            !isSavedWorkoutsSelected &&
                            styles.workoutLabelSelected
                        }`}
                        onClick={() => setIsSavedWorkoutsSelected(false)}
                        onKeyDown={() => setIsSavedWorkoutsSelected(false)}
                        role="button"
                        tabIndex={0}
                    >
                        <IconContext.Provider value={{ size: '30px' }}>
                            {isSavedWorkoutsSelected ? (
                                <BsGrid1X2 />
                            ) : (
                                <BsGrid1X2Fill />
                            )}
                        </IconContext.Provider>
                        Moji treninzi
                    </div>
                    <div
                        className={`${styles.savedWorkoutsLabelContainer} ${
                            isSavedWorkoutsSelected &&
                            styles.workoutLabelSelected
                        }`}
                        onClick={() => setIsSavedWorkoutsSelected(true)}
                        onKeyDown={() => setIsSavedWorkoutsSelected(true)}
                        role="button"
                        tabIndex={0}
                    >
                        <IconContext.Provider value={{ size: '30px' }}>
                            {isSavedWorkoutsSelected ? (
                                <BsSave2Fill />
                            ) : (
                                <BsSave2 />
                            )}
                        </IconContext.Provider>
                        Spremljeni treninzi
                    </div>
                </div>
                <div className={styles.workoutsContainer}>
                    {workouts.map((workout) => (
                        <Workout key={workout.workoutId} workout={workout} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
