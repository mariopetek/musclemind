package com.mariopetek.initialization;

import com.mariopetek.model.Role;
import com.mariopetek.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//ako se ispostavi da ovo nije dobro rjesenje, mozda bi bilo bolje prebaciti sve u MusclemindApiApplication
@Configuration
@RequiredArgsConstructor
public class RoleInitialization {
    private final RoleRepository roleRepository;
    @Bean
    InitializingBean initializeRole() {
        return () -> {
            roleRepository.save(new Role("ROLE_ADMIN"));
            roleRepository.save(new Role("ROLE_USER"));
        };
    }
}
