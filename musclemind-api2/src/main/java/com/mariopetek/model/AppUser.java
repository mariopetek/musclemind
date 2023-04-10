package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "korisnik")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {
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
}
