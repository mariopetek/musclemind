package com.mariopetek.service;

public interface FollowingService {
    Long getNumberOfAppUsersFollowers(Long appUserId);
    Long getNumberOfUsersAppUserIsFollowing(Long appUserId);
    Boolean isAppUser1FollowingAppUser2(Long appUserId1, Long appUserId2);
    String appUser1FollowsAppUser2(Long appUserId1, Long appUserId2);
    String appUser1UnfollowsAppUser2(Long appUserId1, Long appUserId2);

}
