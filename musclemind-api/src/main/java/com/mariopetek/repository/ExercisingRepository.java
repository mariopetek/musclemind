package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Exercising;
import com.mariopetek.model.ExercisingId;
import com.mariopetek.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ExercisingRepository extends JpaRepository<Exercising, ExercisingId> {
    @Query(value = "SELECT e FROM Exercising e WHERE e.exercisingId.appUser = :appUser AND e.exercisingId.workout = :workout AND e.timeFinished = NULL")
    Exercising findStartedWorkoutByAppUser(@Param("appUser") AppUser appUser, @Param("workout") Workout workout);
    @Query(value = "SELECT e FROM Exercising e WHERE e.exercisingId.appUser = :appUser AND e.exercisingId.workout = :workout ORDER BY e.exercisingId.timeStarted DESC LIMIT 1")
    Optional<Exercising> findExercisingInfo(@Param("appUser") AppUser appUser, @Param("workout") Workout workout);
    @Query(value = "SELECT e FROM Exercising e WHERE e.exercisingId.appUser = :appUser AND e.timeFinished IS NOT NULL")
    List<Exercising> findExercisedWorkout(@Param("appUser") AppUser appUser);
}
