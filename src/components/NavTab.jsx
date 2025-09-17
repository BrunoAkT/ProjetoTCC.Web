import icon from "../constants/icon.js";
import { useState } from "react";

function NavBar() {
    const [hoveredLink, setHoveredLink] = useState(null);

    const links = ["Home", "Data", "Configurações"];

    return (
        <aside style={styles.sidebar}>
            <img src={icon.logoWhite} alt="Logo" style={styles.logoWhite} />
            <nav style={styles.nav}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={`/${link.toLowerCase()}`}
                        style={{
                            ...styles.navLink,
                            ...(hoveredLink === index ? styles.navLinkHover : {}),
                        }}
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        {link}
                    </a>
                ))}
            </nav>
            <div style={styles.footer}>
                <div style={styles.userSection}>
                    <img src={icon.avatarplaceholder} alt='User Avatar' style={styles.avatarplaceholder} />
                </div>
                <p>Nome</p>
            </div>
        </aside>
    );
}

const styles = {
    sidebar: {
        width: "200px",
        background: "var(--color-primary-text)",
        color: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px",
        boxShadow: "4px 0 12px rgba(0, 0, 0, 0.1)",
    },
    logo: {
        width: "80px",
        height: "80px",
        marginBottom: "40px",
    },
    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
    },
    navLink: {
        color: "var(--color-background)",
        textDecoration: "none",
        fontWeight: 500,
        fontSize: "1rem",
        padding: "10px",
        borderRadius: "8px",
        transition: "background 0.2s ease",
        fontFamily: "var(--font-poppins)",
    },
    navLinkHover: {
        background: "var(--color-primary-button)",
        color: "var(--color-secondary-text)",
    },
    footer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "auto",
        flexDirection: "row",
        marginRight: "auto",
        fontFamily: "var(--font-poppins)",

    },
    avatarplaceholder: {
        width: "50px",
        height: "50px",
    },
    userSection: {
        background: "var(--color-background)",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        padding: "5px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
    }
};

export default NavBar;
