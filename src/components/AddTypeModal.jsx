import React, { useState, useEffect } from 'react';
import styles from './AddTypeModal.module.css';
import api from '../constants/api';
import * as FaIcons from "react-icons/fa";

function AddTypeModal({ isOpen, onClose, onSave, typeToEdit }) {
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
            if (typeToEdit) {
                async function fetchTypeDetails() {

                    try {
                        const response = await api.get(`/types/${typeToEdit}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                        });
                        if (response.data) {
                            setNome(response.data[0].nome_tipo || '');
                            setIcone(response.data[0].icon || '');
                        }
                    } catch (error) {
                        console.error("Erro ao buscar detalhes do tipo:", error);
                    }
                }
                async function fetchTypeConditions() {
                    try {
                        const response = await api.get(`/types/restrictions/${typeToEdit}`, {
                            headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
                        });
                        if (response.data) {
                            console.log("Condições incapacitantes do tipo:", response.data);
                            setSelectedConditions(response.data.conditions ? response.data.conditions.map(c => c.id) : []);
                        }
                    } catch (error) {
                        console.error("Erro ao buscar condições do tipo:", error);
                    }
                }
                fetchTypeDetails();
                fetchTypeConditions();
            } else {
                setNome('');
                setIcone('');
                setSelectedConditions([]);
            }
        }
    }, [isOpen, typeToEdit]);

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
        setNome('');
        setIcone('');
        setSelectedConditions([]);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{typeToEdit ? 'Editar Classificação' : 'Adicionar Nova Classificação'}</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className={styles.input}
                />
                <p>Insira por icones da biblioteca: <a href={"https://react-icons.github.io/react-icons/icons/fa"} target="_blank" rel="noopener noreferrer">Font Awesome</a></p>
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
                    <button onClick={handleSave} className={styles.saveButton}>{typeToEdit ? 'Salvar Alterações' : 'Salvar'}</button>
                </div>
            </div>
        </div>
    );
}

export default AddTypeModal;
