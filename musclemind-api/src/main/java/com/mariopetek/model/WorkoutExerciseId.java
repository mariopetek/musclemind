package com.mariopetek.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WorkoutExerciseId that = (WorkoutExerciseId) o;
        return Objects.equals(workout, that.workout) && Objects.equals(exercise, that.exercise);
    }
    @Override
    public int hashCode() {
        return Objects.hash(workout, exercise);
    }
}
