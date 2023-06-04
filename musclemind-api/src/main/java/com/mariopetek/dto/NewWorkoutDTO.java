package com.mariopetek.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotEmpty;
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
public class NewWorkoutDTO {
    @NotNull(message = "Workout name must not be null.")
    @NotEmpty(message = "Workout name must not be empty.")
    @Size(max = 50, message = "Workout name does not have correct length.")
    private String workoutName;
    @Size(max = 500, message = "Workout description does not have correct length.")
    private String workoutDescription;
    @NotNull(message = "Number of sets must not be null.")
    private Integer numberOfSets;
    @NotNull(message = "AppUser id must not be null.")
    private Long appUserId;
    @NotNull(message = "Visibility id must not be null.")
    private Long visibilityId;
    @NotNull(message = "Level id must not be null.")
    private Long levelId;
}
