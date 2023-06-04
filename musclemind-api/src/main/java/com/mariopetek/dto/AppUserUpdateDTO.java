package com.mariopetek.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppUserUpdateDTO {
    @NotNull(message = "Name must not be null.")
    @Size(max = 50, message = "Name does not have correct length.")
    private String name;
    @NotNull(message = "Bio must not be null.")
    @Size(max = 500, message = "Bio does not have correct length")
    private String bio;
}
