import { useQuery, useMutation, useQueryClient } from 'react-query'
import { IconContext } from 'react-icons'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { BsHeart, BsHeartFill, BsSave, BsSaveFill } from 'react-icons/bs'
import { FiGlobe, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from '../../styles/Workout.module.css'
import ExercisesTable from './ExercisesTable'

const levelColors = {
    1: 'royalblue',
    2: 'green',
    3: 'orange',
    4: 'red'
}

const visibilityIcons = {
    1: <FiLock />,
    2: <FiGlobe />
}

const Workout = ({ workout, children }) => {
    const queryClient = useQueryClient()

    const {
        data: workoutLikesCount,
        isLoading: workoutLikesCountLoading,
        isError: workoutLikesCountError
    } = useQuery(['liking', 'count', workout.workoutId], async () => {
        const { data } = await axios.get(
            `/api/v1/liking/count/${workout.workoutId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: isWorkoutLiked,
        isLoading: isWorkoutLikedLoading,
        isError: isWorkoutLikedError
    } = useQuery(
        ['liking', 'isliked', localStorage.getItem('id'), workout.workoutId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/liking/isliked/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
        data: workoutSavesCount,
        isLoading: workoutSavesCountLoading,
        isError: workoutSavesCountError
    } = useQuery(['saving', 'count', workout.workoutId], async () => {
        const { data } = await axios.get(
            `/api/v1/saving/count/${workout.workoutId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: isWorkoutSaved,
        isLoading: isWorkoutSavedLoading,
        isError: isWorkoutSavedError
    } = useQuery(
        ['saving', 'issaved', localStorage.getItem('id'), workout.workoutId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/saving/issaved/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
        data: exercisingInfo,
        isLoading: exercisingInfoLoading,
        isError: exercisingInfoError
    } = useQuery(
        ['exercising', 'info', localStorage.getItem('id'), workout.workoutId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/exercising/info/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        }
    )

    const likeWorkoutMutation = useMutation(
        async () => {
            const { data } = await axios.post(
                `/api/v1/liking/like/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
                    'liking',
                    'count',
                    workout.workoutId
                ])
                queryClient.invalidateQueries([
                    'liking',
                    'isliked',
                    localStorage.getItem('id'),
                    workout.workoutId
                ])
            }
        }
    )
    const unlikeWorkoutMutation = useMutation(
        async () => {
            const { data } = await axios.delete(
                `/api/v1/liking/unlike/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
                    'liking',
                    'count',
                    workout.workoutId
                ])
                queryClient.invalidateQueries([
                    'liking',
                    'isliked',
                    localStorage.getItem('id'),
                    workout.workoutId
                ])
            }
        }
    )

    const saveWorkoutMutation = useMutation(
        async () => {
            const { data } = await axios.post(
                `/api/v1/saving/save/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
                    'saving',
                    'count',
                    workout.workoutId
                ])
                queryClient.invalidateQueries([
                    'saving',
                    'issaved',
                    localStorage.getItem('id'),
                    workout.workoutId
                ])
            }
        }
    )
    const unsaveWorkoutMutation = useMutation(
        async () => {
            const { data } = await axios.delete(
                `/api/v1/saving/unsave/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
                    'saving',
                    'count',
                    workout.workoutId
                ])
                queryClient.invalidateQueries([
                    'saving',
                    'issaved',
                    localStorage.getItem('id'),
                    workout.workoutId
                ])
            }
        }
    )

    const startWorkoutMutation = useMutation(
        async () => {
            const { data } = await axios.post(
                `/api/v1/exercising/start/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
                    'exercising',
                    'info',
                    localStorage.getItem('id'),
                    workout.workoutId
                ])
            }
        }
    )
    const finishWorkoutMutation = useMutation(
        async () => {
            const { data } = await axios.put(
                `/api/v1/exercising/finish/${localStorage.getItem('id')}/${
                    workout.workoutId
                }`,
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
                    'exercising',
                    'info',
                    localStorage.getItem('id'),
                    workout.workoutId
                ])
            }
        }
    )

    const handleLikeEvent = () => {
        if (isWorkoutLiked) {
            unlikeWorkoutMutation.mutate()
        } else {
            likeWorkoutMutation.mutate()
        }
    }
    const handleSaveEvent = () => {
        if (isWorkoutSaved) {
            unsaveWorkoutMutation.mutate()
        } else {
            saveWorkoutMutation.mutate()
        }
    }
    const handleWorkoutEvent = () => {
        if (exercisingInfo !== null && exercisingInfo.timeFinished === null) {
            finishWorkoutMutation.mutate()
        } else {
            startWorkoutMutation.mutate()
        }
    }

    if (
        workoutLikesCountLoading ||
        workoutSavesCountLoading ||
        isWorkoutLikedLoading ||
        isWorkoutSavedLoading ||
        exercisingInfoLoading
    )
        return <p>Učitavanje</p>
    if (
        workoutLikesCountError ||
        workoutSavesCountError ||
        isWorkoutLikedError ||
        isWorkoutSavedError ||
        exercisingInfoError
    )
        return <p>Nešto je pošlo po zlu</p>
    return (
        <div className={styles.workoutInfoContainer}>
            <div className={styles.timeAddedContainer}>
                <IconContext.Provider value={{ size: '20px' }}>
                    <HiOutlineCalendarDays className={styles.calendarIcon} />
                </IconContext.Provider>
                <p>
                    {new Date(workout.timeAdded).toLocaleDateString('hr-HR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
                <p>
                    {new Date(workout.timeAdded).toLocaleTimeString('hr-HR', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}
                </p>
                |
                <Link
                    className={styles.usernameLink}
                    to={`/explore/users/${workout.appUser.appUserId}`}
                >
                    {workout.appUser.username}
                </Link>
            </div>
            <h4 style={{ color: levelColors[workout.level.levelId] }}>
                {workout.level.levelName}
            </h4>
            <div className={styles.workoutNameBio}>
                <div className={styles.workoutName}>
                    <h3>{workout.workoutName}</h3>
                    {visibilityIcons[workout.visibility.visibilityId]}
                </div>
                <p>{workout.workoutDescription}</p>
            </div>
            <div className={styles.separator}></div>
            <ExercisesTable workout={workout} />
            <div className={styles.workoutOptionsContainer}>
                {children !== undefined && (
                    <div className={styles.deleteButtonContainer}>
                        {children}
                    </div>
                )}
                {children === undefined && (
                    <div className={styles.startWorkoutButtonContainer}>
                        <input
                            type="button"
                            title={
                                exercisingInfo !== null &&
                                exercisingInfo.timeFinished === null
                                    ? 'Završi trening'
                                    : 'Započni trening'
                            }
                            value={
                                exercisingInfo !== null &&
                                exercisingInfo.timeFinished === null
                                    ? 'Završi trening'
                                    : 'Započni trening'
                            }
                            onClick={handleWorkoutEvent}
                            className={
                                exercisingInfo !== null &&
                                exercisingInfo.timeFinished === null
                                    ? styles.finishWorkout
                                    : styles.startWorkout
                            }
                        />
                        {exercisingInfo !== null && (
                            <div className={styles.exercisingTimeContainer}>
                                {exercisingInfo.timeFinished === null
                                    ? `Započeto: ${new Date(
                                          exercisingInfo.exercisingId.timeStarted
                                      ).toLocaleDateString('hr-HR', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric'
                                      })}`
                                    : `Završeno: ${new Date(
                                          exercisingInfo.timeFinished
                                      ).toLocaleDateString('hr-HR', {
                                          day: 'numeric',
                                          month: 'long',
                                          year: 'numeric',
                                          hour: 'numeric',
                                          minute: 'numeric'
                                      })}`}
                            </div>
                        )}
                    </div>
                )}
                {workout.visibility.visibilityId === 2 &&
                    children === undefined && (
                        <div className={styles.saveLikeContainer}>
                            <div className={styles.likeContainer}>
                                <IconContext.Provider value={{ size: '25px' }}>
                                    {isWorkoutLiked ? (
                                        <BsHeartFill
                                            className={styles.likeIcon}
                                            onClick={handleLikeEvent}
                                            title={`Odznači sa "sviđa mi se"`}
                                        />
                                    ) : (
                                        <BsHeart
                                            className={styles.likeIcon}
                                            onClick={handleLikeEvent}
                                            title={`Označi sa "sviđa mi se"`}
                                        />
                                    )}
                                </IconContext.Provider>
                                <p>{workoutLikesCount}</p>
                            </div>
                            <div className={styles.saveContainer}>
                                <IconContext.Provider value={{ size: '25px' }}>
                                    {isWorkoutSaved ? (
                                        <BsSaveFill
                                            className={styles.saveIcon}
                                            onClick={handleSaveEvent}
                                            title="Odspremi"
                                        />
                                    ) : (
                                        <BsSave
                                            className={styles.saveIcon}
                                            onClick={handleSaveEvent}
                                            title="Spremi"
                                        />
                                    )}
                                </IconContext.Provider>
                                <p>{workoutSavesCount}</p>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default Workout
