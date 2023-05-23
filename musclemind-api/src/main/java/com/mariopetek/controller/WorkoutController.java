package com.mariopetek.controller;

import com.mariopetek.dto.NewWorkoutDTO;
import com.mariopetek.model.Workout;
import com.mariopetek.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workouts")
@RequiredArgsConstructor
public class WorkoutController {
    private final WorkoutService workoutService;

    @PostMapping("/new")
    public ResponseEntity<Long> saveNewWorkout(@RequestBody NewWorkoutDTO newWorkout) {
        return ResponseEntity.ok(workoutService.saveNewWorkout(newWorkout));
    }
    @GetMapping("/user/{appUserId}")
    public ResponseEntity<List<Workout>> getAllWorkoutsFromUser(@PathVariable("appUserId") Long appUserId){
        return ResponseEntity.ok(workoutService.getAllWorkoutsFromUser(appUserId));
    }
}
