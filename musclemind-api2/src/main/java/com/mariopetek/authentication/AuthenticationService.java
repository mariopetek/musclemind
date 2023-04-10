package com.mariopetek.authentication;

import com.mariopetek.configuration.JwtService;
import com.mariopetek.model.AppUser;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AppUserRepository appUserRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var appUser = AppUser
                        .builder()
                        .name(request.getName())
                        .username(request.getUsername())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .bio(null)
                        .role(roleRepository.findByRoleName("ROLE_USER"))
                        .build();
        appUserRepository.save(appUser);
        var jwtToken = jwtService.generateToken(appUser);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(),
                                                    request.getPassword()));
        var appUser = appUserRepository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(appUser);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
}
