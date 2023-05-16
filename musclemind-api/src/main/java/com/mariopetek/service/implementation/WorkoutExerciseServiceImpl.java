package com.mariopetek.service.implementation;

import com.mariopetek.dto.workoutexercises.NewWorkoutExercisesDto;
import com.mariopetek.model.WorkoutExercise;
import com.mariopetek.model.WorkoutExerciseId;
import com.mariopetek.repository.ExerciseRepository;
import com.mariopetek.repository.WorkoutExerciseRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.WorkoutExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;

    public String saveNewWorkoutExercises(NewWorkoutExercisesDto newWorkoutExercises) {
        newWorkoutExercises.getWorkoutExercises().forEach((exercise) -> {
            WorkoutExercise workoutExercise = new WorkoutExercise();
            workoutExercise.setWorkoutExerciseId(new WorkoutExerciseId(
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

    public List<WorkoutExercise> getAllWorkoutExercisesFromWorkout(Long workoutId){
        return workoutExerciseRepository.findByWorkoutExerciseIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow());
    }

}
