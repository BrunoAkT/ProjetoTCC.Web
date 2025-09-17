import styles from './home.module.css';

function Home() {
    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Bem-vindo ao Dashboard</h1>
                </header>
                <section className={styles.cards}>
                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Estatísticas</h2>
                        <p className={styles.cardText}>Aqui você verá métricas e dados principais.</p>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Notificações</h2>
                        <p className={styles.cardText}>Mensagens e alertas recentes aparecerão aqui.</p>
                    </div>

                    <div className={styles.card}>
                        <h2 className={styles.cardTitle}>Configurações</h2>
                        <p className={styles.cardText}>Gerencie preferências da sua conta.</p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home;