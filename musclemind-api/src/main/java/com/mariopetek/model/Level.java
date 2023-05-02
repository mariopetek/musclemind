package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tezina")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Level {
    @Id
    @Column(name = "id_tezina", nullable = false)
    @SequenceGenerator(
            name = "id_tezina_sequence",
            sequenceName = "id_težina_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "id_tezina_sequence"
    )
    private Long levelId;
    @Column(name = "naziv_tezina", nullable = false, unique = true)
    private String levelName;

    public Level(String levelName) {
        this.levelName = levelName;
    }
}
