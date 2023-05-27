import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { IconContext } from 'react-icons'
import { BsEmojiFrown } from 'react-icons/bs'
import axios from 'axios'

import styles from '../styles/NewWorkout.module.css'
import Loading from './partials/Loading'
import SomethingWentWrong from './partials/SomethingWentWrong'

const NewWorkout = () => {
    const [visibilityId, setVisibilityId] = useState(1)
    const [levelId, setLevelId] = useState(1)
    const [totalSets, setTotalSets] = useState(1)
    const [workoutName, setWorkoutName] = useState('')
    const [workoutDesc, setWorkoutDesc] = useState('')
    const [exerciseInput, setExerciseInput] = useState('')
    const [workoutExercises, setWorkoutExercises] = useState([])

    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const exercisesQuery = useQuery(['allExercises'], async () => {
        return axios
            .get('/api/v1/exercises', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                return response.data
            })
    })
    const visibilitiesQuery = useQuery(['allVisibilities'], async () => {
        return axios
            .get('/api/v1/visibilities', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                return response.data
            })
    })
    const levelsQuery = useQuery(['allLevels'], async () => {
        return axios
            .get('/api/v1/levels', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then((response) => {
                return response.data
            })
    })

    const addExercise = () => {
        setWorkoutExercises((prevExercises) => [
            ...prevExercises,
            {
                id: Number(exerciseInput.split(' | ')[0]),
                name: `${exerciseInput.split(' | ')[1]} | ${
                    exerciseInput.split(' | ')[2]
                }`,
                sets: 1,
                reps: 1,
                rest: {
                    minutes: 0,
                    seconds: 0
                }
            }
        ])
        setExerciseInput('')
    }
    const removeExercise = (exerciseId) => {
        setWorkoutExercises(
            workoutExercises.filter((exercise) => exercise.id !== exerciseId)
        )
    }

    const decreaseReps = (exerciseId) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          reps: exercise.reps > 1 ? exercise.reps - 1 : 1
                      }
                    : exercise
            })
        )
    }
    const increaseReps = (exerciseId) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? { ...exercise, reps: exercise.reps + 1 }
                    : exercise
            })
        )
    }
    const handleRepsChange = (exerciseId, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          reps: Number(value) < 1 ? 1 : Number(value)
                      }
                    : exercise
            })
        )
    }

    const decreaseSets = (exerciseId) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          sets: exercise.sets > 1 ? exercise.sets - 1 : 1
                      }
                    : exercise
            })
        )
    }
    const increaseSets = (exerciseId) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          sets: exercise.sets + 1
                      }
                    : exercise
            })
        )
    }
    const handleSetsChange = (exerciseId, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          sets: Number(value) < 1 ? 1 : Number(value)
                      }
                    : exercise
            })
        )
    }

    const handleRestChange = (exerciseId, unitName, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          rest: {
                              [unitName]:
                                  Number(value) > 59 || Number(value) < 0
                                      ? 0
                                      : Number(value),
                              [unitName === 'minutes' ? 'seconds' : 'minutes']:
                                  unitName === 'minutes'
                                      ? exercise.rest.seconds
                                      : exercise.rest.minutes
                          }
                      }
                    : exercise
            })
        )
    }

    const handleTotalSetsChange = (value) => {
        setTotalSets(Number(value) < 1 ? 1 : Number(value))
    }

    const workoutExercisesMutation = useMutation(
        async (data) => {
            return axios
                .post('/api/v1/workoutexercises/new', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: () => {
                setSuccessMessage('Uspješna objava')
                setErrorMessage(null)
            },
            onError: () => {
                setSuccessMessage(null)
                setErrorMessage('Nešto je pošlo po zlu')
            }
        }
    )

    const workoutInfoMutation = useMutation(
        async (data) => {
            return axios
                .post('/api/v1/workouts/new', data, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    return response.data
                })
        },
        {
            onSuccess: (response) => {
                workoutExercisesMutation.mutate({
                    workoutId: response,
                    workoutExercises
                })
            },
            onError: () => {
                setSuccessMessage(null)
                setErrorMessage('Nešto je pošlo po zlu')
            }
        }
    )

    const saveWorkout = async (event) => {
        event.preventDefault()
        workoutInfoMutation.mutate({
            workoutName,
            workoutDescription: workoutDesc,
            numberOfSets: totalSets,
            appUserId: localStorage.getItem('id'),
            visibilityId,
            levelId
        })
    }
    if (
        exercisesQuery.isLoading ||
        visibilitiesQuery.isLoading ||
        levelsQuery.isLoading
    )
        return <Loading />
    if (exercisesQuery.error || visibilitiesQuery.error || levelsQuery.error)
        return <SomethingWentWrong />

    return (
        <div className={styles.newWorkoutContainer}>
            <form onSubmit={saveWorkout}>
                <h2>Novi trening</h2>
                <div className={styles.visibilityContainer}>
                    {visibilitiesQuery.data.map((visibility) => (
                        <label
                            key={visibility.visibilityName}
                            htmlFor={visibility.visibilityName}
                            className={styles.visibilityLabel}
                        >
                            {visibility.visibilityName}
                            <input
                                id={visibility.visibilityName}
                                value={visibility.visibilityId}
                                type="radio"
                                name="visibility"
                                checked={
                                    visibilityId === visibility.visibilityId
                                }
                                onChange={(event) =>
                                    setVisibilityId(Number(event.target.value))
                                }
                            />
                        </label>
                    ))}
                </div>
                <div className={styles.levelContainer}>
                    {levelsQuery.data.map((level) => (
                        <label
                            key={level.levelName}
                            htmlFor={level.levelName}
                            className={styles.levelLabel}
                        >
                            {level.levelName}
                            <input
                                id={level.levelName}
                                value={level.levelId}
                                type="radio"
                                name="level"
                                checked={levelId === level.levelId}
                                onChange={(event) =>
                                    setLevelId(Number(event.target.value))
                                }
                            />
                        </label>
                    ))}
                </div>
                <div className={styles.workoutName}>
                    <h3>Naziv treninga*</h3>
                    <input
                        name="workoutName"
                        type="text"
                        value={workoutName}
                        maxLength="50"
                        placeholder="Unesi naziv treninga (max. 50 znakova)"
                        onChange={(event) => setWorkoutName(event.target.value)}
                    />
                </div>
                <div className={styles.workoutDesc}>
                    <h3>Opis treninga</h3>
                    <textarea
                        name="workoutDesc"
                        maxLength="500"
                        placeholder="Unesi opis treninga (max. 500 znakova)"
                        value={workoutDesc}
                        onChange={(event) => setWorkoutDesc(event.target.value)}
                    />
                </div>
                <div className={styles.exerciseSelectionContainer}>
                    <h3>Odabir vježbi*</h3>
                    <div className={styles.exerciseSelection}>
                        <div className={styles.exerciseSelectionAndClear}>
                            <select
                                name="exerciseSelection"
                                className={styles.exerciseSelectionField}
                                value={exerciseInput}
                                onChange={(event) =>
                                    setExerciseInput(event.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Odaberi vježbu
                                </option>
                                {exercisesQuery.data.map((exercise) => (
                                    <option
                                        key={exercise.exerciseId}
                                        value={`${exercise.exerciseId} | ${exercise.exerciseName} | ${exercise.category.categoryName}`}
                                        disabled={workoutExercises.some(
                                            (workoutExercise) =>
                                                workoutExercise.name ===
                                                `${exercise.exerciseName} | ${exercise.category.categoryName}`
                                        )}
                                    >
                                        {`${exercise.exerciseName} | ${exercise.category.categoryName}`}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="button"
                                value=" ⨉ "
                                className={styles.clearExerciseInput}
                                onClick={() => setExerciseInput('')}
                            ></input>
                        </div>
                        <input
                            className={styles.addExerciseButton}
                            type="button"
                            value="Dodaj"
                            onClick={addExercise}
                            disabled={exerciseInput === ''}
                        />
                    </div>
                </div>

                <div className={styles.workoutCurrentExercises}>
                    <h3>Odabrane vježbe</h3>
                    {workoutExercises.length === 0 ? (
                        <div className={styles.noExercisesYet}>
                            <IconContext.Provider value={{ size: '70px' }}>
                                <BsEmojiFrown />
                            </IconContext.Provider>

                            <p>Prazno...</p>
                            <p>(Vježbe koje dodaš pojaviti će se ovdje)</p>
                        </div>
                    ) : (
                        workoutExercises.map((exercise, idx) => (
                            <div key={exercise.id}>
                                {idx === 0 ? (
                                    <div className={styles.separator}></div>
                                ) : null}
                                <div className={styles.workoutExercise}>
                                    <div
                                        className={styles.exerciseNameContainer}
                                    >
                                        <p>{exercise.name}</p>
                                        <input
                                            type="button"
                                            value="Ukloni"
                                            onClick={() =>
                                                removeExercise(exercise.id)
                                            }
                                        />
                                    </div>
                                    <div className={styles.repsSetsRest}>
                                        <div
                                            className={
                                                styles.exerciseRepsContainer
                                            }
                                        >
                                            <p>ponavljanja</p>
                                            <div className={styles.repsInputs}>
                                                <input
                                                    className={
                                                        styles.changeValueButton
                                                    }
                                                    type="button"
                                                    value=" - "
                                                    onClick={() =>
                                                        decreaseReps(
                                                            exercise.id
                                                        )
                                                    }
                                                    disabled={
                                                        exercise.reps === 1
                                                    }
                                                />
                                                <input
                                                    className={styles.repsValue}
                                                    type="number"
                                                    name="repsCount"
                                                    value={exercise.reps}
                                                    onChange={(event) =>
                                                        handleRepsChange(
                                                            exercise.id,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                <input
                                                    className={
                                                        styles.changeValueButton
                                                    }
                                                    type="button"
                                                    value=" + "
                                                    onClick={() =>
                                                        increaseReps(
                                                            exercise.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                styles.exerciseSetsContainer
                                            }
                                        >
                                            <p>serije</p>
                                            <div className={styles.setsInputs}>
                                                <input
                                                    className={
                                                        styles.changeValueButton
                                                    }
                                                    type="button"
                                                    value=" - "
                                                    onClick={() =>
                                                        decreaseSets(
                                                            exercise.id
                                                        )
                                                    }
                                                    disabled={
                                                        exercise.sets === 1
                                                    }
                                                />
                                                <input
                                                    className={styles.setsValue}
                                                    type="number"
                                                    name="setsCount"
                                                    value={exercise.sets}
                                                    onChange={(event) =>
                                                        handleSetsChange(
                                                            exercise.id,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                <input
                                                    className={
                                                        styles.changeValueButton
                                                    }
                                                    type="button"
                                                    value=" + "
                                                    onClick={() =>
                                                        increaseSets(
                                                            exercise.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                styles.exerciseRestContainer
                                            }
                                        >
                                            <p>odmor (min:sek)</p>
                                            <div className={styles.restInputs}>
                                                <input
                                                    className={styles.restValue}
                                                    type="number"
                                                    name="minutes"
                                                    min="0"
                                                    max="59"
                                                    value={
                                                        exercise.rest.minutes
                                                    }
                                                    onChange={(event) =>
                                                        handleRestChange(
                                                            exercise.id,
                                                            event.target.name,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                                :
                                                <input
                                                    className={styles.restValue}
                                                    type="number"
                                                    name="seconds"
                                                    min="0"
                                                    max="59"
                                                    value={
                                                        exercise.rest.seconds
                                                    }
                                                    onChange={(event) =>
                                                        handleRestChange(
                                                            exercise.id,
                                                            event.target.name,
                                                            event.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.separator}></div>
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.totalSetsContainer}>
                    <h3>Ukupno serija</h3>
                    <div className={styles.totalSetsInputs}>
                        <input
                            type="button"
                            value=" - "
                            className={styles.changeValueButton}
                            disabled={totalSets === 1}
                            onClick={() =>
                                setTotalSets((prev) =>
                                    prev === 1 ? 1 : prev - 1
                                )
                            }
                        />
                        <input
                            type="number"
                            name="totalSets"
                            value={totalSets}
                            onChange={(event) =>
                                handleTotalSetsChange(event.target.value)
                            }
                            className={styles.totalSetsValue}
                        />
                        <input
                            type="button"
                            value=" + "
                            className={styles.changeValueButton}
                            onClick={() => setTotalSets((prev) => prev + 1)}
                        />
                    </div>
                </div>

                <div className={styles.buttonContainer}>
                    <NavLink to="/home" className={styles.returnButton}>
                        Odustani
                    </NavLink>
                    <button
                        type="submit"
                        disabled={!workoutName || workoutExercises.length === 0}
                    >
                        Završi
                    </button>
                </div>
            </form>
            {successMessage ? (
                <div className={styles.successMessageContainer}>
                    {successMessage}
                </div>
            ) : null}
            {errorMessage ? (
                <div className={styles.errorMessageContainer}>
                    {errorMessage}
                </div>
            ) : null}
        </div>
    )
}

export default NewWorkout
