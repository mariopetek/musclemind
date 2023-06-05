import axios from 'axios'
import { useQuery } from 'react-query'

import UsersDialog from './UsersDialog'

const UserFollowing = ({
    isFollowingDialogShown,
    setIsFollowingDialogShown
}) => {
    const {
        data: userFollowing,
        isLoading: userFollowingLoading,
        isError: userFollowingError
    } = useQuery(
        ['following', 'userfollowing', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/following/userfollowing/${localStorage.getItem('id')}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data.map(({ followingId }) => followingId.appUser2)
        }
    )
    return !userFollowingLoading && !userFollowingError ? (
        <UsersDialog
            header="Pratim"
            noUsersMessage="Trenutno ne pratiš ni jednog korisnika. Korisnici koje zapratiš pojaviti će se ovdje."
            isDialogShown={isFollowingDialogShown}
            setIsDialogShown={setIsFollowingDialogShown}
            data={userFollowing}
        />
    ) : null
}

export default UserFollowing
