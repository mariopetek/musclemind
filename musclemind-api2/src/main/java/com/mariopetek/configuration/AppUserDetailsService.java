package com.mariopetek.configuration;

import com.mariopetek.model.AppUser;
import com.mariopetek.service.AppUserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class AppUserDetailsService implements UserDetailsService {
    private final AppUserService appUserService;

    public AppUserDetailsService(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserService.getAppUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found."));
        return new AppUserDetails(appUser);
    }
}
