package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Optional<Level> findByLevelId(Long levelId);
    @Query(value = "SELECT l FROM Level l WHERE l IN (SELECT l1 FROM Exercising e JOIN Workout w ON e.exercisingId.workout = w JOIN Level l1 ON w.level = l1 WHERE e.exercisingId.appUser = :appUser AND e.timeFinished IS NOT NULL GROUP BY l1 ORDER BY COUNT(*) DESC LIMIT 1)")
    Optional<Level> findMostCommonLevel(@Param("appUser") AppUser appUser);
}
