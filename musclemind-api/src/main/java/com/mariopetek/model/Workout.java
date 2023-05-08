package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "trening")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Workout {
    @Id
    @Column(name = "id_trening", nullable = false, columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workoutId;
    @Column(name = "naziv_trening", nullable = false)
    private String workoutName;
    @Column(name = "vrijeme_objava", nullable = false)
    private Timestamp timeAdded;
    @Column(name = "uk_broj_serija", nullable = false)
    private Integer numberOfSets;
    @Column(name = "opis_trening")
    private String workoutDescription;
    @ManyToOne
    @JoinColumn(name = "id_korisnik")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(name = "id_vidljivost")
    private Visibility visibility;
    @ManyToOne
    @JoinColumn(name = "id_tezina")
    private Level level;
}
