import React from 'react'
import '../../styles/Navbar.css'
import MusclemindLogo from '../../assets/logos/musclemind-logo.svg'
import GithubLogo from '../../assets/logos/github-logo.png'

export default () => {
    return (
        <>
            <div className="header">
                <a className="logo" href="/">
                    <img src={MusclemindLogo} alt="musclemind-logo.svg" />
                    <h1>Musclemind</h1>
                </a>
                <div className="links">
                    <a href="/register">Registracija</a>
                    <a href="/login">Prijava</a>
                    <div></div>
                    <a href="https://www.github.com" target="_blank">
                        <img src={GithubLogo} alt="github-logo.png" />
                    </a>
                </div>
            </div>
        </>
    )
}
