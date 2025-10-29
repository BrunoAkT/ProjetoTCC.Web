import { NavLink, useNavigate } from 'react-router-dom';
import styles from './NavTab.module.css';
import icon from "../constants/icon.js";
import { IoMdExit } from "react-icons/io";
import { FaHome, FaListAlt, FaHeartbeat, FaCog, FaUsers, FaUserCircle } from "react-icons/fa";

function NavBar() {
    const navigate = useNavigate();
    const name = localStorage.getItem("sessionName");

    const links = [
        { text: "Home", path: "/home", icon: <FaHome /> },
        { text: "Técnicas", path: "/data", icon: <FaHeartbeat /> },
        { text: "Classificações", path: "/classification", icon: <FaListAlt /> },
        { text: "Condições", path: "/conditions", icon: <FaHeartbeat /> },
        { text: "Usuários", path: "/users", icon: <FaUsers /> },
        { text: "Configurações", path: "/settings", icon: <FaCog /> },
    ];

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/'
    };

    return (
        <aside className={styles.sidebar}>
            <img src={icon.logoWhite} alt="Logo" className={styles.logoWhite} />
            <nav className={styles.nav}>
                {links.map((link) => (
                    <NavLink
                        key={link.text}
                        to={link.path}
                        className={({ isActive }) =>
                            `${styles.navLink} ${isActive ? styles.active : ''}`
                        }
                    >
                        {link.icon}
                        <span>{link.text}</span>
                    </NavLink>
                ))}
            </nav>
            <div className={styles.footer}>
                <div className={styles.userInfo}>
                    <div className={styles.avatarPlaceholder}>
                        <span className={styles.avatarBadge} aria-hidden="true">
                            <FaUserCircle size={14} />
                        </span>
                    </div>
                    <p className={styles.userName}>{name}</p>
                </div>
                <button className={styles.exitButton} onClick={handleLogout} aria-label="Sair">
                    <IoMdExit size={24} />
                </button>
            </div>
        </aside>
    );
}

export default NavBar;

