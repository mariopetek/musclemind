import { useQuery, useMutation, useQueryClient } from 'react-query'
import { IconContext } from 'react-icons'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { BsHeart, BsHeartFill, BsSave, BsSaveFill } from 'react-icons/bs'
import axios from 'axios'
import Loading from './Loading'
import SomethingWentWrong from './SomethingWentWrong'
import styles from '../../styles/Workout.module.css'
import ExercisesTable from './ExercisesTable'

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
        isLoadin: isWorkoutSavedLoading,
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

    if (
        workoutLikesCountLoading ||
        workoutSavesCountLoading ||
        isWorkoutLikedLoading ||
        isWorkoutSavedLoading
    )
        return <Loading />
    if (
        workoutLikesCountError ||
        workoutSavesCountError ||
        isWorkoutLikedError ||
        isWorkoutSavedError
    )
        return <SomethingWentWrong />

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
                <p> | {workout.appUser.username}</p>
            </div>
            <h4>{workout.level.levelName}</h4>
            <div className={styles.workoutNameBio}>
                <h3>{workout.workoutName}</h3>
                <p>{workout.workoutDescription}</p>
            </div>
            <div className={styles.separator}></div>
            <ExercisesTable workoutId={workout.workoutId} />
            <div className={styles.workoutOptionsContainer}>
                <div className={styles.deleteButtonContainer}>{children}</div>
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
            </div>
        </div>
    )
}

export default Workout
