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
    @Column(name = "id_vidljivost", nullable = false, columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visibilityId;
    @Column(name = "naziv_vidljivost", nullable = false, unique = true)
    private String visibilityName;
}
