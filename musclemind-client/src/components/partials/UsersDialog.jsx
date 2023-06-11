import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { TfiClose } from 'react-icons/tfi'

import styles from '../../styles/UsersDialog.module.css'

const UsersDialog = ({
    header,
    noUsersMessage,
    isDialogShown,
    setIsDialogShown,
    data
}) => {
    const dialogRef = useRef()

    useEffect(() => {
        if (isDialogShown) {
            document.querySelector('html').style.position = 'fixed'
            document.querySelector('html').style.width = '100%'
            dialogRef.current.showModal()
        } else {
            document.querySelector('html').style.position = ''
            document.querySelector('html').style.width = ''
            dialogRef.current.close()
        }
        const handler = (event) => {
            const dialogDimensions = dialogRef.current.getBoundingClientRect()
            if (
                event.clientX < dialogDimensions.left ||
                event.clientX > dialogDimensions.right ||
                event.clientY < dialogDimensions.top ||
                event.clientY > dialogDimensions.bottom
            ) {
                setIsDialogShown(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
            dialogRef.current?.close()
            if (isDialogShown) setIsDialogShown(false)
            document.querySelector('html').style.position = ''
            document.querySelector('html').style.width = ''
        }
    }, [isDialogShown])

    return (
        <dialog ref={dialogRef} className={styles.dialogContainer}>
            <div className={styles.headerContainer}>
                <button
                    className={styles.closeButton}
                    type="button"
                    onClick={() => setIsDialogShown(false)}
                >
                    <TfiClose />
                </button>
                <h3>{header}</h3>
            </div>
            {data.length > 0 ? (
                <div className={styles.usersContainer}>
                    {data.map((user) => (
                        <NavLink
                            className={styles.userLink}
                            key={user.appUserId}
                            to={`/explore/users/${user.appUserId}`}
                        >
                            {user.username}
                            <p>{`${user.name} ${user.surname}`}</p>
                        </NavLink>
                    ))}
                </div>
            ) : (
                <div className={styles.noUsersContainer}>
                    <p>{noUsersMessage}</p>
                </div>
            )}
        </dialog>
    )
}

export default UsersDialog
