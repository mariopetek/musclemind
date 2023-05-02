package com.mariopetek.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "svidjanje")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Liking {
    @EmbeddedId
    private LikingId likingId;
}
