package com.mariopetek.service.implementation;

import com.mariopetek.model.Following;
import com.mariopetek.model.FollowingId;
import com.mariopetek.repository.AppUserRepository;
import com.mariopetek.repository.FollowingRepository;
import com.mariopetek.service.FollowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowingServiceImpl implements FollowingService {
    private final FollowingRepository followingRepository;
    private final AppUserRepository appUserRepository;

    public Long getNumberOfAppUsersFollowers(Long appUserId) {
        return followingRepository.countByFollowingId_AppUser2(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
    public Long getNumberOfUsersAppUserIsFollowing(Long appUserId) {
        return followingRepository.countByFollowingId_AppUser1(appUserRepository.findByAppUserId(appUserId).orElseThrow());
    }
    public Boolean isAppUser1FollowingAppUser2(Long appUserId1, Long appUserId2) {
        return followingRepository.countByFollowingId_AppUser1AndFollowingId_AppUser2(
                appUserRepository.findByAppUserId(appUserId1).orElseThrow(),
                appUserRepository.findByAppUserId(appUserId2).orElseThrow()) > 0;
    }
    public String appUser1FollowsAppUser2(Long appUserId1, Long appUserId2) {
        Following following = new Following();
        following.setFollowingId(new FollowingId(
                appUserRepository.findByAppUserId(appUserId1).orElseThrow(),
                appUserRepository.findByAppUserId(appUserId2).orElseThrow()
        ));
        followingRepository.save(following);
        return "Korisnik zapracen";
    }
    public String appUser1UnfollowsAppUser2(Long appUserId1, Long appUserId2) {
        Following following = new Following();
        following.setFollowingId(new FollowingId(
                appUserRepository.findByAppUserId(appUserId1).orElseThrow(),
                appUserRepository.findByAppUserId(appUserId2).orElseThrow()
        ));
        followingRepository.delete(following);
        return "Korisnik otpracen";
    }
}
