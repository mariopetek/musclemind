import { NavLink, useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { FiPower } from 'react-icons/fi'

import { useAuth } from './AuthContext'
import styles from '../../styles/Header.module.css'
import MusclemindLogo from '../../assets/logos/musclemind-logo.png'
import GithubLogo from '../../assets/logos/github-logo.png'

const Header = () => {
    const [userInfo, setUserInfo] = useAuth()
    const navigate = useNavigate()
    const authenticatedNavigation = [
        { id: 1, name: 'Početna', href: '/home' },
        { id: 2, name: 'Istraži', href: '/explore' },
        { id: 3, name: 'Novo', href: '/new' },
        { id: 4, name: 'Račun', href: '/profile' }
    ]
    const notAuthenticatedNavigation = [
        { id: 1, name: 'Registracija', href: '/register' },
        { id: 2, name: 'Prijava', href: '/login' }
    ]
    const homeLink = userInfo.isAuthenticated ? '/home' : '/'

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
                        {authenticatedNavigation.map((link) => (
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive
                                        ? styles.navLinkActive
                                        : styles.navLink
                                }}
                                key={link.id}
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
                        {notAuthenticatedNavigation.map((link) => (
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive
                                        ? styles.navLinkActive
                                        : styles.navLink
                                }}
                                key={link.id}
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
