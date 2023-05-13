package com.mariopetek.service.implementation;

import com.mariopetek.dto.WorkoutDto;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImplementation implements WorkoutService {
    private final WorkoutRepository workoutRepository;

    public void saveNewWorkout(WorkoutDto newWorkout) {

    }
}
