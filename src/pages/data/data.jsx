import { useEffect, useState } from 'react';
import styles from './data.module.css';
import api from '../../constants/api';
import { useNavigate } from 'react-router-dom';
function Data() {
    const [dataExercises, setDataExercises] = useState([]);
    const navigate = useNavigate()

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU1NzA3MTQyLCJleHAiOjE3NjU3MDcxNDF9.aLS0bnVuFFGa2I51UjhgtESKNZhod9y3AOvvsG4lSuA"

    async function fetchData() {
        try {
            const response = await api.get('/exercises', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data) {
                console.log(response.data)
                setDataExercises(response.data)
            }
        } catch (error) {
            alert("Erro ao buscar dados: " + error.message);
        }
    }

    function handleAddExercise() {
        navigate('/dataAdd')
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
                                    <h3>{exercise.nome}</h3>
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
        </div>
    )
}

export default Data;