import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IconContext } from 'react-icons'
import { BsEmojiFrown } from 'react-icons/bs'
import axios from 'axios'

import styles from '../styles/NewWorkout.module.css'

const NewWorkout = () => {
    const [visibilityId, setVisibilityId] = useState(1)
    const [levelId, setLevelId] = useState(1)
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
                          reps:
                              Number.isNaN(Number(value)) ||
                              value === '' ||
                              Number(value) === 0
                                  ? 1
                                  : Number(value)
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
                          sets:
                              Number.isNaN(Number(value)) ||
                              value === '' ||
                              Number(value) === 0
                                  ? 1
                                  : Number(value)
                      }
                    : exercise
            })
        )
    }

    const handleRestChange = (exerciseId, unitId, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === exerciseId
                    ? {
                          ...exercise,
                          rest: {
                              [unitId]:
                                  Number(value) > 59 || Number(value) < 0
                                      ? 0
                                      : Number(value),
                              [unitId === 'minutes' ? 'seconds' : 'minutes']:
                                  unitId === 'minutes'
                                      ? exercise.rest.seconds
                                      : exercise.rest.minutes
                          }
                      }
                    : exercise
            })
        )
    }

    const removeExercise = (id) => {
        setWorkoutExercises(
            workoutExercises.filter((exercise) => exercise.id !== id)
        )
    }

    const saveWorkout = async () => {
        //empty
    }
    console.log(levelId)

    if (
        exercisesQuery.isLoading ||
        visibilitiesQuery.isLoading ||
        levelsQuery.isLoading
    )
        return <h1>Učitavanje...</h1>
    if (exercisesQuery.error || visibilitiesQuery.error || levelsQuery.error)
        return <h1>Nešto je pošlo po zlu</h1>

    return (
        <div className={styles.newWorkoutContainer}>
            <form onSubmit={saveWorkout}>
                <h2>Novi trening</h2>
                <div className={styles.visibilityContainer}>
                    {visibilitiesQuery.data.map((visibility) => (
                        <label
                            key={visibility.visibilityName}
                            htmlFor={visibility.visibilityName}
                            className={`${styles.visibilityInput} ${styles.visibilityOption}`}
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
                                className={styles.visibilityInput}
                            />
                        </label>
                    ))}
                </div>
                <div className={styles.levelContainer}>
                    {levelsQuery.data.map((level) => (
                        <label key={level.levelName} htmlFor={level.levelName}>
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
                        cols="70"
                        rows="7"
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
                                    <option key={exercise.exerciseId}>
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
                            id="addExercise"
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
                            <IconContext.Provider value={{ size: '80px' }}>
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
                                                    type="text"
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
                                                    type="text"
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
                                            <p>odmor (min : sek)</p>
                                            <div className={styles.restInputs}>
                                                <input
                                                    className={styles.restValue}
                                                    type="number"
                                                    id="minutes"
                                                    min="0"
                                                    max="59"
                                                    value={
                                                        exercise.rest.minutes
                                                    }
                                                    onChange={(e) =>
                                                        handleRestChange(
                                                            exercise.id,
                                                            e.target.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                :
                                                <input
                                                    className={styles.restValue}
                                                    type="number"
                                                    id="seconds"
                                                    min="0"
                                                    max="59"
                                                    value={
                                                        exercise.rest.seconds
                                                    }
                                                    onChange={(e) =>
                                                        handleRestChange(
                                                            exercise.id,
                                                            e.target.id,
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
