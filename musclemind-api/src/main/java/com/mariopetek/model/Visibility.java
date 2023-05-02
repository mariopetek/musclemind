package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="vidljivost")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Visibility {
    @Id
    @Column(name = "id_vidljivost", nullable = false)
    @SequenceGenerator(
            name = "id_vidljivost_sequence",
            sequenceName = "id_vidljivost_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "id_vidljivost_sequence"
    )
    private Long visibilityId;
    @Column(name = "naziv_vidljivost", nullable = false, unique = true)
    private String visibilityName;

    public Visibility(String visibilityName) {
        this.visibilityName = visibilityName;
    }
}
