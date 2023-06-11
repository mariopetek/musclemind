package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Liking;
import com.mariopetek.model.LikingId;
import com.mariopetek.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikingRepository extends JpaRepository<Liking, LikingId> {
    Long countByLikingIdWorkout(Workout workout);
    Long countByLikingIdAppUserAndLikingIdWorkout(AppUser appUser, Workout workout);
    List<Liking> findByLikingIdWorkout(Workout workout);
}
