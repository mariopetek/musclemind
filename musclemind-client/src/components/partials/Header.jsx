import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../App'

import styles from '../../styles/Header.module.css'
import MusclemindLogo from '../../assets/logos/musclemind-logo.png'
import GithubLogo from '../../assets/logos/github-logo.png'
import { IconContext } from 'react-icons'
import { FiPower } from 'react-icons/fi'


export const Header = () => {
    const [ isAuthenticated, setIsAuthenticated ] = useContext(AuthContext)
    const navigate = useNavigate()
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
    let homeLink = isAuthenticated ? "/home" : "/"

    const logout = () => {
        localStorage.removeItem('jwt')
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <div className={styles.header}>
            <NavLink className={styles.logo} to={homeLink}>
                <img src={MusclemindLogo} alt="musclemind-logo.svg" />
                <h1>Musclemind</h1>
            </NavLink>
            <div className={styles.links}>
                {
                    isAuthenticated ?
                    <>
                        {
                            authenticatedNavigation.map((link, idx) => (
                                <NavLink className={({isActive}) => {return isActive ? styles.navLinkActive : styles.navLink}} key={idx} to={link.href}>{link.name}</NavLink>
                            ))
                        }
                        <div className={styles.separator}></div>
                        <IconContext.Provider value={{ color: "rgba(89, 89, 89, 1)", size: "25px", className:styles.logoutIcon }}>
                            <FiPower onClick={logout}/>
                        </IconContext.Provider>
                    </>
                    :
                    <>
                        {
                            notAuthenticatedNavigation.map((link, idx) => (
                                <NavLink className={({isActive}) => {return isActive ? styles.navLinkActive : styles.navLink}} key={idx} to={link.href}>{link.name}</NavLink>
                            ))
                        }
                        <div className={styles.separator}></div>
                        <NavLink className={styles.githubLogo} target="_blank" to="https://www.github.com">
                            <img src={GithubLogo} alt="github-logo.png" />
                        </NavLink>
                    </>
                }
            </div>
        </div>
    )
}

export default Header
