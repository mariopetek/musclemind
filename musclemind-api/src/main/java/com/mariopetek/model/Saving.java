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
@Table(name = "spremanje")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Saving {
    @EmbeddedId
    private SavingId savingId;
    @Column(name="vrijeme_spremanje")
    private Timestamp timeSaved;
}
