package com.mariopetek.configuration.authentication;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotEmpty(message = "Username must not be empty")
    @Pattern(regexp = "^[\\w](?!.*?\\.{2})[\\w.]{1,28}[\\w]$", message = "Username does not match correct format")
    @Size(min = 3, max = 30, message = "Username does not have correct length")
    private String username;
    @NotEmpty(message = "Email must not be empty")
    @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "Email does not match correct format")
    @Size(min = 5, max = 254, message = "Email does not have correct length")
    @Email(message = "Email does not have correct format")
    private String email;
    @NotEmpty(message = "Password must not be empty")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,40}$", message = "Password does not match correct format")
    @Size(min = 8, max = 40, message = "Password does not have correct length")
    private String password;
}
