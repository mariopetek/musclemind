import { useEffect } from 'react'
import MusclemindLogo from '../assets/logos/musclemind-logo.png'
import '../styles/Welcome.css'
import validateToken from '../utilities/ValidateToken'

const Welcome = () => {
    
    return (
        <div className="bodyContainer">
            <img src={MusclemindLogo} alt="musclemind-logo.svg" />
            <div className="textContainer">
                <h1>Muscemind</h1>
                <p className="mainDesc">Mjesto na kojem vlada trening i zdravlje.</p>
                <p className="secondaryDesc">Izradite i podijelite svoj trening te se povežite s ostalima koji imaju jednake interese.</p>
                <div className="buttonContainer">
                    <a className="registerButton" href="/register">Registriraj se</a>
                    <div className="loginButton">
                        <p>Imaš račun?</p>
                        <a href="/login">Prijavi se</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome
