package com.mariopetek.repository;

import com.mariopetek.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

//@Repository anotaciju možemo pisati, ali ne moramo (kada extendamo JpaRepository onda se automatski zna da se radi o repository anotaciji)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
