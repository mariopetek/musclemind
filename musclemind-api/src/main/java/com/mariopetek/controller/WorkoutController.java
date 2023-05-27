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
    public ResponseEntity<List<Workout>> getAllWorkoutsFromUser(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(workoutService.getAllWorkoutsFromUser(appUserId));
    }
    @GetMapping("/public/user/{appUserId}")
    public ResponseEntity<List<Workout>> getAllPublicWorkoutsFromUser(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(workoutService.getAllPublicWorkoutsFromUser(appUserId));
    }
    @DeleteMapping("/delete/{workoutId}")
    public ResponseEntity<String> deleteWorkout(@PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(workoutService.deleteWorkout(workoutId));
    }
    @GetMapping("/following/{appUserId}") //appUserId1 prati korisnik appUserId2 (trebaju nam treninzi od appUserId2)
    public ResponseEntity<List<Workout>> getAllWorkoutsFromFollowedUsers(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(workoutService.getAllWorkoutsFromFollowedUser(appUserId));
    }
}
