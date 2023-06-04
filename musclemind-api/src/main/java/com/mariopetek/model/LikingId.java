package com.mariopetek.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class LikingId implements Serializable {
    @ManyToOne
    @JoinColumn(name = "id_korisnik")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(name = "id_trening")
    private Workout workout;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LikingId likingId = (LikingId) o;
        return Objects.equals(appUser, likingId.appUser) && Objects.equals(workout, likingId.workout);
    }
    @Override
    public int hashCode() {
        return Objects.hash(appUser, workout);
    }
}
