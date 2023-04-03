package com.mariopetek.service.implementation;

import com.mariopetek.dto.NewUserDTO;
import com.mariopetek.model.Role;
import com.mariopetek.model.User;
import com.mariopetek.repository.UserRepository;
import com.mariopetek.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public void addNewUser(NewUserDTO newUser) {
        User user = new User();
        user.setName(newUser.getName());
        user.setUsername(newUser.getUsername());
        user.setEmail(newUser.getEmail());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setBio(null);
        user.setRole(Role.USER);
        userRepository.save(user);
    }
    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
