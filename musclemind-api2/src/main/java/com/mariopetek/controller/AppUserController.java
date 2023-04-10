package com.mariopetek.controller;

import com.mariopetek.model.AppUser;
import com.mariopetek.service.AppUserService;
import com.mariopetek.dto.NewAppUserDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class AppUserController {
    private final AppUserService appUserService;

    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("")
    public ResponseEntity<List<AppUser>> getAllAppUsers() {
        return new ResponseEntity<>(appUserService.getAllAppUsers(), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<Long> addNewAppUser(@RequestBody NewAppUserDTO newAppUser) {
        return new ResponseEntity<>(appUserService.addNewAppUser(newAppUser), HttpStatus.OK);
    }
}
