package com.mariopetek.controller;

import com.mariopetek.dto.NewUserDTO;
import com.mariopetek.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/new")
    public void addNewUser(@RequestBody NewUserDTO newUser) {
        userService.addNewUser(newUser);
    }
}
