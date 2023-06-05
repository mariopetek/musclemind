package com.mariopetek.service.implementation;

import com.mariopetek.model.Exercising;
import com.mariopetek.model.ExercisingId;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.ExercisingRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.ExercisingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExercisingServiceImpl implements ExercisingService {
    private final ExercisingRepository exercisingRepository;
    private final AppUserRepository appUserRepository;
    private final WorkoutRepository workoutRepository;

    public Exercising startWorkout(Long appUserId, Long workoutId) {
        return exercisingRepository.save(new Exercising(
                new ExercisingId(
                        Timestamp.valueOf(LocalDateTime.now()),
                        appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                        workoutRepository.findByWorkoutId(workoutId).orElseThrow()),
                null));
    }
    public Exercising finishWorkout(Long appUserId, Long workoutId) {
        Exercising exercising = exercisingRepository.findStartedWorkoutByAppUser(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow());
        exercising.setTimeFinished(Timestamp.valueOf(LocalDateTime.now()));
        return exercisingRepository.save(exercising);
    }
    public Optional<Exercising> getExercisingInfo(Long appUserId, Long workoutId) {
        return exercisingRepository.findExercisingInfo(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        );
    }
}
