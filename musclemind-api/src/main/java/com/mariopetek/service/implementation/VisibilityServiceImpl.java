package com.mariopetek.service.implementation;

import com.mariopetek.model.Visibility;
import com.mariopetek.repository.VisibilityRepository;
import com.mariopetek.service.VisiblityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VisibilityServiceImpl implements VisiblityService {
    private final VisibilityRepository visibilityRepository;
    public List<Visibility> getAllVisibilities() {
        return visibilityRepository.findAll();
    }
}
