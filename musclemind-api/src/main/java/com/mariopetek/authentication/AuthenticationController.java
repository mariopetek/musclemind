package com.mariopetek.authentication;


import com.mariopetek.configuration.JwtService;
import com.mariopetek.model.AppUser;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerAppUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticateAppUser(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
    @GetMapping("/validate")
    public ResponseEntity<Long> validateToken(@AuthenticationPrincipal AppUser appUser) {
        return ResponseEntity.ok(appUser.getAppUserId());
    }
}
