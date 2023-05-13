package com.mariopetek.service;

import com.mariopetek.dto.NewWorkoutDto;

public interface WorkoutService {
    String saveNewWorkout(NewWorkoutDto newWorkout);
}
