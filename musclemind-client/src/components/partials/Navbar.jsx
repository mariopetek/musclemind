import { NavLink } from 'react-router-dom'

import '../../styles/Navbar.css'
import MusclemindLogo from '../../assets/logos/musclemind-logo.png'
import GithubLogo from '../../assets/logos/github-logo.png'

const Navbar = (props) => {
    const authenticatedNavigation = [
        {name: 'Početna', href: '/home'},
        {name: 'Istraži', href: '/explore'},
        {name: 'Novo', href: '/new'},
        {name: 'Račun', href: '/profile'}
    ]
    const notAuthenticatedNavigation = [
        {name: 'Registracija', href: '/register'},
        {name: 'Prijava', href: '/login'}
    ]

    let homeLink = props.isAuthenticated ? "/home" : "/"

    return (
        <>
            <div className="header">
                <NavLink className="logo" to={homeLink}>
                    <img src={MusclemindLogo} alt="musclemind-logo.svg" />
                    <h1>Musclemind</h1>
                </NavLink>
                <div className="links">
                    {
                        props.isAuthenticated ?
                        authenticatedNavigation.map((link, idx) => (
                            <NavLink className={({isActive}) => {return isActive ? "navLinkActive" : "navLink"}} key={idx} to={link.href}>{link.name}</NavLink>
                        ))
                        :
                        <>
                            {
                                notAuthenticatedNavigation.map((link, idx) => (
                                    <NavLink className={({isActive}) => {return isActive ? "navLinkActive" : "navLink"}} key={idx} to={link.href}>{link.name}</NavLink>
                                ))
                            }
                            <div className="separator"></div>
                            <NavLink className="githubLogo" target="_blank" to="https://www.github.com">
                                <img src={GithubLogo} alt="github-logo.png" />
                            </NavLink>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
