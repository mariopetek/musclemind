package com.mariopetek.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewWorkoutDTO {
    @NotEmpty(message = "Workout name must not be empty")
    @Size(max = 50, message = "Workout name does not have correct length")
    private String workoutName;
    @NotNull(message = "Workout description must not be null")
    @Size(max = 500, message = "Workout description does not have correct length")
    private String workoutDescription;
    @NotNull(message = "Number of sets must not be null")
    @Min(value = 1, message = "Number of sets must be >= 1")
    @Max(value = 100, message = "Number of sets must be <= 100")
    private Integer numberOfSets;
    @NotNull(message = "AppUser id must not be null")
    @Positive(message = "AppUser id must be positive")
    private Long appUserId;
    @NotNull(message = "Visibility id must not be null")
    @Positive(message = "Visibility id must be positive")
    private Long visibilityId;
    @NotNull(message = "Level id must not be null")
    @Positive(message = "Level id must be positive")
    private Long levelId;
}
