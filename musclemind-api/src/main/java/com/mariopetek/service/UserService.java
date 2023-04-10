package com.mariopetek.service;

import com.mariopetek.dto.NewUserDTO;
import com.mariopetek.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Long addNewUser(NewUserDTO newUser);
    Optional<User> getUserByUsername(String username);
    Optional<User> getUserByUserId(Long userId);
}
