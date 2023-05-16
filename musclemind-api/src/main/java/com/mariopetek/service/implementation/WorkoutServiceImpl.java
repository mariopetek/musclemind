package com.mariopetek.service.implementation;

import com.mariopetek.dto.NewWorkoutDto;
import com.mariopetek.model.Workout;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.LevelRepository;
import com.mariopetek.repository.VisibilityRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final AppUserRepository appUserRepository;
    private final VisibilityRepository visibilityRepository;
    private final LevelRepository levelRepository;

    public Long saveNewWorkout(NewWorkoutDto newWorkout) {
        Workout workout = new Workout();
        workout.setWorkoutName(newWorkout.getWorkoutName());
        workout.setWorkoutDescription(newWorkout.getWorkoutDescription());
        workout.setTimeAdded(Timestamp.valueOf(LocalDateTime.now()));
        workout.setNumberOfSets(newWorkout.getNumberOfSets());
        workout.setAppUser(appUserRepository.findByAppUserId(newWorkout.getAppUserId()).orElseThrow());
        workout.setVisibility(visibilityRepository.findByVisibilityId(newWorkout.getVisibilityId()).orElseThrow());
        workout.setLevel(levelRepository.findByLevelId(newWorkout.getLevelId()).orElseThrow());
        return workoutRepository.save(workout).getWorkoutId();
    }

    public List<Workout> getAllWorkoutsFromUser(Long appUserId) {
        return workoutRepository.findByAppUser(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
}
