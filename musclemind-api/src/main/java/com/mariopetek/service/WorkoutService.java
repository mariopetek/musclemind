package com.mariopetek.service;

import com.mariopetek.dto.NewWorkoutDto;
import com.mariopetek.model.Workout;

import java.util.List;

public interface WorkoutService {
    Long saveNewWorkout(NewWorkoutDto newWorkout);
    List<Workout> getAllWorkoutsFromUser(Long appUserId);
}
