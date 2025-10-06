import React, { useEffect, useState } from 'react';
import styles from './conditions.module.css';
import api from '../../constants/api';
import * as FaIcons from "react-icons/fa";
import AddConditionModal from '../../components/AddConditionModal.jsx';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.jsx';

function Conditions() {
    const [conditions, setConditions] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [infoModalDeleteInfo, setInfoModalDeleteInfo] = useState(
        {
            isOpen: false,
            id: null,
            name: '',
        }
    );
    function openDeleteModal(id, name) {
        setInfoModalDeleteInfo({ isOpen: true, id, name });
    }

    function closeDeleteModal() {
        setInfoModalDeleteInfo({ isOpen: false, id: null, name: null });
    }


    async function fetchConditions() {
        try {
            const response = await api.get('/conditions', {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                setConditions(response.data);
            }
        } catch (error) {
            alert("Erro ao buscar condições: " + error.message);
        }
    }

    useEffect(() => {
        fetchConditions();
    }, []);

    const [openMenuId, setOpenMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [conditionToEdit, setConditionToEdit] = useState(null);

    function toggleMenu(id) {
        setOpenMenuId(openMenuId === id ? null : id);
    }

    function handleEditCondition(id_condicao) {
        setConditionToEdit(id_condicao);
        setIsModalOpen(true);
    }

    async function handleSaveCondition(newCondition) {
        // Se estiver editando, faz update, senão cria
        if (conditionToEdit) {
            try {
                const payload = {
                    name: newCondition.nome,
                    desc: newCondition.desc,
                };
                console.log(payload)
                console.log("id ", newCondition.id)
                const response = await api.put(`/conditions/${newCondition.id}`, payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                });
                if (response && response.status >= 200 && response.status < 300) {
                    alert('Condição editada com sucesso!');
                    setIsModalOpen(false);
                    setConditionToEdit(null);
                    fetchConditions();
                } else {
                    alert('Não foi possível editar a condição.');
                }
            } catch (err) {
                alert('Erro ao editar condição: ' + (err.response?.data?.message || err.message));
            }
        } else {
            try {
                const payload = {
                    name: newCondition.nome,
                    desc: newCondition.desc,
                
                };
                const response = await api.post('/conditions', payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                });
                if (response && response.status >= 200 && response.status < 300) {
                    alert('Condição criada com sucesso!');
                    setIsModalOpen(false);
                    fetchConditions();
                } else {
                    alert('Não foi possível criar a condição.');
                }
            } catch (err) {
                alert('Erro ao criar condição: ' + (err.response?.data?.message || err.message));
            }
        }
    }


    async function handleDeleteCondition() {
        setIsDeleting(true); // Ativa o estado de carregamento

        try {
            const response = await api.delete(`/conditions/${infoModalDeleteInfo.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response && response.status >= 200 && response.status < 300) {
                alert('Condição deletada com sucesso!');
                fetchConditions();
            } else {
                console.error('Resposta inesperada ao deletar condição:', response);
                alert('Não foi possível deletar a condição. Verifique o console para mais detalhes.');
            }
        } catch (e) {
            alert('Erro ao deletar condição: ' + (e.response?.data?.message || e.message));
        } finally {
            setIsDeleting(false); // Desativa o carregamento
            closeDeleteModal();  // Fecha o modal
        }

    }
    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Condições Usuario</h1>
                </header>
                <section className={styles.dataSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Condições</h2>
                        <button className={styles.addButton} onClick={() => { setIsModalOpen(true); setConditionToEdit(null); }}>Adicionar Condição</button>
                    </div>
                    <div className={styles.grid}>
                        {conditions.length > 0 ? (
                            conditions.map((condition) => (
                                <div key={condition.id} className={styles.conditionCard}>
                                    <div className={styles.conditionIconWrap}>
                                        <span className={styles.conditionIconBg}>
                                            <FaIcons.FaHeartbeat size={30} color="#1f1f1fd2" />
                                        </span>

                                    </div>
                                    <button className={styles.moreBtn} onClick={() => toggleMenu(condition.id)} aria-label="Mais opções">⋮</button>
                                    {openMenuId === condition.id && (
                                        <div className={styles.menu}>
                                            <button className={styles.menuItem} onClick={() => handleEditCondition(condition.id)}>Editar</button>
                                                <button className={styles.menuItem} onClick={() => openDeleteModal(condition.id, condition.nome)}>Excluir</button>
                                        </div>
                                    )}
                                    <div className={styles.conditionInfo}>
                                        <div className={styles.conditionName}>{condition.nome}</div>
                                        <div className={styles.conditionDesc}>{condition.desc}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>Nenhuma condição encontrada.</p>
                                <p>{conditions.length}</p>
                            </div>
                        )}
                    </div>
                    <AddConditionModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setConditionToEdit(null); }} onSave={handleSaveCondition} conditionToEdit={conditionToEdit} />
                </section>
            </main>
            <ConfirmDeleteModal isOpen={infoModalDeleteInfo.isOpen}
                itemName={infoModalDeleteInfo.name}
                onConfirm={handleDeleteCondition}
                onCancel={closeDeleteModal}
                isLoading={isDeleting}
            />
        </div>
    );
}

export default Conditions;