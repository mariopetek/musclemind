package com.mariopetek.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "id_trening")
    private Workout workout;
    @ManyToOne
    @JoinColumn(name = "id_vjezba")
    private Exercise exercise;
}
