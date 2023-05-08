package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "uloga")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @Column(name = "id_uloga", nullable = false, columnDefinition = "serial")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    @Column(name = "naziv_uloga", nullable = false, unique = true)
    private String roleName;
}
