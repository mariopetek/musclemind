package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Saved;
import com.mariopetek.model.SavedId;
import com.mariopetek.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingRepository extends JpaRepository<Saved, SavedId> {
    Long countBySavedIdWorkout(Workout workout);
    Long countBySavedIdAppUserAndSavedIdWorkout(AppUser appUser, Workout workout);
    List<Saved> findBySavedIdAppUserOrderBySavedIdDesc(AppUser appUser);
}
