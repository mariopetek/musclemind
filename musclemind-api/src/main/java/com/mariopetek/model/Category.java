package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "kategorija")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    @Column(name = "id_kategorija", nullable = false)
    @SequenceGenerator(
            name = "id_kategorija_sequence",
            sequenceName = "id_kategorija_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "id_kategorija_sequence"
    )
    private Long categoryId;
    @Column(name = "naziv_kategorija", nullable = false, unique = true)
    private String categoryName;
    @Column(name = "slika", nullable = false, unique = true)
    private String image;
}
