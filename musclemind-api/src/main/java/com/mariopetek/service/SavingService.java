package com.mariopetek.service;

import com.mariopetek.model.Saved;

import java.util.List;

public interface SavingService {
    Long getNumberOfWorkoutSaves(Long workoutId);
    Boolean isWorkoutSavedByAppUser(Long appUserId, Long workoutId);
    String appUserSavesWorkout(Long appUserId, Long workoutId);
    String appUserUnsavesWorkout(Long appUserId, Long workoutId);
    List<Saved> getWorkoutsSavedByAppUser(Long appUserId);
}
