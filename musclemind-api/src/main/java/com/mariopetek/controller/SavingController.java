package com.mariopetek.controller;

import com.mariopetek.service.SavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/saving")
@RequiredArgsConstructor
public class SavingController {
    private final SavingService savingService;

    @GetMapping("/count/{workoutId}") //broj lajkova od workoutId
    public ResponseEntity<Long> getNumberOfWorkoutSaves(@PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(savingService.getNumberOfWorkoutSaves(workoutId));
    }
    @GetMapping("/issaved/{appUserId}/{workoutId}") //je li korisnik appUserId lajkao trening workoutId
    public ResponseEntity<Boolean> isWorkoutSavedByAppUser(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(savingService.isWorkoutSavedByAppUser(appUserId, workoutId));
    }
    @PostMapping("/save/{appUserId}/{workoutId}") //korisnik appUserId lajka trening workoutId
    public ResponseEntity<String> appUserSavesWorkout(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(savingService.appUserSavesWorkout(appUserId, workoutId));
    }
    @DeleteMapping("/unsave/{appUserId}/{workoutId}") //korisnik appUserId poništava lajk za trening workoutId
    public ResponseEntity<String> appUserUnsavesWorkout(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(savingService.appUserUnsavesWorkout(appUserId, workoutId));
    }
}