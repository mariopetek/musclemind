package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trening_vjezba")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExercise {
    @EmbeddedId
    private WorkoutExerciseId workoutExerciseId;
    @Column(name = "broj_serija")
    private Integer numberOfSets;
    @Column(name = "broj_ponavljanja")
    private Integer numberOfReps;
    @Column(name = "odmor")
    private String rest;
}
