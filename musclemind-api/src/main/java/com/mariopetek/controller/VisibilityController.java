package com.mariopetek.controller;

import com.mariopetek.model.Visibility;
import com.mariopetek.service.VisiblityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/visibilities")
@RequiredArgsConstructor
public class VisibilityController {
    private final VisiblityService visiblityService;

    @GetMapping
    public ResponseEntity<List<Visibility>> getAllVisibilities() {
        return ResponseEntity.ok(visiblityService.getAllVisibilities());
    }
}
