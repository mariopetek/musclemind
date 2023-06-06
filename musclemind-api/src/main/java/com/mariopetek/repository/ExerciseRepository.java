package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Optional<Exercise> findByExerciseId(Long exerciseId);
    @Query(value = "SELECT e FROM Exercise e JOIN WorkoutExercise we ON e = we.workoutExerciseId.exercise JOIN Exercising ex ON ex.exercisingId.workout = we.workoutExerciseId.workout WHERE ex.exercisingId.appUser = :appUser GROUP BY e ORDER BY COUNT(*) DESC LIMIT 3")
    List<Exercise> findTop3ExercisesFromExercising(@Param("appUser") AppUser appUser);
}
