package com.mariopetek.repository;

import com.mariopetek.model.WorkoutExercise;
import com.mariopetek.model.WorkoutExercisesId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, WorkoutExercisesId> {
}
