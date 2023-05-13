package com.mariopetek.repository;

import com.mariopetek.model.Visibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VisibilityRepository extends JpaRepository<Visibility, Long> {
    Optional<Visibility> findByVisibilityId(Long visibilityId);
}
