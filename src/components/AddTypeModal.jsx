import React, { useState, useEffect } from 'react';
import styles from './AddTypeModal.module.css';
import api from '../constants/api';
import * as FaIcons from "react-icons/fa";

function AddTypeModal({ isOpen, onClose, onSave }) {
    const [nome, setNome] = useState('');
    const [icone, setIcone] = useState('');
    const [conditions, setConditions] = useState([]);
    const [selectedConditions, setSelectedConditions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            async function fetchConditions() {
                try {
                    const response = await api.get('/conditions', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                    });
                    if (response.data) {
                        setConditions(response.data);
                    }
                } catch (error) {
                    console.error("Erro ao buscar condições:", error);
                }
            }
            fetchConditions();
        }
    }, [isOpen]);

    const handleCheckboxChange = (conditionId) => {
        setSelectedConditions(prev =>
            prev.includes(conditionId)
                ? prev.filter(id => id !== conditionId)
                : [...prev, conditionId]
        );
    };

    const handleSave = () => {
        const newType = {
            nome,
            icone,
            incapableConditions: selectedConditions
        };
        onSave(newType);
        // Reset state
        setNome('');
        setIcone('');
        setSelectedConditions([]);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Adicionar Novo Tipo</h2>
                <input
                    type="text"
                    placeholder="Nome do tipo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Ícone (ex: FaHeart)"
                    value={icone}
                    onChange={(e) => setIcone(e.target.value)}
                    className={styles.input}
                />
                <div className={styles.conditionsList}>
                    <h3>Condições Incapacitantes:</h3>
                    {conditions.map(condition => (
                        <div key={condition.id} className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                id={`cond-${condition.id}`}
                                checked={selectedConditions.includes(condition.id)}
                                onChange={() => handleCheckboxChange(condition.id)}
                                className={styles.checkboxInput}
                            />
                            <label htmlFor={`cond-${condition.id}`}>{condition.nome}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.modalActions}>
                    <button onClick={onClose} className={styles.cancelButton}>Cancelar</button>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default AddTypeModal;
