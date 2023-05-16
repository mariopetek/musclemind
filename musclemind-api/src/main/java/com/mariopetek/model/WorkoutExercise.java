package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "trening_vjezbe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExercise {
    @EmbeddedId
    private WorkoutExerciseId workoutExerciseId;
    @Column(name = "broj_serija", nullable = false)
    private Integer numberOfSets;
    @Column(name = "broj_ponavljanja", nullable = false)
    private Integer numberOfReps;
    @Column(name = "odmor", nullable = false)
    private String rest;
}
