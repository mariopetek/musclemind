package com.mariopetek.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FollowingId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "id_korisnik_prati")
    private AppUser appUser1;
    @ManyToOne
    @JoinColumn(name = "id_korisnik_pracen")
    private AppUser appUser2;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FollowingId that = (FollowingId) o;
        return Objects.equals(appUser1, that.appUser1) && Objects.equals(appUser2, that.appUser2);
    }
    @Override
    public int hashCode() {
        return Objects.hash(appUser1, appUser2);
    }
}
