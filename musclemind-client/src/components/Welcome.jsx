import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import MusclemindLogo from '../assets/logos/musclemind-logo.png'
import styles from '../styles/Welcome.module.css'

const Welcome = () => {
    useEffect(()=> {
        
    })
    return (
        <div className={styles.bodyContainer}>
            <img src={MusclemindLogo} alt="musclemind-logo.svg" />
            <div className={styles.textContainer}>
                <h1>Muscemind</h1>
                <p className={styles.mainDesc}>Mjesto na kojem vlada trening i zdravlje.</p>
                <p className={styles.secondaryDesc}>Izradite i podijelite svoj trening te se povežite s ostalima koji imaju jednake interese.</p>
                <div className={styles.buttonContainer}>
                    <NavLink className={styles.registerButton} to="/register">Registriraj se</NavLink>
                    <div className={styles.loginContainer}>
                        <p>Imaš račun?</p>
                        <NavLink className={styles.loginButton} to="/login">Prijavi se</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
