package com.mariopetek.configuration.authentication;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotEmpty(message = "Name must not be empty")
    @Size(min = 2, max = 50, message = "Name does not have correct length")
    @Pattern(regexp = "^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$", message = "Name does not match correct format")
    private String name;
    @NotEmpty(message = "Surname must not be empty")
    @Size(min = 2, max = 50, message = "Surname does not have correct length")
    @Pattern(regexp = "^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$", message = "Surname does not match correct format")
    private String surname;
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
    @Pattern(regexp = "^(?=.*[A-ZČĆĐŠŽa-zčćđšž])(?=.*\\d)(?=.*[@$!%*#?&])[A-ZČĆĐŠŽa-zčćđšž\\d@$!%*#?&]{8,40}$", message = "Password does not match correct format")
    @Size(min = 8, max = 40, message = "Password does not have correct length")
    private String password;
}
