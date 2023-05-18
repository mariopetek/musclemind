package com.mariopetek.repository;

import com.mariopetek.model.AppUser;
import com.mariopetek.model.Following;
import com.mariopetek.model.FollowingId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowingRepository extends JpaRepository<Following, FollowingId> {
    Long countByFollowingId_AppUser1(AppUser appUser1);
    Long countByFollowingId_AppUser2(AppUser appUser2);
    Long countByFollowingId_AppUser1AndFollowingId_AppUser2(AppUser appUser1, AppUser appUser2);
}
