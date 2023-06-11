package com.mariopetek.service;

import com.mariopetek.model.Level;

import java.util.List;
import java.util.Optional;

public interface LevelService {
    List<Level> getAllLevels();
    Optional<Level> getMostCommonLevel(Long appUserId);
}
