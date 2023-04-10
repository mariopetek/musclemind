package com.mariopetek.config;

import com.mariopetek.model.User;
import com.mariopetek.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.springframework.security.core.authority.AuthorityUtils.NO_AUTHORITIES;
@Service
public class AppUserDetailsService implements UserDetailsService {
    private final UserService userService;
    public AppUserDetailsService(UserService userService) {
        this.userService = userService;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username).orElseThrow(() -> new UsernameNotFoundException("No user found."));

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), NO_AUTHORITIES);
    }
}
