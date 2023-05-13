package com.mariopetek.controller;

import com.mariopetek.dto.NewWorkoutDto;
import com.mariopetek.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService workoutService;

    @PostMapping("/new")
    public ResponseEntity<String> saveNewWorkout(@RequestBody NewWorkoutDto newWorkout) {
        return ResponseEntity.ok(workoutService.saveNewWorkout(newWorkout));
    }
}
