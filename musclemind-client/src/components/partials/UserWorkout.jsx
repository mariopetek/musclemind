import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { IconContext } from 'react-icons'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { RxLapTimer } from 'react-icons/rx'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsSave, BsSaveFill } from 'react-icons/bs'
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

import styles from '../../styles/UserWorkout.module.css'

const UserWorkout = ({ workoutInfo }) => {
    const [isWorkoutLiked, setIsWorkoutLiked] = useState(false)
    const [isWorkoutSaved, setIsWorkoutSaved] = useState(false)
    const [workoutLikes, setWorkoutLikes] = useState(0)
    const queryClient = useQueryClient()

    const workoutLikesCountQuery = useQuery(
        ['liking', 'count', workoutInfo.workoutId],
        () => {
            return axios
                .get(`/api/v1/liking/count/${workoutInfo.workoutId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (data) => setWorkoutLikes(data)
        }
    )

    const isWorkoutLikedByAppUserQuery = useQuery(
        [
            'liking',
            'isliked',
            localStorage.getItem('id'),
            workoutInfo.workoutId
        ],
        () => {
            return axios
                .get(
                    `/api/v1/liking/isliked/${localStorage.getItem('id')}/${
                        workoutInfo.workoutId
                    }`,
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
            onSuccess: (data) => setIsWorkoutLiked(data)
        }
    )

    const likeWorkoutMutation = useMutation(
        () => {
            return axios
                .post(
                    `/api/v1/liking/like/${localStorage.getItem('id')}/${
                        workoutInfo.workoutId
                    }`,
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
                    'liking',
                    'count',
                    workoutInfo.workoutId
                ])
                queryClient.invalidateQueries([
                    'liking',
                    'isliked',
                    localStorage.getItem('id'),
                    workoutInfo.workoutId
                ])
            }
        }
    )
    const unlikeWorkoutMutation = useMutation(
        () => {
            return axios
                .delete(
                    `/api/v1/liking/unlike/${localStorage.getItem('id')}/${
                        workoutInfo.workoutId
                    }`,
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
                    'liking',
                    'count',
                    workoutInfo.workoutId
                ])
                queryClient.invalidateQueries([
                    'liking',
                    'isliked',
                    localStorage.getItem('id'),
                    workoutInfo.workoutId
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

    if (
        workoutLikesCountQuery.isLoading ||
        isWorkoutLikedByAppUserQuery.isLoading
    )
        return <p>Učitavanje</p>

    return (
        <div className={styles.workoutInfoContainer}>
            <div className={styles.timeAddedContainer}>
                <IconContext.Provider value={{ size: '20px' }}>
                    <HiOutlineCalendarDays className={styles.calendarIcon} />
                </IconContext.Provider>
                <p>
                    {new Date(workoutInfo.timeAdded).toLocaleDateString(
                        'hr-HR',
                        {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        }
                    )}
                </p>
                <p>
                    {new Date(workoutInfo.timeAdded).toLocaleTimeString(
                        'hr-HR',
                        {
                            hour: 'numeric',
                            minute: 'numeric'
                        }
                    )}
                </p>
            </div>
            <h4>{workoutInfo.level.levelName}</h4>
            <div className={styles.workoutNameBio}>
                <h3>{workoutInfo.workoutName}</h3>
                <p>{workoutInfo.workoutDescription}</p>
            </div>
            <div className={styles.separator}></div>

            <div className={styles.exercisesContainer}>
                <StyledTableContainer>
                    <Table>
                        <StyledTableHead>
                            <TableRow>
                                <StyledTableHeadCell>
                                    Vježba | Kategorija
                                </StyledTableHeadCell>
                                <StyledTableHeadCell align="center">
                                    <IconContext.Provider
                                        value={{ size: '15px' }}
                                    >
                                        <FaHashtag
                                            className={styles.numberIcon}
                                        />
                                    </IconContext.Provider>
                                    <p>Ponavljanja</p>
                                </StyledTableHeadCell>
                                <StyledTableHeadCell align="center">
                                    <IconContext.Provider
                                        value={{ size: '15px' }}
                                    >
                                        <FaHashtag
                                            className={styles.numberIcon}
                                        />
                                    </IconContext.Provider>
                                    <p>Serije</p>
                                </StyledTableHeadCell>
                                <StyledTableHeadCell align="center">
                                    <IconContext.Provider
                                        value={{ size: '15px' }}
                                    >
                                        <RxLapTimer
                                            className={styles.timerIcon}
                                        />
                                    </IconContext.Provider>
                                    <p>Odmor</p>
                                </StyledTableHeadCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {workoutInfo.exercises.map(
                                ({
                                    workoutExerciseId,
                                    numberOfReps,
                                    numberOfSets,
                                    rest
                                }) => (
                                    <StyledTableBodyRow
                                        key={
                                            workoutExerciseId.exercise
                                                .exerciseId
                                        }
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
                                                Number(rest.split(':')[1]) >
                                                    0 &&
                                                `${Number(
                                                    rest.split(':')[0]
                                                )} min ${Number(
                                                    rest.split(':')[1]
                                                )} sek`}
                                            {Number(rest.split(':')[0]) > 0 &&
                                                Number(rest.split(':')[1]) ===
                                                    0 &&
                                                `${Number(
                                                    rest.split(':')[0]
                                                )} min`}
                                            {Number(rest.split(':')[0]) === 0 &&
                                                Number(rest.split(':')[1]) >
                                                    0 &&
                                                `${Number(
                                                    rest.split(':')[1]
                                                )} sek`}
                                            {Number(rest.split(':')[0]) === 0 &&
                                                Number(rest.split(':')[1]) ===
                                                    0 &&
                                                '0 sek'}
                                        </StyledTableBodyCell>
                                    </StyledTableBodyRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </div>
            <div className={styles.workoutOptionsContainer}>
                <div className={styles.likeContainer}>
                    <IconContext.Provider value={{ size: '30px' }}>
                        {isWorkoutLiked ? (
                            <AiFillHeart
                                className={styles.likeIcon}
                                onClick={handleLikeEvent}
                            />
                        ) : (
                            <AiOutlineHeart
                                className={styles.likeIcon}
                                onClick={handleLikeEvent}
                            />
                        )}
                    </IconContext.Provider>
                    {workoutLikes}
                </div>
                <div className={styles.saveContainer}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        {isWorkoutSaved ? (
                            <BsSaveFill
                                className={styles.saveIcon}
                                onClick={() => setIsWorkoutSaved(false)}
                            />
                        ) : (
                            <BsSave
                                className={styles.saveIcon}
                                onClick={() => setIsWorkoutSaved(true)}
                            />
                        )}
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}

export default UserWorkout
