package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    Optional<Workout> findByWorkoutId(Long workoutId);
    List<Workout> findByAppUserOrderByTimeAddedDesc(AppUser appUser);
    @Query(value = "SELECT w FROM Workout w WHERE w.visibility.visibilityId = 2 AND w.appUser = :appUser ORDER BY w.timeAdded DESC")
    List<Workout> findPublicWorkoutsByAppUser(@Param("appUser")AppUser appUser);
    @Query(value = "SELECT w FROM Workout w WHERE w.visibility.visibilityId = 2 AND w.appUser IN :followedUsers ORDER BY w.timeAdded DESC LIMIT 20")
    List<Workout> findPublicWorkoutsByFollowedUsers(@Param("followedUsers") List<AppUser> followedUsers);
    @Query(value = "SELECT w FROM Workout w JOIN Liking l ON w.workoutId = l.likingId.workout.workoutId GROUP BY w.workoutId ORDER BY COUNT(*) DESC")
    List<Workout> findPopularWorkouts();
}
