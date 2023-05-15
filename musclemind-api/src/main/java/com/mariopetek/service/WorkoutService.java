package com.mariopetek.service;

import com.mariopetek.dto.NewWorkoutDto;

public interface WorkoutService {
    Long saveNewWorkout(NewWorkoutDto newWorkout);
}
