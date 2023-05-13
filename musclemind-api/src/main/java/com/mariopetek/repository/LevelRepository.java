package com.mariopetek.repository;

import com.mariopetek.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Optional<Level> findByLevelId(Long levelId);
}
