package com.mariopetek.service;

import com.mariopetek.dto.NewUserDTO;
import com.mariopetek.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    void addNewUser(NewUserDTO newUser);
    Optional<User> getUserByUsername(String username);
}
