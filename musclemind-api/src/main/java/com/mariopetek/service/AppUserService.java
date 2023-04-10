package com.mariopetek.service;

import com.mariopetek.model.AppUser;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    List<AppUser> getAllAppUsers();
    Optional<AppUser> getAppUserByUsername(String username);
    Optional<AppUser> getAppUserByAppUserId(Long appUserId);
}
