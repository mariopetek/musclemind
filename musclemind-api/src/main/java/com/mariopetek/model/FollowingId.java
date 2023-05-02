package com.mariopetek.model;

import jakarta.persistence.*;
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
public class FollowingId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "id_korisnik")
    private AppUser appUser1;
    @ManyToOne
    @JoinColumn(name = "pratim_id_korisnik")
    private AppUser appUser2;
}
