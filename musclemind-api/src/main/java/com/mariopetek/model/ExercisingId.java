package com.mariopetek.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExercisingId implements Serializable {
    @Column(name = "id_vjezbanje", nullable = false)
    private Long exercisingId;
    @ManyToOne
    @JoinColumn(name = "id_korisnik")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(name = "id_trening")
    private Workout workout;
}
