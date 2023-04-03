package com.mariopetek.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Korisnik")
public class User {
    @Id
    @Column(name = "id_korisnik")
    @SequenceGenerator(
            name = "id_korisnik_sequence",
            sequenceName = "id_korisnik_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "id_korisnik_sequence"
    )
    private Long userId;
    @Column(name="ime")
    private String name;
    @Column(name="korisnicko_ime")
    private String username;
    @Column(name="email")
    private String email;
    @Column(name="lozinka")
    private String password;
    @Column(name="opis")
    private String bio;
    private Role role;

    public User() {}
    public User(Long userId,
                String name,
                String username,
                String email,
                String password,
                String bio,
                Role role) {
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getBio() {
        return bio;
    }
    public void setBio(String bio) {
        this.bio = bio;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
}
