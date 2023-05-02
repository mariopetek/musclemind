package com.mariopetek.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "vjezbanje")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercising {
    @EmbeddedId
    private ExercisingId exercisingId;
    @Column(name = "vrijeme_zapoceto", nullable = false)
    private Timestamp timeStarted;
    @Column(name = "vrijeme_zavrseno")
    private Timestamp timeFinished;
}
