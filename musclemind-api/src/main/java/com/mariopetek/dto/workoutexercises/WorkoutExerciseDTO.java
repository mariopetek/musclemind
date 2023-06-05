package com.mariopetek.dto.workoutexercises;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseDTO {
    @NotNull(message = "Exercise id must not be null")
    @Positive(message = "Exercise id must be positive")
    private Long id;
    @NotEmpty(message = "Exercise name must not be empty")
    @Size(max = 255, message = "Exercise name does not have correct length")
    private String name;
    @NotNull(message = "Exercise sets must not be null")
    @Min(value = 1, message = "Exercise sets must be >= 1")
    @Max(value = 100, message = "Exercise sets must be <= 100")
    private Integer sets;
    @NotNull(message = "Exercise reps must not be null")
    @Min(value = 1, message = "Exercise reps must be >= 1")
    @Max(value = 100, message = "Exercise reps must be <= 100")
    private Integer reps;
    @NotNull(message = "Exercise rest must not be null")
    private WorkoutExerciseRestDTO rest;
}
