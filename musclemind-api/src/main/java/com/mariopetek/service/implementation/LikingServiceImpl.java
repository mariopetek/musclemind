package com.mariopetek.service.implementation;

import com.mariopetek.model.Liking;
import com.mariopetek.model.LikingId;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.LikingRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.LikingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LikingServiceImpl implements LikingService {
    private final LikingRepository likingRepository;
    private final WorkoutRepository workoutRepository;
    private final AppUserRepository appUserRepository;

    public Long getNumberOfWorkoutLikes(Long workoutId) {
        return likingRepository.countByLikingIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow());
    }
    public Boolean isWorkoutLikedByAppUser(Long appUserId, Long workoutId) {
        return likingRepository.countByLikingIdAppUserAndLikingIdWorkout(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()) > 0;
    }
    public String appUserLikesWorkout(Long appUserId, Long workoutId) {
        Liking liking = new Liking();
        liking.setLikingId(new LikingId(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        ));
        liking.setTimeLiked(Timestamp.valueOf(LocalDateTime.now()));
        likingRepository.save(liking);
        return "Trening lajkan";
    }
    public String appUserUnlikesWorkout(Long appUserId, Long workoutId) {
        Liking liking = new Liking();
        liking.setLikingId(new LikingId(
                appUserRepository.findByAppUserId(appUserId).orElseThrow(),
                workoutRepository.findByWorkoutId(workoutId).orElseThrow()
        ));
        likingRepository.delete(liking);
        return "Trening odlajkan";
    }
}
