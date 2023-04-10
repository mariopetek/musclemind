package com.mariopetek.service;

import com.mariopetek.model.AppUser;
import com.mariopetek.dto.NewAppUserDTO;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    List<AppUser> getAllAppUsers();
    Long addNewAppUser(NewAppUserDTO newAppUser);
    Optional<AppUser> getAppUserByUsername(String username);
    Optional<AppUser> getAppUserByAppUserId(Long appUserId);
}
