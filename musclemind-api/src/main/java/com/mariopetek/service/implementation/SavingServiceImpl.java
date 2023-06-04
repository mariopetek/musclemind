package com.mariopetek.service.implementation;

import com.mariopetek.model.Saving;
import com.mariopetek.model.SavingId;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.SavingRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.SavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SavingServiceImpl implements SavingService {
    private final SavingRepository savingRepository;
    private final WorkoutRepository workoutRepository;
    private final AppUserRepository appUserRepository;

    public Long getNumberOfWorkoutSaves(Long workoutId) {
        return savingRepository.countBySavingIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow());
    }
    public Boolean isWorkoutSavedByAppUser(Long appUserId, Long workoutId) {
        return savingRepository.countBySavingIdAppUserAndSavingIdWorkout(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()) > 0;
    }
    public List<Saving> getWorkoutsSavedByAppUser(Long appUserId) {
        return savingRepository.findBySavingIdAppUserOrderByTimeSavedDesc(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
    public String appUserSavesWorkout(Long appUserId, Long workoutId) {
        Saving saving = new Saving();
        saving.setSavingId(new SavingId(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        ));
        saving.setTimeSaved(Timestamp.valueOf(LocalDateTime.now()));
        savingRepository.save(saving);
        return "Trening spremljen";
    }
    public String appUserUnsavesWorkout(Long appUserId, Long workoutId) {
        Saving saving = new Saving();
        saving.setSavingId(new SavingId(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        ));
        savingRepository.delete(saving);
        return "Trening odspremljen";
    }
}
