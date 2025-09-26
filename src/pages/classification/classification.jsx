import React, { useEffect, useState } from 'react';
import styles from './classification.module.css';
import api from '../../constants/api';
import * as FaIcons from "react-icons/fa";
import AddTypeModal from '../../components/AddTypeModal.jsx';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.jsx';

function Classification() {
    const [types, setTypes] = useState([]);
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
    const [typeToEdit, setTypeToEdit] = useState(null);

    function toggleMenu(id) {
        setOpenMenuId(openMenuId === id ? null : id);
    }

    function handleEditType(id_tipo) {
        setTypeToEdit(id_tipo);
        setIsModalOpen(true);
    }

    async function handleSaveType(newType) {
        // Se estiver editando, faz update, senão cria
        if (typeToEdit) {
            try {
                const payload = {
                    name: newType.nome,
                    icon: newType.icone,
                    conditions: newType.incapableConditions || []
                };
                const response = await api.put(`/types/${typeToEdit.id_tipo}`, payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                });
                if (response && response.status >= 200 && response.status < 300) {
                    alert('Tipo editado com sucesso!');
                    setIsModalOpen(false);
                    setTypeToEdit(null);
                    fetchTypes();
                } else {
                    alert('Não foi possível editar o tipo.');
                }
            } catch (err) {
                alert('Erro ao editar tipo: ' + (err.response?.data?.message || err.message));
            }
        } else {
            try {
                const payload = {
                    name: newType.nome,
                    icon: newType.icone,
                    conditions: newType.incapableConditions || []
                };
                const response = await api.post('/types', payload, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                });
                if (response && response.status >= 200 && response.status < 300) {
                    alert('Tipo criado com sucesso!');
                    setIsModalOpen(false);
                    fetchTypes();
                } else {
                    alert('Não foi possível criar o tipo.');
                }
            } catch (err) {
                alert('Erro ao criar tipo: ' + (err.response?.data?.message || err.message));
            }
        }
    }

    async function handleDeleteType() {
        setIsDeleting(true); // Ativa o estado de carregamento

        try {
            const response = await api.delete(`/types/${infoModalDeleteInfo.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response && response.status >= 200 && response.status < 300) {
                alert('Tipo deletado com sucesso!');
                fetchTypes();
            } else {
                console.error('Resposta inesperada ao deletar tipo:', response);
                alert('Não foi possível deletar o tipo. Verifique o console para mais detalhes.');
            }
        } catch (e) {
            alert('Erro ao deletar tipo: ' + (e.response?.data?.message || e.message));
        } finally {
            setIsDeleting(false); // Desativa o carregamento
            closeDeleteModal();  // Fecha o modal
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
                        <button className={styles.addButton} onClick={() => { setIsModalOpen(true); setTypeToEdit(null); }}>Adicionar Tipo</button>
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
                                                <button className={styles.menuItem} onClick={() => handleEditType(type.id_tipo)}>Editar</button>
                                                <button className={styles.menuItem} onClick={() => openDeleteModal(type.id_tipo, type.nome_tipo)}>Excluir</button>
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
                    <AddTypeModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setTypeToEdit(null); }} onSave={handleSaveType} typeToEdit={typeToEdit} />
                </section>
            </main>
            <ConfirmDeleteModal isOpen={infoModalDeleteInfo.isOpen}
                itemName={infoModalDeleteInfo.name}
                onConfirm={handleDeleteType}
                onCancel={closeDeleteModal}
                isLoading={isDeleting}
            />
        </div>
    );
}

export default Classification;