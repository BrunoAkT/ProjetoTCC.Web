import { useEffect, useState } from 'react';
import styles from './data.module.css';
import api from '../../constants/api';
import { useNavigate } from 'react-router-dom';
import { IoMdTrash } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal.jsx';


function Data() {
    const [dataExercises, setDataExercises] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false); // Estado para o loading da deleção
    const [modalInfo, setModalInfo] = useState({
        isOpen: false,
        id: null,
        name: '',
    });


    const navigate = useNavigate()


    async function fetchData() {
        try {
            const response = await api.get('/exercises', {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                setDataExercises(response.data)
            }
        } catch (error) {
            alert("Erro ao buscar dados: " + error.message);
        }
    }

    function handleAddExercise() {
        navigate('/dataAdd')
    }

    function handleEditExercise(id) {
        navigate('/dataAdd', { state: { id } });
    }

    // Abre e configura o modal
    function openDeleteModal(id, name) {
        setModalInfo({ isOpen: true, id, name });
    }

    // Fecha o modal e reseta
    function closeDeleteModal() {
        setModalInfo({ isOpen: false, id: null, name: null });
    }

    async function handleDeleteExercise() {
        setIsDeleting(true); // Ativa o estado de carregamento

        try {
            const response = await api.delete(`/exercises/${modalInfo.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            fetchData(); // Recarrega os dados após a deleção
        } catch (error) {
            alert("Erro ao deletar exercício: " + error.message);
        } finally {
            setIsDeleting(false); // Desativa o carregamento
            closeDeleteModal();  // Fecha o modal
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Data</h1>
                </header>
                <section className={styles.dataSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Exercícios</h2>
                        <button className={styles.addButton} onClick={handleAddExercise}>Adicionar Exercício</button>
                    </div>
                    <div className={styles.dataList}>
                        {dataExercises.length > 0 ? (
                            dataExercises.map((exercise) => (
                                <div key={exercise.id} className={styles.dataItem}>
                                    <div className={styles.dataItemHeader}>
                                        <h3>{exercise.nome}</h3>
                                        <div>
                                            <IoIosCreate size={35} className={styles.Icon} onClick={() => handleEditExercise(exercise.id)} color='var(--color-green)' />
                                            <IoMdTrash size={35} className={styles.Icon} onClick={() => openDeleteModal(exercise.id, exercise.nome)} color='var(--color-red)' />
                                        </div>
                                    </div>
                                    <p>{exercise.descricao}</p>
                                    <p>Duração: {exercise.tempo} minutos</p>
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>Nenhum exercício encontrado.</p>
                                <p>{dataExercises.length}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <ConfirmDeleteModal
                isOpen={modalInfo.isOpen}
                itemName={modalInfo.name}
                onConfirm={handleDeleteExercise}
                onCancel={closeDeleteModal}
                isLoading={isDeleting} // Passa o estado de carregamento
            />
        </div>
    )
}

export default Data;