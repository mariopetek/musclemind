package com.mariopetek.controller;

import com.mariopetek.model.User;
import com.mariopetek.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    //Umjesto ovog konstruktora možemo koristiti i @Autowired anotaciju nad private final AppUserService varijablom (dependency injection)
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
