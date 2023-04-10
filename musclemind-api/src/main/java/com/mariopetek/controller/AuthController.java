package com.mariopetek.controller;

import com.mariopetek.dto.NewUserDTO;
import com.mariopetek.service.UserService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/new")
    public Long addNewUser(@RequestBody NewUserDTO newUser) {
        return userService.addNewUser(newUser);
    }
}
