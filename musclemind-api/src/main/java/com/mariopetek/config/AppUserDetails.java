package com.mariopetek.config;

import com.mariopetek.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.List;
import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

public class AppUserDetails implements UserDetails {
    private final String username;
    private final String password;
    private final List<GrantedAuthority> authorities;

    public AppUserDetails(User user) {
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.authorities = commaSeparatedStringToAuthorityList(user.getRole().name());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    @Override
    public String getPassword() {
        return password;
    }
    @Override
    public String getUsername() {
        return username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
