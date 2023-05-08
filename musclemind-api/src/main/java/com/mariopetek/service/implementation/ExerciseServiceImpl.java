package com.mariopetek.service.implementation;

import com.mariopetek.model.Exercise;
import com.mariopetek.repository.ExerciseRepository;
import com.mariopetek.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {
    private final ExerciseRepository exerciseRepository;

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }
}
