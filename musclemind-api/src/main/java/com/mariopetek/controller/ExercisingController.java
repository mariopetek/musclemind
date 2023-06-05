package com.mariopetek.controller;

import com.mariopetek.model.Exercising;
import com.mariopetek.service.ExercisingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/exercising")
@RequiredArgsConstructor
public class ExercisingController {
    private final ExercisingService exercisingService;

    @PostMapping("/start/{appUserId}/{workoutId}") //korisnik appUserId započinje trening workoutId
    public ResponseEntity<Exercising> startWorkout(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(exercisingService.startWorkout(appUserId, workoutId));
    }
    @PutMapping("/finish/{appUserId}/{workoutId}") //korisnik appUserId završava trening workoutId
    public ResponseEntity<Exercising> finishWorkout(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(exercisingService.finishWorkout(appUserId, workoutId));
    }
    @GetMapping("/info/{appUserId}/{workoutId}") //dohvaćanje informacija vezane za korisnika appUserId i zadnje započinjanje treninga workoutId
    public ResponseEntity<Optional<Exercising>> getStartedWorkoutInfo(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(exercisingService.getExercisingInfo(appUserId, workoutId));
    }
}
