package com.mariopetek.repository;

import com.mariopetek.model.Workout;
import com.mariopetek.model.WorkoutExercise;
import com.mariopetek.model.WorkoutExerciseId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, WorkoutExerciseId> {
    List<WorkoutExercise> findByWorkoutExerciseIdWorkout(Workout workout);
}
