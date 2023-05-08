import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

import styles from '../../styles/Header.module.css'
import MusclemindLogo from '../../assets/logos/musclemind-logo.png'
import GithubLogo from '../../assets/logos/github-logo.png'
import { IconContext } from 'react-icons'
import { FiPower } from 'react-icons/fi'

const Header = () => {
    const [userInfo, setUserInfo] = useAuth()
    const navigate = useNavigate()
    const authenticatedNavigation = [
        { name: 'Početna', href: '/home' },
        { name: 'Istraži', href: '/explore' },
        { name: 'Novo', href: '/new' },
        { name: 'Račun', href: '/profile' }
    ]
    const notAuthenticatedNavigation = [
        { name: 'Registracija', href: '/register' },
        { name: 'Prijava', href: '/login' }
    ]
    let homeLink = userInfo.isAuthenticated ? '/home' : '/'

    const logout = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('id')
        localStorage.removeItem('username')
        setUserInfo({
            token: null,
            id: null,
            username: null,
            isAuthenticated: false
        })
        navigate('/')
    }

    return (
        <div className={styles.header}>
            <NavLink className={styles.logo} to={homeLink} title="Početna">
                <img src={MusclemindLogo} alt="musclemind-logo.svg" />
                <h1>Musclemind</h1>
            </NavLink>
            <div className={styles.links}>
                {userInfo.isAuthenticated ? (
                    <>
                        {authenticatedNavigation.map((link, idx) => (
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive
                                        ? styles.navLinkActive
                                        : styles.navLink
                                }}
                                key={idx}
                                to={link.href}
                                title={link.name}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className={styles.separator}></div>
                        <IconContext.Provider value={{ size: '25px' }}>
                            <FiPower
                                className={styles.logoutIcon}
                                title="Odjava"
                                onClick={logout}
                            />
                        </IconContext.Provider>
                        <p>{userInfo.username}</p>
                    </>
                ) : (
                    <>
                        {notAuthenticatedNavigation.map((link, idx) => (
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive
                                        ? styles.navLinkActive
                                        : styles.navLink
                                }}
                                key={idx}
                                to={link.href}
                                title={link.name}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className={styles.separator}></div>
                        <NavLink
                            className={styles.githubLogo}
                            target="_blank"
                            to="https://www.github.com"
                            title="Source projekta"
                        >
                            <img src={GithubLogo} alt="github-logo.png" />
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
