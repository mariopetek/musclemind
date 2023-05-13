package com.mariopetek.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutDto {
    private String workoutName;
    private String workoutDescription;
    private Integer numberOfSets;
    private Long appUserId;
    private Long visibilityId;
    private Long levelId;
}
