package com.mariopetek.service.implementation;

import com.mariopetek.dto.workoutexercises.NewWorkoutExercisesDto;
import com.mariopetek.model.WorkoutExercise;
import com.mariopetek.model.WorkoutExercisesId;
import com.mariopetek.repository.ExerciseRepository;
import com.mariopetek.repository.WorkoutExerciseRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.WorkoutExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;

    public String saveNewWorkoutExercises(NewWorkoutExercisesDto newWorkoutExercises) {
        newWorkoutExercises.getWorkoutExercises().forEach((exercise) -> {
            WorkoutExercise workoutExercise = new WorkoutExercise();
            workoutExercise.setWorkoutExercisesId(new WorkoutExercisesId(
                    workoutRepository.findByWorkoutId(newWorkoutExercises.getWorkoutId()).orElseThrow(),
                    exerciseRepository.findByExerciseId(exercise.getId()).orElseThrow()
            ));
            workoutExercise.setNumberOfSets(exercise.getSets());
            workoutExercise.setNumberOfReps(exercise.getReps());
            workoutExercise.setRest(exercise.getRest().getMinutes().toString() + ":" + exercise.getRest().getSeconds().toString());
            workoutExerciseRepository.save(workoutExercise);

        });
        return "Vježbe su uspješno pohranjene";
    }
}
