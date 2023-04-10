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
    @Column(name = "id_uloga", nullable = false)
    @SequenceGenerator(
            name = "id_uloga_sequence",
            sequenceName = "id_uloga_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "id_uloga_sequence"
    )
    private Long roleId;
    @Column(name = "naziv_uloga", nullable = false, unique = true)
    private String roleName;

    public Role(String roleName) {
        this.roleName = roleName;
    }
}
