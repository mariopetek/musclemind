import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { IconContext } from 'react-icons'
import { SlLock, SlGlobe } from 'react-icons/sl'
import { BsEmojiFrown } from 'react-icons/bs'

import styles from '../styles/NewWorkout.module.css'

const NewWorkout = () => {
    const [allExercises, setAllExercises] = useState([])
    const [allCategories, setAllCategories] = useState({})

    const [isWorkoutPrivate, setIsWorkoutPrivate] = useState(true)
    const [workoutName, setWorkoutName] = useState('')
    const [workoutDesc, setWorkoutDesc] = useState('')
    const [exerciseInput, setExerciseInput] = useState('')
    const [workoutExercises, setWorkoutExercises] = useState([])

    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchExercises = async () => {
            await fetch('/api/v1/exercises', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then((response) => {
                    return response.status === 200
                        ? response.json()
                        : Promise.reject(new Error('Greška pri dohvaćanju'))
                })
                .then((data) => {
                    data.map((el) =>
                        setAllExercises((prev) => {
                            return [...prev, el]
                        })
                    )
                })
                .catch((err) => {
                    setError(err)
                })
        }
        const fetchCategories = async () => {
            await fetch('/api/v1/categories', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
                .then((response) => {
                    return response.status === 200
                        ? response.json()
                        : Promise.reject(new Error('Greška pri dohvaćanju'))
                })
                .then((data) => {
                    data.map((el) =>
                        setAllCategories((prev) => {
                            return { ...prev, [el.categoryId]: el.categoryName }
                        })
                    )
                })
                .catch((err) => {
                    setError(err)
                })
        }
        fetchExercises()
        fetchCategories()
    }, [])

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

    const clearExerciseInput = () => {
        se
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
                              Number.isNaN(Number(value)) || value === ''
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
                              Number.isNaN(Number(value)) || value === ''
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
    console.log(workoutExercises)
    return (
        <>
            <Helmet>
                <title>Musclemind | Novi trening</title>
            </Helmet>
            <div className={styles.newWorkoutContainer}>
                <form onSubmit={saveWorkout}>
                    <div className={styles.newWorkoutHeader}>
                        <h2>Novi trening</h2>
                        <div className={styles.headerSeparator}></div>
                    </div>
                    <div className={styles.visibilityContainer}>
                        <label
                            htmlFor="private"
                            className={`${styles.visibilityInput} ${styles.visibilityOption}`}
                        >
                            <SlLock />
                            Privatno
                            <input
                                id="private"
                                type="radio"
                                name="visibility"
                                checked={isWorkoutPrivate}
                                onChange={() =>
                                    setIsWorkoutPrivate(!isWorkoutPrivate)
                                }
                                className={styles.visibilityInput}
                            />
                        </label>
                        <label
                            htmlFor="public"
                            className={`${styles.visibilityInput} ${styles.visibilityOption}`}
                        >
                            <SlGlobe />
                            Javno
                            <input
                                id="public"
                                type="radio"
                                name="visibility"
                                checked={!isWorkoutPrivate}
                                onChange={() =>
                                    setIsWorkoutPrivate(!isWorkoutPrivate)
                                }
                                className={styles.visibilityInput}
                            />
                        </label>
                    </div>
                    <div className={styles.workoutName}>
                        <h3>Naziv treninga:</h3>
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
                        <h3>Opis treninga:</h3>
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
                    <div className={styles.exerciseSelection}>
                        <h3>Odabir vježbi:</h3>
                        <div className={styles.exerciseInputContainer}>
                            <div className={styles.exerciseInput}>
                                <input
                                    className={styles.exerciseInputField}
                                    id="exercises"
                                    list="exercisesList"
                                    placeholder="Unesite naziv vježbe"
                                    value={exerciseInput}
                                    onChange={(e) =>
                                        setExerciseInput(e.target.value)
                                    }
                                />
                                <datalist id="exercisesList">
                                    {allExercises.map((exercise) => (
                                        <option key={exercise.exerciseId}>
                                            {exercise.exerciseName} |{' '}
                                            {
                                                allCategories[
                                                    exercise.category.categoryId
                                                ]
                                            }
                                        </option>
                                    ))}
                                </datalist>
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
                        <h3>Odabrane vježbe:</h3>
                        {workoutExercises.length === 0 ? (
                            <div className={styles.noExercisesYet}>
                                <IconContext.Provider value={{ size: '80px' }}>
                                    <BsEmojiFrown />
                                </IconContext.Provider>

                                <p>Prazno...</p>
                                <p>(Vježbe koje dodate pojaviti će se ovdje)</p>
                            </div>
                        ) : (
                            workoutExercises.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    className={styles.workoutExercise}
                                >
                                    <div className={styles.separator}></div>
                                    <p>{exercise.name}</p>
                                    <p>Ponavljanja:</p>
                                    <input
                                        className={styles.changeValueButton}
                                        type="button"
                                        value="-"
                                        onClick={() =>
                                            decreaseReps(exercise.id)
                                        }
                                        disabled={exercise.reps === 1}
                                    />
                                    <input
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
                                        className={styles.changeValueButton}
                                        type="button"
                                        value="+"
                                        onClick={() =>
                                            increaseReps(exercise.id)
                                        }
                                    />
                                    <p>Serije:</p>
                                    <input
                                        className={styles.changeValueButton}
                                        type="button"
                                        value="-"
                                        onClick={() =>
                                            decreaseSets(exercise.id)
                                        }
                                        disabled={exercise.sets === 1}
                                    />
                                    <input
                                        className={styles.changeValueButton}
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
                                        className={styles.changeValueButton}
                                        type="button"
                                        value="+"
                                        onClick={() =>
                                            increaseSets(exercise.id)
                                        }
                                    />
                                    <p>Odmor:</p>
                                    <fieldset>
                                        <legend>MM:SS</legend>
                                        <input
                                            type="number"
                                            id="minutes"
                                            min="0"
                                            max="59"
                                            value={exercise.rest.minutes}
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
                                            type="number"
                                            id="seconds"
                                            min="0"
                                            max="59"
                                            value={exercise.rest.seconds}
                                            onChange={(e) =>
                                                handleRestChange(
                                                    exercise.id,
                                                    e.target.id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </fieldset>
                                    <input
                                        type="button"
                                        value="Ukloni"
                                        onClick={() =>
                                            removeExercise(exercise.id)
                                        }
                                    />
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
                            disabled={
                                !workoutName || workoutExercises.length === 0
                            }
                        >
                            Završi
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewWorkout
