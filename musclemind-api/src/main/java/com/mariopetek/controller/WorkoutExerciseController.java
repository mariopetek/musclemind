package com.mariopetek.controller;

import com.mariopetek.dto.workoutexercises.NewWorkoutExercisesDto;
import com.mariopetek.model.WorkoutExercise;
import com.mariopetek.service.WorkoutExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workoutexercises")
@RequiredArgsConstructor
public class WorkoutExerciseController {
    private final WorkoutExerciseService workoutExerciseService;

    @PostMapping("/new")
    public ResponseEntity<String> saveNewWorkoutExercises(@RequestBody NewWorkoutExercisesDto newWorkoutExercises) {
        return ResponseEntity.ok(workoutExerciseService.saveNewWorkoutExercises(newWorkoutExercises));
    }
    @GetMapping("/workout/{workoutId}")
    public ResponseEntity<List<WorkoutExercise>> getAllWorkoutExercisesFromWorkout(@PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(workoutExerciseService.getAllWorkoutExercisesFromWorkout(workoutId));
    }
}
