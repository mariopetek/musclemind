package com.mariopetek.service.implementation;

import com.mariopetek.dto.AppUserUpdateDTO;
import com.mariopetek.dto.validator.DTOValidator;
import com.mariopetek.model.AppUser;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {
    private final AppUserRepository appUserRepository;
    private final DTOValidator<AppUserUpdateDTO> appUserUpdateDTOValidator;

    public AppUser getAppUserByUsername(String username) {
        return appUserRepository.findByUsername(username).orElseThrow();
    }
    public AppUser getAppUserByAppUserId(Long appUserId) {
        return appUserRepository.findByAppUserId(appUserId).orElseThrow();
    }

    public List<AppUser> getAppUsersByUsernameContainingIgnoreCase(String pattern) {
        return appUserRepository.findTop10ByUsernameContainingIgnoreCaseOrNameContainingIgnoreCaseOrSurnameContainingIgnoreCase(pattern.trim(), pattern.trim(), pattern.trim());
    }
    public String updateAppUserInfo(Long appUserId, AppUserUpdateDTO appUserUpdateInfo) {
        appUserUpdateDTOValidator.validate(appUserUpdateInfo);
        AppUser appUser = appUserRepository.findByAppUserId(appUserId).orElseThrow();
        if(appUserUpdateInfo.getName() != null) {
            if(!appUserUpdateInfo.getName().equals(appUser.getName())) {
                appUser.setName(appUserUpdateInfo.getName());
            }
        }
        if(appUserUpdateInfo.getSurname() != null) {
            if(!appUserUpdateInfo.getSurname().equals(appUser.getSurname())) {
                appUser.setSurname(appUserUpdateInfo.getSurname());
            }
        }
        if(appUserUpdateInfo.getBio() != null) {
            if(!appUserUpdateInfo.getBio().equals(appUser.getBio())) {
                appUser.setBio(appUserUpdateInfo.getBio().equals("") ? null : appUserUpdateInfo.getBio());
            }
        }
        appUserRepository.save(appUser);
        return "Podaci uspješno promijenjeni";
    }
}
