package com.mariopetek.model;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Table(name = "pracenje")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Following {
    @EmbeddedId
    private FollowingId followingId;
    @Column(name = "vrijeme_pracenje")
    private Timestamp timeFollowed;
}
