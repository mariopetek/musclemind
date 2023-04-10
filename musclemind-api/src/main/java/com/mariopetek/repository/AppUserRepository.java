package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByAppUserId(Long appUserId);
    Integer countByUsername(String username);
    Integer countByEmail(String email);
}
