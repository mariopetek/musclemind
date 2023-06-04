package com.mariopetek.configuration.authentication;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotNull(message = "Username must not be null.")
    @NotEmpty(message = "Username must not be empty.")
    @Pattern(regexp = "^[\\w](?!.*?\\.{2})[\\w.]{1,28}[\\w]$", message = "Username does not match correct format.")
    @Size(min = 3, max = 30, message = "Username does not have correct length.")
    private String username;
    @NotNull(message = "Email must not be null.")
    @NotEmpty(message = "Email must not be empty.")
    @Pattern(regexp = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "Email does not match correct format.")
    @Size(min = 5, max = 254, message = "Email does not have correct length.")
    private String email;
    @NotNull(message = "Password must not be null.")
    @NotEmpty(message = "Password must not be empty.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,40}$", message = "Password does not match correct format.")
    @Size(min = 8, max = 40, message = "Password does not have correct length.")
    private String password;
}
