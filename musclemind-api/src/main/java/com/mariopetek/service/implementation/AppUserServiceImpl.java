package com.mariopetek.service.implementation;

import com.mariopetek.dto.AppUserUpdateDTO;
import com.mariopetek.model.AppUser;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.RoleRepository;
import com.mariopetek.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private final AppUserRepository appUserRepository;

    @Override
    public List<AppUser> getAllAppUsers() {
        return appUserRepository.findAll();
    }
    @Override
    public Optional<AppUser> getAppUserByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }
    public Optional<AppUser> getAppUserByAppUserId(Long appUserId) {
        return appUserRepository.findByAppUserId(appUserId);
    }

    public List<AppUser> getAppUsersByUsernameContainingIgnoreCase(String username) {
        return appUserRepository.findTop10ByUsernameContainingIgnoreCase(username);
    }
    public String updateAppUserInfo(Long appUserId, AppUserUpdateDTO appUserUpdateInfo) {
        AppUser appUser = appUserRepository.findByAppUserId(appUserId).orElseThrow();
        if(!appUserUpdateInfo.getName().equals(appUser.getName())) {
            appUser.setName(appUserUpdateInfo.getName());
        }
        if(!appUserUpdateInfo.getBio().equals(appUser.getBio())) {
            if(appUserUpdateInfo.getBio().equals("")) {
                appUser.setBio(null);
            }else {
                appUser.setBio(appUserUpdateInfo.getBio());
            }
        }
        appUserRepository.save(appUser);
        return "Podaci uspješno promijenjeni";
    }
}
