package com.mariopetek.service.implementation;

import com.mariopetek.dto.NewWorkoutDTO;
import com.mariopetek.model.AppUser;
import com.mariopetek.model.Following;
import com.mariopetek.model.Workout;
import com.mariopetek.repository.*;
import com.mariopetek.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {
    private final WorkoutRepository workoutRepository;
    private final AppUserRepository appUserRepository;
    private final VisibilityRepository visibilityRepository;
    private final LevelRepository levelRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final SavingRepository savingRepository;
    private final LikingRepository likingRepository;
    private final FollowingRepository followingRepository;

    public Long saveNewWorkout(NewWorkoutDTO newWorkout) {
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
        return workoutRepository.findByAppUserOrderByTimeAddedDesc(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
    public List<Workout> getAllPublicWorkoutsFromUser(Long appUserId) {
        return workoutRepository.findPublicWorkoutsByAppUser(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }

    public String deleteWorkout(Long workoutId) {
        savingRepository.deleteAll(savingRepository.findBySavingIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow()));
        likingRepository.deleteAll(likingRepository.findByLikingIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow()));
        workoutExerciseRepository.deleteAll(workoutExerciseRepository.findByWorkoutExerciseIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow()));
        workoutRepository.delete(workoutRepository.findByWorkoutId(workoutId).orElseThrow());
        return "Trening uspješno izbrisan";
    }

    public List<Workout> getAllWorkoutsFromFollowedUser(Long appUserId) {
        List<Following> followingObjectList = followingRepository.findByFollowingId_AppUser1(appUserRepository.findByAppUserId(appUserId).orElseThrow());
        List<AppUser> followedUsers = followingObjectList.stream().map((following ->
             following.getFollowingId().getAppUser2())).toList();
        return workoutRepository.findPublicWorkoutsByFollowedUsers(followedUsers);
    }
}
