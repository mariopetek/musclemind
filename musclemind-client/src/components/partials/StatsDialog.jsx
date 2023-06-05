import { useEffect, useRef } from 'react'
import { TfiClose } from 'react-icons/tfi'

import styles from '../../styles/StatsDialog.module.css'

const StatsDialog = ({ header, isDialogShown, setIsDialogShown }) => {
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
        </dialog>
    )
}

export default StatsDialog
