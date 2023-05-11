package com.mariopetek.service.implementation;

import com.mariopetek.model.Level;
import com.mariopetek.repository.LevelRepository;
import com.mariopetek.service.LevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LevelServiceImpl implements LevelService {
    private final LevelRepository levelRepository;

    public List<Level> getAllLevels() {
        return levelRepository.findAll();
    }
}
