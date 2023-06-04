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
    @Column(name = "id_uloga")
    @SequenceGenerator(
            name="uloga_gen",
            sequenceName = "uloga_seq",
            allocationSize = 1)
    @GeneratedValue(generator = "uloga_gen")

    private Long roleId;
    @Column(name = "naziv_uloga")
    private String roleName;
}
