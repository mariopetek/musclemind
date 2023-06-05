package com.mariopetek.dto.workoutexercises;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutExerciseRestDTO {
    @NotNull(message = "Exercise rest minutes must not be null")
    @Min(value = 0, message = "Exercise rest minutes must be >= 0")
    @Max(value = 59, message = "Exercise rest minutes must be <= 59")
    private Integer minutes;
    @NotNull(message = "Exercise rest seconds must not be null")
    @Min(value = 0, message = "Exercise rest seconds must be >= 0")
    @Max(value = 59, message = "Exercise rest seconds must be <= 59")
    private Integer seconds;
}
