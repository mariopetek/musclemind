package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "korisnik")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements UserDetails {
    @Id
    @Column(name = "id_korisnik")
    @SequenceGenerator(
            name="korisnik_gen",
            sequenceName = "korisnik_seq",
            allocationSize = 1)
    @GeneratedValue(generator = "korisnik_gen")
    private Long appUserId;
    @Column(name = "ime")
    private String name;
    @Column(name = "korisnicko_ime")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "lozinka")
    private String password;
    @Column(name = "opis")
    private String bio;
    @ManyToOne
    @JoinColumn(name = "id_uloga")
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getRoleName()));
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
