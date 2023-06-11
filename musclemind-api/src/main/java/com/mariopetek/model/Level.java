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
    @Column(name = "id_tezina")
    @SequenceGenerator(
            name="tezina_gen",
            sequenceName = "tezina_seq",
            allocationSize = 1)
    @GeneratedValue(generator = "tezina_gen")

    private Long levelId;
    @Column(name = "naziv_tezina")
    private String levelName;
}
