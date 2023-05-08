import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import styles from '../styles/NewWorkout.module.css'

const NewWorkout = () => {
    const [isWorkoutPrivate, setIsWorkoutPrivate] = useState(true)
    const [workoutName, setWorkoutName] = useState('')
    const [workoutDesc, setWorkoutDesc] = useState('')
    const [allExercises, setAllExercises] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [workoutExercises, setWorkoutExercises] = useState([])
    useEffect(() => {
        ;(async () => {
            try {
                const response = await fetch('/api/v1/exercises', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()
                    setAllExercises(data)
                } else {
                    throw Error('Greška pri dohvaćanju')
                }
            } catch (err) {
                console.log(err.message)
            }
        })()
        ;(async () => {
            try {
                const response = await fetch('/api/v1/categories', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()
                    setAllCategories(data)
                } else {
                    throw Error('Greška pri dohvaćanju')
                }
            } catch (err) {
                console.log(err.message)
            }
        })()
    }, [])
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
                    <label htmlFor="Privatno">
                        Privatno
                        <input
                            id="Privatno"
                            type="radio"
                            name="vidljivost"
                            value="Privatno"
                            checked={isWorkoutPrivate}
                            onChange={() =>
                                setIsWorkoutPrivate(!isWorkoutPrivate)
                            }
                        />
                    </label>
                    <label htmlFor="Javno">
                        Javno
                        <input
                            id="Javno"
                            type="radio"
                            name="vidljivost"
                            value="Javno"
                            checked={!isWorkoutPrivate}
                            onChange={() =>
                                setIsWorkoutPrivate(!isWorkoutPrivate)
                            }
                        />
                    </label>
                    <h3>Naziv treninga:</h3>
                    <input
                        type="text"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                    <h3>Opis treninga:</h3>
                    <textarea
                        cols="30"
                        rows="10"
                        value={workoutDesc}
                        onChange={(e) => setWorkoutDesc(e.target.value)}
                    />
                </form>
            </div>
        </>
    )
}

export default NewWorkout
