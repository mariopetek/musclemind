package com.mariopetek.service.implementation;

import com.mariopetek.model.Saved;
import com.mariopetek.model.SavedId;
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
        return savingRepository.countBySavedIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow());
    }
    public Boolean isWorkoutSavedByAppUser(Long appUserId, Long workoutId) {
        return savingRepository.countBySavedIdAppUserAndSavedIdWorkout(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()) > 0;
    }
    public List<Saved> getWorkoutsSavedByAppUser(Long appUserId) {
        return savingRepository.findBySavedIdAppUserOrderByTimeSavedDesc(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
    public String appUserSavesWorkout(Long appUserId, Long workoutId) {
        Saved saved = new Saved();
        saved.setSavedId(new SavedId(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        ));
        saved.setTimeSaved(Timestamp.valueOf(LocalDateTime.now()));
        savingRepository.save(saved);
        return "Trening spremljen";
    }
    public String appUserUnsavesWorkout(Long appUserId, Long workoutId) {
        Saved saved = new Saved();
        saved.setSavedId(new SavedId(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        ));
        savingRepository.delete(saved);
        return "Trening odspremljen";
    }
}
