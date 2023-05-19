import { useQuery } from 'react-query'
import axios from 'axios'
import Loading from './Loading'
import SomethingWentWrong from './SomethingWentWrong'

const MyWorkout = ({ userInfo, workout }) => {
    const {
        data: workoutExercises,
        isLoading: workoutExercisesLoading,
        isError: workoutExercisesError
    } = useQuery(
        ['workoutexercises', 'workout', workout.workoutId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/workoutexercises/workout/${workout.workoutId}`,
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
        data: isWorkoutLiked,
        isLoading: isWorkoutLikedLoading,
        isError: isWorkoutLikedError
    } = useQuery(
        ['liking', 'isliked', userInfo.appUserId, workout.workoutId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/liking/isliked/${userInfo.appUserId}/${workout.workoutId}`,
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
        data: isWorkoutSaved,
        isLoadin: isWorkoutSavedLoading,
        isError: isWorkoutSavedError
    } = useQuery(
        ['saving', 'issaved', userInfo.appUserId, workout.workoutId],
        async () => {
            const { data } = await axios.get(
                `/api/v1/saving/issaved/${userInfo.appUserId}/${workout.workoutId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        }
    )

    if (
        workoutExercisesLoading ||
        workoutLikesCountLoading ||
        workoutSavesCountLoading ||
        isWorkoutLikedLoading ||
        isWorkoutSavedLoading
    )
        return <Loading />
    if (
        workoutExercisesError ||
        workoutLikesCountError ||
        workoutSavesCountError ||
        isWorkoutLikedError ||
        isWorkoutSavedError
    )
        return <SomethingWentWrong />

    return <div>MyWorkout</div>
}

export default MyWorkout
