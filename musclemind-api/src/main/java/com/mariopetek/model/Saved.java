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
@Table(name = "spremljeno")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Saved {
    @EmbeddedId
    private SavedId savedId;
    @Column(name="vrijeme_spremljeno", nullable = false)
    private Timestamp timeSaved;
}
