package com.mariopetek.service.implementation;

import com.mariopetek.dto.validator.DTOValidator;
import com.mariopetek.dto.workoutexercises.NewWorkoutExercisesDTO;
import com.mariopetek.dto.workoutexercises.WorkoutExerciseDTO;
import com.mariopetek.dto.workoutexercises.WorkoutExerciseRestDTO;
import com.mariopetek.model.WorkoutExercise;
import com.mariopetek.model.WorkoutExerciseId;
import com.mariopetek.repository.ExerciseRepository;
import com.mariopetek.repository.WorkoutExerciseRepository;
import com.mariopetek.repository.WorkoutRepository;
import com.mariopetek.service.WorkoutExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutExerciseServiceImpl implements WorkoutExerciseService {
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final DTOValidator<NewWorkoutExercisesDTO> newWorkoutExercisesDTOValidator;
    private final DTOValidator<WorkoutExerciseDTO> workoutExerciseDTOValidator;
    private final DTOValidator<WorkoutExerciseRestDTO> workoutExerciseRestDTOValidator;

    public String saveNewWorkoutExercises(NewWorkoutExercisesDTO newWorkoutExercises) {
        newWorkoutExercisesDTOValidator.validate(newWorkoutExercises);
        List<WorkoutExercise> workoutExercises = new ArrayList<>();
        newWorkoutExercises.getWorkoutExercises().forEach((exercise) -> {
            workoutExerciseDTOValidator.validate(exercise);
            WorkoutExercise workoutExercise = new WorkoutExercise();
            workoutExercise.setWorkoutExerciseId(new WorkoutExerciseId(
                    workoutRepository.findByWorkoutId(newWorkoutExercises.getWorkoutId()).orElseThrow(),
                    exerciseRepository.findByExerciseId(exercise.getId()).orElseThrow()
            ));
            workoutExercise.setNumberOfSets(exercise.getSets());
            workoutExercise.setNumberOfReps(exercise.getReps());
            workoutExerciseRestDTOValidator.validate(exercise.getRest());
            workoutExercise.setRest(exercise.getRest().getMinutes() + ":" + exercise.getRest().getSeconds());
            workoutExercises.add(workoutExercise);

        });
        workoutExerciseRepository.saveAll(workoutExercises);
        return "Vježbe su uspješno pohranjene";
    }
    public List<WorkoutExercise> getAllWorkoutExercisesFromWorkout(Long workoutId){
        return workoutExerciseRepository.findByWorkoutExerciseIdWorkout(workoutRepository.findByWorkoutId(workoutId).orElseThrow());
    }

}
