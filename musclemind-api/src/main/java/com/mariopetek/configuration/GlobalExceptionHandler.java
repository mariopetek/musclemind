package com.mariopetek.configuration;

import com.mariopetek.exception.DTONotValidException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(DTONotValidException.class)
    public ResponseEntity<?> handleException(DTONotValidException exception) {
        return ResponseEntity.badRequest().body(exception.getErrorMessages());
    }
}
