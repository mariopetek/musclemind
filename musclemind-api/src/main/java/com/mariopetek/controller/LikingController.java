package com.mariopetek.controller;

import com.mariopetek.service.LikingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/liking")
@RequiredArgsConstructor
public class LikingController {
    private final LikingService likingService;

    @GetMapping("/count/{workoutId}") //broj lajkova od workoutId
    public ResponseEntity<Long> getNumberOfWorkoutLikes(@PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(likingService.getNumberOfWorkoutLikes(workoutId));
    }
    @GetMapping("/isliked/{appUserId}/{workoutId}") //je li korisnik appUserId lajkao trening workoutId
    public ResponseEntity<Boolean> isWorkoutLikedByAppUser(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(likingService.isWorkoutLikedByAppUser(appUserId, workoutId));
    }
    @PostMapping("/like/{appUserId}/{workoutId}") //korisnik appUserId lajka trening workoutId
    public ResponseEntity<String> appUserLikesWorkout(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(likingService.appUserLikesWorkout(appUserId, workoutId));
    }
    @DeleteMapping("/unlike/{appUserId}/{workoutId}") //korisnik appUserId poništava lajk za trening workoutId
    public ResponseEntity<String> appUserUnlikesWorkout(@PathVariable("appUserId") Long appUserId, @PathVariable("workoutId") Long workoutId) {
        return ResponseEntity.ok(likingService.appUserUnlikesWorkout(appUserId, workoutId));
    }

}
