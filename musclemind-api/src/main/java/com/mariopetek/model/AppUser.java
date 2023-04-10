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
@AllArgsConstructor
@NoArgsConstructor
public class AppUser implements UserDetails {
    @Id
    @Column(name = "id_korisnik", nullable = false)
    @SequenceGenerator(
        name = "id_korisnik_sequence",
        sequenceName = "id_korisnik_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "id_korisnik_sequence"
    )
    private Long appUserId;
    @Column(name = "ime", nullable = false)
    private String name;
    @Column(name = "korisnicko_ime", nullable = false, unique = true)
    private String username;
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "lozinka", nullable = false)
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
