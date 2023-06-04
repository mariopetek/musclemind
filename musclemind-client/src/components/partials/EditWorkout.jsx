import Workout from './Workout'

import styles from '../../styles/EditWorkout.module.css'

const EditWorkout = ({ workout, deleteWorkoutMutation }) => {
    return (
        <Workout workout={workout}>
            <button
                className={styles.deleteWorkoutButton}
                type="button"
                onClick={() => deleteWorkoutMutation.mutate(workout)}
                title="Obriši"
            >
                Obriši
            </button>
        </Workout>
    )
}

export default EditWorkout
