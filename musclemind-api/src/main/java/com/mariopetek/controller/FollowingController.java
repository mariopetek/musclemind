package com.mariopetek.controller;

import com.mariopetek.model.Following;
import com.mariopetek.service.FollowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/following")
@RequiredArgsConstructor
public class FollowingController {
    private final FollowingService followingService;
    @GetMapping("/followingcount/{appUserId}") //koliko korisnika prati korisnik appUserId
    public ResponseEntity<Long> getNumberOfUsersAppUserIsFollowing(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(followingService.getNumberOfUsersAppUserIsFollowing(appUserId));
    }
    @GetMapping("/userfollowing/{appUserId}") //korisnici koje prati korisnik appUserId
    public ResponseEntity<List<Following>> getUsersAppUserIsFollowing(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(followingService.getUsersAppUserIsFollowing(appUserId));
    }
    @GetMapping("/followerscount/{appUserId}") //koliko pratitelja ima korisnik appUserId
    public ResponseEntity<Long> getNumberOfAppUsersFollowers(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(followingService.getNumberOfAppUsersFollowers(appUserId));
    }
    @GetMapping("/userfollowers/{appUserId}") //korisnici koji prate korisnika appUserId
    public ResponseEntity<List<Following>> getAppUsersFollowers(@PathVariable("appUserId") Long appUserId) {
        return ResponseEntity.ok(followingService.getAppUsersFollowers(appUserId));
    }
    @GetMapping("/isfollowing/{appUserId1}/{appUserId2}") //prati li korisnik appUserId1 korinsika appUserId2 (ako da count će biti 1, ako ne count će biti 0)
    public ResponseEntity<Boolean> isAppUser1FollowingAppUser2(@PathVariable("appUserId1") Long appUserId1, @PathVariable("appUserId2") Long appUserId2) {
        return ResponseEntity.ok(followingService.isAppUser1FollowingAppUser2(appUserId1, appUserId2));
    }
    @PostMapping("/follow/{appUserId1}/{appUserId2}") //korisnik appUserId1 zapracuje korisnika appUserId2
    public ResponseEntity<String> appUser1FollowsAppUser2(@PathVariable("appUserId1") Long appUserId1, @PathVariable("appUserId2") Long appUserId2) {
        return ResponseEntity.ok(followingService.appUser1FollowsAppUser2(appUserId1, appUserId2));
    }
    @DeleteMapping("/unfollow/{appUserId1}/{appUserId2}") //korisnik appUserId1 otpracuje korisnika appUserId2
    public ResponseEntity<String> appUser1UnfollowsAppUser2(@PathVariable("appUserId1") Long appUserId1, @PathVariable("appUserId2") Long appUserId2) {
        return ResponseEntity.ok(followingService.appUser1UnfollowsAppUser2(appUserId1, appUserId2));
    }
}
