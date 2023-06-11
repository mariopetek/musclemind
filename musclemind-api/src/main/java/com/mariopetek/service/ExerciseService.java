package com.mariopetek.service;

import com.mariopetek.model.Exercise;

import java.util.List;

public interface ExerciseService {
    List<Exercise> getAllExercises();
    List<Exercise> getTop3ExercisesFromExercising(Long appUserId);
}
