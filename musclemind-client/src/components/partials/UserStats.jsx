import StatsDialog from './StatsDialog'

const UserStats = ({ isStatsDialogShown, setIsStatsDialogShown }) => {
    //dohvatiti podatke i predati ih StatsDialog kao prop
    return (
        <StatsDialog
            header="Statistika"
            isDialogShown={isStatsDialogShown}
            setIsDialogShown={setIsStatsDialogShown}
        />
    )
}

export default UserStats
