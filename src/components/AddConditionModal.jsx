import React, { useState, useEffect } from 'react';
import styles from './AddConditionModal.module.css';
import api from '../constants/api';

function AddConditionModal({ isOpen, onClose, onSave, conditionToEdit }) {
    const [nome, setNome] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {
        if (isOpen) {

            if (conditionToEdit) {
                async function fetchConditionDetails() {

                    try {
                        const response = await api.get(`/condition/${conditionToEdit}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                        });
                        if (response.data) {
                            setNome(response.data[0].nome || '');
                            setDesc(response.data[0].desc || '');
                        }
                    } catch (error) {
                        console.error("Erro ao buscar detalhes do tipo:", error);
                    }
                }

                fetchConditionDetails();
            } else {
                setNome('');
                setDesc('');
            }
        }
    }, [isOpen, conditionToEdit]);



    const handleSave = () => {
        const newCondition = {
            nome,
            desc,
            id: conditionToEdit
        };
        onSave(newCondition);
        setNome('');
        setDesc('');
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{conditionToEdit ? 'Editar Condição' : 'Adicionar Nova Condição'}</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    type="text"
                    placeholder="Descrição"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className={styles.inputDesc}
                />

                <div className={styles.modalActions}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleSave} className={styles.saveButton}>{conditionToEdit ? 'Salvar Alterações' : 'Salvar'}</button>
                </div>
            </div>
        </div>
    );
}

export default AddConditionModal;
