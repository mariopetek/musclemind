import { useQuery } from 'react-query'
import axios from 'axios'
import StatsDialog from './StatsDialog'

const UserStats = ({ isStatsDialogShown, setIsStatsDialogShown }) => {
    const {
        data: exercisedCount,
        isLoading: exercisedCountLoading,
        isError: exercisedCountError
    } = useQuery(
        ['stats', localStorage.getItem('id'), 'exercised'],
        async () => {
            const { data } = await axios.get(
                `/api/v1/stats/${localStorage.getItem('id')}/exercised`,
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
        data: mostCommonLevel,
        isLoading: mostCommonLevelLoading,
        isError: mostCommonLevelError
    } = useQuery(['stats', localStorage.getItem('id'), 'level'], async () => {
        const { data } = await axios.get(
            `/api/v1/stats/${localStorage.getItem('id')}/level`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })
    const {
        data: averageDuration,
        isLoading: averageDurationLoading,
        isError: averageDurationError
    } = useQuery(
        ['stats', localStorage.getItem('id'), 'duration'],
        async () => {
            const { data } = await axios.get(
                `/api/v1/stats/${localStorage.getItem('id')}/duration`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )

            let seconds = Math.floor((data / 1000) % 60)
            let minutes = Math.floor((data / (1000 * 60)) % 60)
            let hours = Math.floor((data / (1000 * 60 * 60)) % 24)
            seconds = seconds < 10 ? `0${seconds}` : seconds
            minutes = minutes < 10 ? `0${minutes}` : minutes
            hours = hours < 10 ? `0${hours}` : hours

            return `${hours}:${minutes}:${seconds}`
        }
    )
    const {
        data: topExercises,
        isLoading: topExercisesLoading,
        isError: topExercisesError
    } = useQuery(
        ['stats', localStorage.getItem('id'), 'exercises'],
        async () => {
            const { data } = await axios.get(
                `/api/v1/stats/${localStorage.getItem('id')}/exercises`,
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
        exercisedCountLoading ||
        mostCommonLevelLoading ||
        averageDurationLoading ||
        topExercisesLoading
    )
        return <p>Učitavanje</p>
    if (
        exercisedCountError ||
        mostCommonLevelError ||
        averageDurationError ||
        topExercisesError
    )
        return <p>Nešto je pošlo po zlu</p>

    return (
        <StatsDialog
            header="Statistika"
            isDialogShown={isStatsDialogShown}
            setIsDialogShown={setIsStatsDialogShown}
            data={[
                { desc: 'Ukuno treninga: ', value: exercisedCount },
                {
                    desc: 'Najčešća težina: ',
                    value: mostCommonLevel?.levelName
                },
                { desc: 'Prosječno vrijeme: ', value: averageDuration }
            ]}
            topExercises={{ desc: 'Najčešće vježbe: ', value: topExercises }}
        />
    )
}

export default UserStats
