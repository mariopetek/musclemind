import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { TfiClose } from 'react-icons/tfi'

import styles from '../../styles/Dialog.module.css'

const Dialog = ({ header, isDialogShown, setIsDialogShown, data }) => {
    const dialogRef = useRef()

    useEffect(() => {
        if (isDialogShown) {
            document.querySelector('body').style.overflow = 'hidden'
            dialogRef.current.showModal()
        } else {
            document.querySelector('body').style.overflow = 'auto'
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
            <div className={styles.usersContainer}>
                {data.map((user) => (
                    <NavLink
                        className={styles.userLink}
                        key={user.appUserId}
                        to={`/explore/users/${user.appUserId}`}
                    >
                        {user.username}
                    </NavLink>
                ))}
            </div>
        </dialog>
    )
}

export default Dialog
