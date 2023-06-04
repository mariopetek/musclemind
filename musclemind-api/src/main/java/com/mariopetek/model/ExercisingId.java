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
import java.sql.Timestamp;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExercisingId implements Serializable {
    @Column(name = "vrijeme_zapoceto")
    private Timestamp timeStarted;
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
        ExercisingId that = (ExercisingId) o;
        return Objects.equals(timeStarted, that.timeStarted) && Objects.equals(appUser, that.appUser) && Objects.equals(workout, that.workout);
    }
    @Override
    public int hashCode() {
        return Objects.hash(timeStarted, appUser, workout);
    }
}
