package com.mariopetek.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppUserUpdateDTO {

    @Size(min = 2, max = 50, message = "Name does not have correct length")
    @Pattern(regexp = "^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$", message = "Name does not match correct format")
    private String name;
    @Size(min = 2, max = 50, message = "Surname does not have correct length")
    @Pattern(regexp = "^[A-ZČĆĐŠŽ][a-zčćđšž]{1,49}$", message = "Surname does not match correct format")
    private String surname;
    @Size(max = 500, message = "Bio does not have correct length")
    private String bio;
}
