import axios from 'axios'
import { useQuery } from 'react-query'

import UsersDialog from './UsersDialog'

const UserFollowers = ({
    isFollowersDialogShown,
    setIsFollowersDialogShown
}) => {
    const {
        data: userFollowers,
        isLoading: userFollowersLoading,
        isError: userFollowersError
    } = useQuery(
        ['following', 'userfollowers', localStorage.getItem('id')],
        async () => {
            const { data } = await axios.get(
                `/api/v1/following/userfollowers/${localStorage.getItem('id')}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    }
                }
            )
            return data.map(({ followingId }) => followingId.appUser1)
        }
    )
    return !userFollowersLoading && !userFollowersError ? (
        <UsersDialog
            header="Pratitelji"
            noUsersMessage="Trenutno te ne prati ni jedan korisnik. Korisnici koji te zaprate pojaviti će se ovdje."
            isDialogShown={isFollowersDialogShown}
            setIsDialogShown={setIsFollowersDialogShown}
            data={userFollowers}
        />
    ) : null
}

export default UserFollowers
