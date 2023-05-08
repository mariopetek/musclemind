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
    @Column(name = "id_vjezba", nullable = false, columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;
    @Column(name = "naziv_vjezba", nullable = false, unique = true)
    private String exerciseName;
    @ManyToOne
    @JoinColumn(name = "id_kategorija")
    private Category category;
}
