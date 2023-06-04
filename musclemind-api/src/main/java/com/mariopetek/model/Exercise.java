package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vjezba")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @Id
    @Column(name = "id_vjezba")
    @SequenceGenerator(
            name="vjezba_gen",
            sequenceName = "vjezba_seq",
            allocationSize = 1)
    @GeneratedValue(generator = "vjezba_gen")
    private Long exerciseId;
    @Column(name = "naziv_vjezba")
    private String exerciseName;
    @ManyToOne
    @JoinColumn(name = "id_kategorija")
    private Category category;
}
