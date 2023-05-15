package com.mariopetek.service.implementation;

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
}
