import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import api from '../../constants/api';
import { FaBrain, FaListAlt, FaHeartbeat } from 'react-icons/fa';

function Home() {
    const [stats, setStats] = useState({ techniques: 0, types: 0, conditions: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [techniquesRes, typesRes, conditionsRes] = await Promise.all([
                    api.get('/exercises', { headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` } }),
                    api.get('/types', { headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` } }),
                    api.get('/conditions', { headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` } })
                ]);

                setStats({
                    techniques: techniquesRes.data?.length || 0,
                    types: typesRes.data?.length || 0,
                    conditions: conditionsRes.data?.length || 0,
                });
            } catch (error) {
                console.error("Erro ao buscar dados para o dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const StatCard = ({ icon, title, count, description, path }) => (
        <div className={styles.card} onClick={() => path && navigate(path)}>
            <div className={styles.cardHeader}>
                {icon}
                <h2 className={styles.cardTitle}>{title}</h2>
            </div>
            <p className={styles.cardCount}>{loading ? '...' : count}</p>
            <p className={styles.cardText}>{description}</p>
        </div>
    );

    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Visão Geral</h1>
                    <p className={styles.subtitle}>Acompanhe os dados da sua aplicação.</p>
                </header>
                <section className={styles.cards}>
                    <StatCard
                        icon={<FaBrain size={24} />}
                        title="Técnicas"
                        count={stats.techniques}
                        description="Técnicas de relaxamento disponíveis."
                        path="/data"
                    />
                    <StatCard
                        icon={<FaListAlt size={24} />}
                        title="Classificações"
                        count={stats.types}
                        description="Categorias para organizar as técnicas."
                        path="/classification"
                    />
                    <StatCard
                        icon={<FaHeartbeat size={24} />}
                        title="Condições"
                        count={stats.conditions}
                        description="Condições que podem ser auxiliadas."
                        path="/conditions"
                    />
                </section>
            </main>
        </div>
    )
}

export default Home;