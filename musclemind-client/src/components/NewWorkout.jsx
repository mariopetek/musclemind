import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { SlLock, SlGlobe } from 'react-icons/sl'

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
                    value: 1,
                    unit: 'min'
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

    const handleRestChange = (id, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? {
                          ...exercise,
                          rest: {
                              value:
                                  Number.isNaN(Number(value)) || value === ''
                                      ? 1
                                      : Number(value),
                              unit: exercise.rest.unit
                          }
                      }
                    : exercise
            })
        )
    }
    const handleUnitsChange = (id, value) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                return exercise.id === id
                    ? {
                          ...exercise,
                          rest: {
                              value: exercise.rest.value,
                              unit: value
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

    return (
        <>
            <Helmet>
                <title>Musclemind | Novi trening</title>
            </Helmet>
            <div className={styles.newWorkoutContainer}>
                <form onSubmit={saveWorkout}>
                    <h2>Novi trening</h2>
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
                        <h3>Naziv treninga</h3>
                        <input
                            id="workoutName"
                            type="text"
                            value={workoutName}
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
                            placeholder="Maksimalno 500 znakova"
                            value={workoutDesc}
                            onChange={(e) => setWorkoutDesc(e.target.value)}
                        />
                    </div>
                    <div className={styles.exerciseSelection}>
                        <h3>Odabir vježbi:</h3>
                        <div className={styles.exerciseInput}>
                            <input
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
                                id="addExercise"
                                type="button"
                                value="Dodaj"
                                onClick={addExercise}
                                disabled={exerciseInput === ''}
                            />
                        </div>
                    </div>

                    {workoutExercises.map((exercise) => (
                        <div key={exercise.id}>
                            <div className={styles.separator}></div>
                            <p>{exercise.name}</p>
                            <p>Ponavljanja:</p>
                            <input
                                type="button"
                                value="-"
                                onClick={() => decreaseReps(exercise.id)}
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
                                type="button"
                                value="+"
                                onClick={() => increaseReps(exercise.id)}
                            />
                            <p>Serije:</p>
                            <input
                                type="button"
                                value="-"
                                onClick={() => decreaseSets(exercise.id)}
                                disabled={exercise.sets === 1}
                            />
                            <input
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
                                type="button"
                                value="+"
                                onClick={() => increaseSets(exercise.id)}
                            />
                            <p>Odmor:</p>
                            <input
                                type="text"
                                value={exercise.rest.value}
                                onChange={(e) =>
                                    handleRestChange(
                                        exercise.id,
                                        e.target.value
                                    )
                                }
                            />
                            <select
                                value={exercise.rest.unit}
                                onChange={(e) =>
                                    handleUnitsChange(
                                        exercise.id,
                                        e.target.value
                                    )
                                }
                            >
                                <option value="min">min</option>
                                <option value="sek">sek</option>
                            </select>
                            <input
                                type="button"
                                value="Ukloni"
                                onClick={() => removeExercise(exercise.id)}
                            />
                            <div className={styles.separator}></div>
                        </div>
                    ))}
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
