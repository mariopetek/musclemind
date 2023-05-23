package com.mariopetek.service;

import com.mariopetek.model.Following;

import java.util.List;

public interface FollowingService {
    Long getNumberOfAppUsersFollowers(Long appUserId);
    Long getNumberOfUsersAppUserIsFollowing(Long appUserId);
    Boolean isAppUser1FollowingAppUser2(Long appUserId1, Long appUserId2);
    String appUser1FollowsAppUser2(Long appUserId1, Long appUserId2);
    String appUser1UnfollowsAppUser2(Long appUserId1, Long appUserId2);
    List<Following> getUsersAppUserIsFollowing(Long appUserId);
    List<Following> getAppUsersFollowers(Long appUserId);

}
