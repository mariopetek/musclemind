package com.mariopetek.dto.workoutexercises;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewWorkoutExercisesDTO {
    @NotNull(message = "Workout id must not be null")
    @Positive(message = "Workout id must be positive")
    private Long workoutId;
    @NotEmpty(message = "Workout exercises list must not be empty")
    private List<WorkoutExerciseDTO> workoutExercises;
}
