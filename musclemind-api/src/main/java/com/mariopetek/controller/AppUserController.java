package com.mariopetek.controller;

import com.mariopetek.model.AppUser;
import com.mariopetek.service.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor //radi konstruktor za sve final varijable
public class AppUserController {
    private final AppUserService appUserService;

    @GetMapping("")
    public ResponseEntity<List<AppUser>> getAllAppUsers() {
        return ResponseEntity.ok(appUserService.getAllAppUsers());
    }
}
