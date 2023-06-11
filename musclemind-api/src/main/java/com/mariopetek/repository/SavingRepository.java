package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Saving;
import com.mariopetek.model.SavingId;
import com.mariopetek.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingRepository extends JpaRepository<Saving, SavingId> {
    Long countBySavingIdWorkout(Workout workout);
    Long countBySavingIdAppUserAndSavingIdWorkout(AppUser appUser, Workout workout);
    List<Saving> findBySavingIdAppUserOrderByTimeSavedDesc(AppUser appUser);
    List<Saving> findBySavingIdWorkout(Workout workout);
}
