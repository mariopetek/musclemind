import { useQuery } from 'react-query'
import axios from 'axios'
import { IconContext } from 'react-icons'
import { AiFillHome } from 'react-icons/ai'

import Workout from './partials/Workout'

import styles from '../styles/Home.module.css'

const Home = () => {
    const {
        data: followedUsersWorkouts,
        isLoading: followedUsersWorkoutsLoading,
        isError: followedUsersWorkoutsError
    } = useQuery(
        ['workouts', 'following', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/workouts/following/${localStorage.getItem('id')}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data
        }
    )

    if (followedUsersWorkoutsLoading) return <p>Učitavanje</p>
    if (followedUsersWorkoutsError) return <p>Došlo je do pogreške</p>

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.headerText}>
                <IconContext.Provider value={{ size: '30px' }}>
                    <AiFillHome />
                </IconContext.Provider>
                <h2>Početna</h2>
            </div>

            <div className={styles.workoutsContainer}>
                {followedUsersWorkouts.length > 0 ? (
                    <>
                        <p className={styles.workoutsContainerLabel}>Pratim:</p>
                        {followedUsersWorkouts.map((workout) => (
                            <Workout
                                key={workout.workoutId}
                                workout={workout}
                            />
                        ))}
                    </>
                ) : (
                    <p className={styles.noWorkoutsText}>
                        Trenutno nema treninga za prikaz. Treninzi korisnika
                        koje pratiš pojaviti će se ovdje.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Home
