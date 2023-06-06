package com.mariopetek.service;

import com.mariopetek.dto.AppUserUpdateDTO;
import com.mariopetek.model.AppUser;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    AppUser getAppUserByUsername(String username);
    AppUser getAppUserByAppUserId(Long appUserId);
    List<AppUser> getAppUsersByUsernameContainingIgnoreCase(String username);
    String updateAppUserInfo(Long appUserId, AppUserUpdateDTO appUserUpdateInfo);
}
