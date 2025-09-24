import React, { useEffect, useState } from 'react';
import styles from './classification.module.css';
import api from '../../constants/api';
import * as FaIcons from "react-icons/fa";
import AddTypeModal from '../../components/AddTypeModal.jsx';
function Classification() {
    const [types, setTypes] = useState([]);

    async function fetchTypes() {
        try {
            const response = await api.get('/types', {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                setTypes(response.data);
            }
        } catch (error) {
            alert("Erro ao buscar tipos: " + error.message);
        }
    }

    useEffect(() => {
        fetchTypes();
    }, []);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleMenu(id) {
        setOpenMenuId(openMenuId === id ? null : id);
    }

    async function handleCreateType(newType) {
        try {
            const payload = {
                nome_tipo: newType.nome,
                icone: newType.icone,
                conditions: newType.incapableConditions || []
            };

            await api.post('/types', payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            setIsModalOpen(false);
            fetchTypes();
        } catch (err) {
            console.error('Erro ao criar tipo:', err);
            alert('Erro ao criar tipo: ' + (err.response?.data?.message || err.message));
        }
    }
    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Classificações de Exercícios</h1>
                </header>
                <section className={styles.dataSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Tipos</h2>
                        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>Adicionar Tipo</button>
                    </div>
                    <div className={styles.grid}>
                        {types.length > 0 ? (
                            types.map((type) => (
                                <div key={type.id_tipo} className={styles.typeCard}>
                                    <div className={styles.typeInner}>
                                        <div className={styles.typeIconPlaceholder}>
                                            {(() => {
                                                const iconName = String(type.icon || 'FaQuestionCircle').trim();
                                                const Comp = FaIcons[iconName] || FaIcons.FaQuestionCircle;
                                                return <Comp size={90} color="var(--color-primary-text)" />;
                                            })()}
                                        </div>

                                        <button className={styles.moreBtn} onClick={() => toggleMenu(type.id_tipo)} aria-label="Mais opções">⋮</button>
                                        {openMenuId === type.id_tipo && (
                                            <div className={styles.menu}>
                                                <button className={styles.menuItem}>Editar</button>
                                                <button className={styles.menuItem}>Excluir</button>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.typeName}>{type.nome_tipo}</div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>Nenhuma classificação encontrada.</p>
                                <p>{types.length}</p>
                            </div>
                        )}
                    </div>
                    <AddTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleCreateType} />
                </section>
            </main>
        </div>
    );
}

export default Classification;