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

    const exercisesQuery = useQuery('allExercises', async () => {
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
    const visibilitiesQuery = useQuery('allVisibilities', async () => {
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
    const levelsQuery = useQuery('allLevels', async () => {
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
                id: prevExercises.length + 1,
                name: exerciseInput,
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
    const removeExercise = (id) => {
        setWorkoutExercises(
            workoutExercises.filter((exercise) => exercise.id !== id)
        )
    }

    const decreaseReps = (id) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? {
                          ...exercise,
                          reps: exercise.reps > 1 ? exercise.reps - 1 : 1
                      }
                    : exercise
            })
        )
    }
    const increaseReps = (id) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? { ...exercise, reps: exercise.reps + 1 }
                    : exercise
            })
        )
    }
    const handleRepsChange = (id, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? {
                          ...exercise,
                          reps: Number(value) < 1 ? 1 : Number(value)
                      }
                    : exercise
            })
        )
    }

    const decreaseSets = (id) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? {
                          ...exercise,
                          sets: exercise.sets > 1 ? exercise.sets - 1 : 1
                      }
                    : exercise
            })
        )
    }
    const increaseSets = (id) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? {
                          ...exercise,
                          sets: exercise.sets + 1
                      }
                    : exercise
            })
        )
    }
    const handleSetsChange = (id, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
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

    const workoutInfoMutation = useMutation(async (workoutInfo) => {
        return axios
            .post('/api/v1/workouts/new', workoutInfo, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data)
            })
    })
    const workoutExercisesMutation = useMutation(async (workoutExercises) => {})

    const saveWorkout = async (event) => {
        event.preventDefault()
        const workoutInfo = {
            workoutName,
            workoutDescription: workoutDesc,
            numberOfSets: totalSets,
            appUserId: localStorage.getItem('id'),
            visibilityId,
            levelId
        }
        const workoutExercisesFinal = exercisesQuery.data.filter((exercise) => {
            return workoutExercises.some((addedExercise) => {
                return addedExercise.name === exercise.exerciseName
            })
        })
        console.log(workoutExercisesFinal)
        workoutInfoMutation.mutate(workoutInfo)
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
                                onChange={(e) =>
                                    setVisibilityId(Number(e.target.value))
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
                                onChange={(e) =>
                                    setLevelId(Number(e.target.value))
                                }
                            />
                        </label>
                    ))}
                </div>
                <div className={styles.workoutName}>
                    <h3>Naziv treninga*</h3>
                    <input
                        id="workoutName"
                        type="text"
                        value={workoutName}
                        maxLength="50"
                        placeholder="Unesite naziv treninga (max. 50 znakova)"
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                </div>
                <div className={styles.workoutDesc}>
                    <h3>Opis treninga</h3>
                    <textarea
                        id="workoutDesc"
                        maxLength="500"
                        placeholder="Unesite opis treninga (max. 500 znakova)"
                        value={workoutDesc}
                        onChange={(e) => setWorkoutDesc(e.target.value)}
                    />
                </div>
                <div className={styles.exerciseSelectionContainer}>
                    <h3>Odabir vježbi*</h3>
                    <div className={styles.exerciseSelection}>
                        <div className={styles.exerciseSelectionAndClear}>
                            <select
                                id="exerciseSelection"
                                className={styles.exerciseSelectionField}
                                value={exerciseInput}
                                onChange={(e) =>
                                    setExerciseInput(e.target.value)
                                }
                            >
                                <option value="" disabled>
                                    Odaberite vježbu
                                </option>
                                {exercisesQuery.data.map((exercise) => (
                                    <option
                                        key={exercise.exerciseId}
                                        value={exercise.exerciseName}
                                        onClick={(e) => {
                                            setExerciseInput(e.target.value)
                                        }}
                                        disabled={workoutExercises.some(
                                            (el) =>
                                                el.name ===
                                                exercise.exerciseName
                                        )}
                                    >
                                        {exercise.exerciseName} |{' '}
                                        {exercise.category.categoryName}
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
                            <p>(Vježbe koje dodate pojaviti će se ovdje)</p>
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
                                                    onChange={(e) =>
                                                        handleRepsChange(
                                                            exercise.id,
                                                            e.target.value
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
                                                    onChange={(e) =>
                                                        handleSetsChange(
                                                            exercise.id,
                                                            e.target.value
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
                                                    onChange={(e) =>
                                                        handleRestChange(
                                                            exercise.id,
                                                            e.target.name,
                                                            e.target.value
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
                                                    onChange={(e) =>
                                                        handleRestChange(
                                                            exercise.id,
                                                            e.target.name,
                                                            e.target.value
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
                            onChange={(e) =>
                                handleTotalSetsChange(e.target.value)
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
        </div>
    )
}

export default NewWorkout
