package com.mariopetek.service;

import com.mariopetek.model.Exercising;

import java.time.Duration;
import java.util.Optional;

public interface ExercisingService {
    Exercising startWorkout(Long appUserId, Long workoutId);
    Exercising finishWorkout(Long appUserId, Long workoutId);
    Optional<Exercising> getExercisingInfo(Long appUserId, Long workoutId);
    Integer getExercisedWorkoutsCount(Long appUserId);
    Long getAverageExercisingDuration(Long appUserId);

}
