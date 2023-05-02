package com.mariopetek.initialization;

import com.mariopetek.model.Level;
import com.mariopetek.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class LevelInitialization {
    private final LevelRepository levelRepository;
    @Bean
    InitializingBean initializeLevel() {
        return () -> {
            levelRepository.save(new Level("Lagano"));
            levelRepository.save(new Level("Srednje"));
            levelRepository.save(new Level("Teško"));
            levelRepository.save(new Level("Vrlo teško"));
        };
    }
}
