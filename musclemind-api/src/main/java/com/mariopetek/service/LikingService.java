package com.mariopetek.service;

public interface LikingService {
    Long getNumberOfWorkoutLikes(Long workoutId);
    Boolean isWorkoutLikedByAppUser(Long appUserId, Long workoutId);
    String appUserLikesWorkout(Long appUserId, Long workoutId);
    String appUserUnlikesWorkout(Long appUserId, Long workoutId);
}
