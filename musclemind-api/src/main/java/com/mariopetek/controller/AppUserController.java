package com.mariopetek.controller;

import com.mariopetek.dto.AppUserUpdateDTO;
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

    @GetMapping("/search")
    public ResponseEntity<List<AppUser>> getAppUsersByUsernameContainingIgnoreCase(@RequestParam("pattern") String pattern) {
        return ResponseEntity.ok(appUserService.getAppUsersByUsernameContainingIgnoreCase(pattern));
    }
    @GetMapping("/{appUserId}")
    public ResponseEntity<AppUser> getAppUserByAppUserId(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(appUserService.getAppUserByAppUserId(appUserId));
    }
    @PutMapping ("/update/{appUserId}")
    public ResponseEntity<String> updateAppUserInfo(@PathVariable("appUserId") Long appUserId, @RequestBody AppUserUpdateDTO appUserUpdateInfo) {
        return ResponseEntity.ok(appUserService.updateAppUserInfo(appUserId, appUserUpdateInfo));
    }
}
