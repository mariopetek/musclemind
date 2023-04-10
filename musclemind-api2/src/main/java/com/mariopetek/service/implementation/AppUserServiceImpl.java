package com.mariopetek.service.implementation;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Role;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.service.AppUserService;
import com.mariopetek.service.RequestDeniedException;
import com.mariopetek.dto.NewAppUserDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class AppUserServiceImpl implements AppUserService {
    private final AppUserRepository appUserRepository;

    public AppUserServiceImpl(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public List<AppUser> getAllAppUsers() {
        return appUserRepository.findAll();
    }
    public void validateNewAppUser(NewAppUserDTO newAppUser) {
        //treba dodat i format usernamea i passworda i to provjeriti
        final String EMAIL_REGEX = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Assert.notNull(newAppUser, "newUser must be given.");
        Assert.hasText(newAppUser.getName(), "newUser name must be given.");
        Assert.hasText(newAppUser.getUsername(), "newUser username must be given.");
        Assert.hasText(newAppUser.getEmail(), "enwUser email must be given.");
        Assert.isTrue(newAppUser.getEmail().matches(EMAIL_REGEX), "newUser email does not match correct format.");
        Assert.hasText(newAppUser.getPassword(), "newUser password must be given.");
        if(appUserRepository.countByUsername(newAppUser.getUsername()) > 0) {
            throw new RequestDeniedException(
                    "User with username " + newAppUser.getUsername() + " already exists."
            );
        }
        if(appUserRepository.countByEmail(newAppUser.getEmail()) > 0) {
            throw new RequestDeniedException(
                    "User with email " + newAppUser.getEmail() + " already exists."
            );
        }
    }
    @Override
    public Long addNewAppUser(NewAppUserDTO newAppUser) {
        validateNewAppUser(newAppUser);
        AppUser appUser = new AppUser();
        appUser.setName(newAppUser.getName());
        appUser.setUsername(newAppUser.getUsername());
        appUser.setEmail(newAppUser.getEmail());
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        appUser.setPassword(passwordEncoder.encode(newAppUser.getPassword()));
        appUser.setBio(null);
        appUser.setRole(Role.USER.toString());
        return appUserRepository.save(appUser).getAppUserId();
    }
    @Override
    public Optional<AppUser> getAppUserByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }
    public Optional<AppUser> getAppUserByAppUserId(Long appUserId) {
        return appUserRepository.findByAppUserId(appUserId);
    }
}
