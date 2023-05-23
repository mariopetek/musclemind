package com.mariopetek.dto.workoutexercises;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseDTO {
    private Long id;
    private String name;
    private Integer sets;
    private Integer reps;
    private WorkoutExerciseRestDTO rest;
}
