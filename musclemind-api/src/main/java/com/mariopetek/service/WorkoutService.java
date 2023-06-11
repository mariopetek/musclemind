package com.mariopetek.service;

import com.mariopetek.dto.NewWorkoutDTO;
import com.mariopetek.model.Workout;

import java.util.List;

public interface WorkoutService {
    Long saveNewWorkout(NewWorkoutDTO newWorkout);
    List<Workout> getAllWorkoutsFromUser(Long appUserId);
    String deleteWorkout(Long workoutId);
    List<Workout> getAllWorkoutsFromFollowedUser(Long appUserId);
    List<Workout> getAllPublicWorkoutsFromUser(Long appUserId);
    List<Workout> getPopularWorkouts();
}
