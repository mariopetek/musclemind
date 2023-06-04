import { useQuery } from 'react-query'
import { IconContext } from 'react-icons'
import { RxLapTimer } from 'react-icons/rx'
import { FaHashtag } from 'react-icons/fa'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'

import {
    StyledTableBodyRow,
    StyledTableHead,
    StyledTableHeadCell,
    StyledTableBodyCell,
    StyledTableContainer
} from './StyledTable'
import styles from '../../styles/ExercisesTable.module.css'

const ExercisesTable = ({ workoutId }) => {
    const {
        data: workoutExercises,
        isLoading: workoutExercisesLoading,
        isError: workoutExercisesError
    } = useQuery(['workoutexercises', 'workout', workoutId], async () => {
        const { data } = await axios.get(
            `/api/v1/workoutexercises/workout/${workoutId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            }
        )
        return data
    })

    if (workoutExercisesLoading) return <p>Učitavanje</p>
    if (workoutExercisesError) return <p>Nešto je pošlo po zlu</p>
    return (
        <div className={styles.exercisesContainer}>
            <StyledTableContainer>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <StyledTableHeadCell>
                                Vježba | Kategorija
                            </StyledTableHeadCell>
                            <StyledTableHeadCell align="center">
                                <IconContext.Provider value={{ size: '15px' }}>
                                    <FaHashtag />
                                </IconContext.Provider>
                                <p>Ponavljanja</p>
                            </StyledTableHeadCell>
                            <StyledTableHeadCell align="center">
                                <IconContext.Provider value={{ size: '15px' }}>
                                    <FaHashtag />
                                </IconContext.Provider>
                                <p>Serije</p>
                            </StyledTableHeadCell>
                            <StyledTableHeadCell align="center">
                                <IconContext.Provider value={{ size: '15px' }}>
                                    <RxLapTimer />
                                </IconContext.Provider>
                                <p>Odmor</p>
                            </StyledTableHeadCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {workoutExercises.map(
                            ({
                                workoutExerciseId,
                                numberOfReps,
                                numberOfSets,
                                rest
                            }) => (
                                <StyledTableBodyRow
                                    key={workoutExerciseId.exercise.exerciseId}
                                >
                                    <StyledTableBodyCell>{`${workoutExerciseId.exercise.exerciseName} | ${workoutExerciseId.exercise.category.categoryName}`}</StyledTableBodyCell>
                                    <StyledTableBodyCell align="center">
                                        {numberOfReps}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell align="center">
                                        {numberOfSets}
                                    </StyledTableBodyCell>
                                    <StyledTableBodyCell align="center">
                                        {Number(rest.split(':')[0]) > 0 &&
                                            Number(rest.split(':')[1]) > 0 &&
                                            `${Number(
                                                rest.split(':')[0]
                                            )} min ${Number(
                                                rest.split(':')[1]
                                            )} sek`}
                                        {Number(rest.split(':')[0]) > 0 &&
                                            Number(rest.split(':')[1]) === 0 &&
                                            `${Number(rest.split(':')[0])} min`}
                                        {Number(rest.split(':')[0]) === 0 &&
                                            Number(rest.split(':')[1]) > 0 &&
                                            `${Number(rest.split(':')[1])} sek`}
                                        {Number(rest.split(':')[0]) === 0 &&
                                            Number(rest.split(':')[1]) === 0 &&
                                            '0 sek'}
                                    </StyledTableBodyCell>
                                </StyledTableBodyRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    )
}

export default ExercisesTable
