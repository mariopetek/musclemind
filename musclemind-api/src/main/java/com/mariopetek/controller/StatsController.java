package com.mariopetek.controller;

import com.mariopetek.model.Exercise;
import com.mariopetek.model.Level;
import com.mariopetek.service.ExerciseService;
import com.mariopetek.service.ExercisingService;
import com.mariopetek.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/stats")
@RequiredArgsConstructor
public class StatsController {
    private final ExercisingService exercisingService;
    private final LevelService levelService;
    private final ExerciseService exerciseService;

    @GetMapping("/{appUserId}/exercised")
    public ResponseEntity<Integer> getExercisedWorkoutsCount(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(exercisingService.getExercisedWorkoutsCount(appUserId));
    }
    @GetMapping("/{appUserId}/level")
    public ResponseEntity<Optional<Level>> getMostCommonLevel(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(levelService.getMostCommonLevel(appUserId));
    }
    @GetMapping("/{appUserId}/duration")
    public ResponseEntity<Long> getAverageExercisingDuration(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(exercisingService.getAverageExercisingDuration(appUserId));
    }
    @GetMapping("/{appUserId}/exercises")
    public ResponseEntity<List<Exercise>> getTop3ExercisesFromExercising(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(exerciseService.getTop3ExercisesFromExercising(appUserId));
    }
}
