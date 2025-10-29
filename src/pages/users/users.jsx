import React, { useEffect, useState } from 'react';
import styles from './users.module.css';
import Account from '../account/account.jsx';
import api from '../../constants/api.js';

function Users() {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [isPanelActive, setIsPanelActive] = useState(false);
    const currentEmail = localStorage.getItem('sessionEmail');

    const showRegister = () => {
        setIsRegisterVisible(true);
        if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(() => setIsPanelActive(true));
        } else {
            setTimeout(() => setIsPanelActive(true), 0);
        }
    };
    const hideRegister = () => {
        setIsPanelActive(false);
        setTimeout(() => setIsRegisterVisible(false), 500);
    };
    const [users, setUsers] = useState([]);
    async function fetchData() {
        try {
            const response = await api.get('/admins', {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            alert("Erro ao buscar usuários: " + error.message);
        }
    }

    useEffect(() => {
        fetchData();
    },[])
    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Gerenciamento de Usuários</h1>
                    <p className={styles.subtitle}>Adicione, edite ou remova usuários do sistema.</p>
                </header>
                <section className={styles.userSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Equipe</h2>
                        <button className={styles.addButton} onClick={showRegister}>
                            + Adicionar usuário
                        </button>
                    </div>
                    <div className={styles.userList}>
                        {users.map(user => (
                            <div key={user.id_admin} className={styles.userCard}>
                                <div className={styles.userInfo}>
                                    <h3 className={styles.userName}>
                                        {user.nome}
                                        {user.email === currentEmail && (
                                            <span className={styles.youBadge}>Você</span>
                                        )}
                                    </h3>
                                    <p className={styles.userEmail}>{user.email}</p>
                                </div>
                                {/* <div className={styles.userRole}>
                                    <span>{user.role}</span>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            {/* Painel deslizante para registro de usuário */}
            {isRegisterVisible && (
                <>
                    <div className={`${styles.backdrop} ${isPanelActive ? styles.visible : ''}`} onClick={hideRegister} />
                    <div className={`${styles.animatedContainer} ${isPanelActive ? styles.visible : ''}`}>
                        <Account hideRegister={hideRegister} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Users;
