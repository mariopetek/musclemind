package com.mariopetek.configuration.authentication;

import com.mariopetek.dto.validator.DTOValidator;
import com.mariopetek.configuration.authentication.jwt.JwtService;
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
    private final DTOValidator<RegisterRequest> registerRequestValidator;
    public AuthenticationResponse register(RegisterRequest request) {
        registerRequestValidator.validate(request);
        AppUser appUser = AppUser
                        .builder()
                        .name(request.getName())
                        .surname(request.getSurname())
                        .username(request.getUsername())
                        .email(request.getEmail())
                        .password(passwordEncoder.encode(request.getPassword()))
                        .bio(null)
                        .role(roleRepository.findByRoleName("ROLE_USER").orElseThrow())
                        .build();
        String jwtToken = jwtService.generateToken(appUser);
        AppUser savedAppUser = appUserRepository.save(appUser);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .appUserId(savedAppUser.getAppUserId())
                .username(savedAppUser.getUsername())
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(),
                                                    request.getPassword()));
        AppUser appUser = appUserRepository.findByUsername(request.getUsername()).orElseThrow();
        String jwtToken = jwtService.generateToken(appUser);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .appUserId(appUser.getAppUserId())
                .username(appUser.getUsername())
                .build();
    }
}
