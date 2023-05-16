package com.mariopetek.repository;

import com.mariopetek.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> findByWorkoutId(Long workoutId);
}