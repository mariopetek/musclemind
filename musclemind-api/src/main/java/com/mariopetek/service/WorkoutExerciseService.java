package com.mariopetek.service;

import com.mariopetek.dto.workoutexercises.NewWorkoutExercisesDTO;
import com.mariopetek.model.WorkoutExercise;

import java.util.List;

public interface WorkoutExerciseService {
    String saveNewWorkoutExercises(NewWorkoutExercisesDTO newWorkoutExercises);
    List<WorkoutExercise> getAllWorkoutExercisesFromWorkout(Long workoutId);
}
