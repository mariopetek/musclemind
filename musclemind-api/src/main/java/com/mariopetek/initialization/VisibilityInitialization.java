package com.mariopetek.initialization;

import com.mariopetek.model.Visibility;
import com.mariopetek.repository.VisibilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class VisibilityInitialization {
    private final VisibilityRepository visibilityRepository;

    @Bean
    InitializingBean initializeVisibility() {
        return () -> {
            visibilityRepository.save(new Visibility("Javno"));
            visibilityRepository.save(new Visibility("Privatno"));
        };
    }
}
