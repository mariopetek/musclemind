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
    @Column(name = "id_kategorija")
    @SequenceGenerator(
            name="kategorija_gen",
            sequenceName = "kategorija_seq",
            allocationSize = 1)
    @GeneratedValue(generator = "kategorija_gen")

    private Long categoryId;
    @Column(name = "naziv_kategorija")
    private String categoryName;
}
