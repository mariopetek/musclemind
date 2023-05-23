package com.mariopetek.dto.workoutexercises;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewWorkoutExercisesDto {
    private Long workoutId;
    private List<WorkoutExerciseDto> workoutExercises;
}
