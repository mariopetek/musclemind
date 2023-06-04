package com.mariopetek.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@RequiredArgsConstructor
public class DTONotValidException extends RuntimeException {
    private final Set<String> errorMessages;
}
