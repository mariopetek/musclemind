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

    //SELECT * FROM trening WHERE id_korisnik IN (SELECT pratim_id_korisnik FROM pracenje WHERE id_korisnik = 1);
    @Query(value = "SELECT w FROM Workout w WHERE w.appUser IN :followedUsers ORDER BY w.timeAdded DESC")
    List<Workout> findByFollowedUsers(@Param("followedUsers") List<AppUser> followedUsers);
}
