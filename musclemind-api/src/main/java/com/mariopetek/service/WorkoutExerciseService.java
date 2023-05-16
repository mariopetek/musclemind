package com.mariopetek.service;

import com.mariopetek.dto.workoutexercises.NewWorkoutExercisesDto;
import com.mariopetek.model.WorkoutExercise;

import java.util.List;

public interface WorkoutExerciseService {
    String saveNewWorkoutExercises(NewWorkoutExercisesDto newWorkoutExercises);
    List<WorkoutExercise> getAllWorkoutExercisesFromWorkout(Long workoutId);
}
