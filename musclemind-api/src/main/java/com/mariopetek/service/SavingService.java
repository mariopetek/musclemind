package com.mariopetek.service;

public interface SavingService {
    Long getNumberOfWorkoutSaves(Long workoutId);
    Boolean isWorkoutSavedByAppUser(Long appUserId, Long workoutId);
    String appUserSavesWorkout(Long appUserId, Long workoutId);
    String appUserUnsavesWorkout(Long appUserId, Long workoutId);
}
