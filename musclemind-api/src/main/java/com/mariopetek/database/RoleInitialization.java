package com.mariopetek.database;

import com.mariopetek.model.Role;
import com.mariopetek.repository.RoleRepository;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//ako se ispostavi da ovo nije dobro rjesenje, mozda bi bilo bolje prebaciti sve u MusclemindApiApplication
@Configuration
public class RoleInitialization {
    private final RoleRepository roleRepository;

    public RoleInitialization(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Bean
    InitializingBean sendDatabase() {
        return () -> {
            roleRepository.save(new Role("ROLE_ADMIN"));
            roleRepository.save(new Role("ROLE_USER"));
        };
    }
}
