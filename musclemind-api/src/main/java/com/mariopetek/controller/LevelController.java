package com.mariopetek.controller;

import com.mariopetek.model.Level;
import com.mariopetek.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/levels")
@RequiredArgsConstructor
public class LevelController {
    private final LevelService levelService;

    @GetMapping
    public ResponseEntity<List<Level>> getAllLevels() {
        return ResponseEntity.ok(levelService.getAllLevels());
    }
}
