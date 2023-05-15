package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByAppUserId(Long appUserId);
    Integer countByUsername(String username);
    Integer countByEmail(String email);
    List<AppUser> findTop10ByUsernameContainingIgnoreCase(String username);
}
