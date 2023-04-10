package com.mariopetek.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Korisnik")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
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
    @Nullable
    private String bio;
    @Column(name = "uloga")
    private String role;
}
