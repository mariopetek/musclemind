package com.mariopetek.service.implementation;

import com.mariopetek.model.Level;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.LevelRepository;
import com.mariopetek.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LevelServiceImpl implements LevelService {
    private final LevelRepository levelRepository;
    private final AppUserRepository appUserRepository;

    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }
    public Optional<Level> getMostCommonLevel(Long appUserId) {
        return levelRepository.findMostCommonLevel(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
}
