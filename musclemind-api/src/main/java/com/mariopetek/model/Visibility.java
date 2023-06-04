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
    @Column(name = "id_vidljivost")
    @SequenceGenerator(
            name="vidljivost_gen",
            sequenceName = "vidljivost_seq",
            allocationSize = 1)
    @GeneratedValue(generator = "vidljivost_gen")

    private Long visibilityId;
    @Column(name = "naziv_vidljivost")
    private String visibilityName;
}
