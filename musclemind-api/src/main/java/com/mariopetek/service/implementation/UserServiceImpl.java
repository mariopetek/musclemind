package com.mariopetek.service.implementation;

import com.mariopetek.dto.NewUserDTO;
import com.mariopetek.model.Role;
import com.mariopetek.model.User;
import com.mariopetek.repository.UserRepository;
import com.mariopetek.service.RequestDeniedException;
import com.mariopetek.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

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

    public void validateNewUser(NewUserDTO newUser) {
        //treba dodat i format usernamea i passworda i to provjeriti
        final String EMAIL_REGEX = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Assert.notNull(newUser, "newUser must be given.");
        Assert.hasText(newUser.getName(), "newUser name must be given.");
        Assert.hasText(newUser.getUsername(), "newUser username must be given.");
        Assert.hasText(newUser.getEmail(), "enwUser email must be given.");
        Assert.isTrue(newUser.getEmail().matches(EMAIL_REGEX), "newUser email does not match correct format.");
        Assert.hasText(newUser.getPassword(), "newUser password must be given.");
        if(userRepository.countByUsername(newUser.getUsername()) > 0) {
            throw new RequestDeniedException(
                    "User with username " + newUser.getUsername() + " already exists."
            );
        }
        if(userRepository.countByEmail(newUser.getEmail()) > 0) {
            throw new RequestDeniedException(
                    "User with email " + newUser.getEmail() + " already exists."
            );
        }
    }
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public Long addNewUser(NewUserDTO newUser) {
        validateNewUser(newUser);
        User user = new User();
        user.setName(newUser.getName());
        user.setUsername(newUser.getUsername());
        user.setEmail(newUser.getEmail());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setBio(null);
        user.setRole(Role.USER);
        return userRepository.save(user).getUserId();
    }
    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    @Override
    public Optional<User> getUserByUserId(Long userId) {
        return userRepository.findByUserId(userId);
    }
}
