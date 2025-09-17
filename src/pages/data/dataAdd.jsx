import { useEffect, useState } from 'react';
import styles from './dataAdd.module.css';
import api from '../../constants/api';
function DataAdd() {
    const [dataExercises, setDataExercises] = useState([]);

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU1NzA3MTQyLCJleHAiOjE3NjU3MDcxNDF9.aLS0bnVuFFGa2I51UjhgtESKNZhod9y3AOvvsG4lSuA"

    // async function fetchData() {
    //     try {
    //         const response = await api.get('/exercises', {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         if (response.data) {
    //             console.log(response.data)
    //             setDataExercises(response.data)
    //         }
    //     } catch (error) {
    //         alert("Erro ao buscar dados: " + error.message);
    //     }
    // }
    // useEffect(() => {
    //     fetchData()
    // }, [])

    const [imageName, setImageName] = useState("");
    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Adicionar Exercício</h1>
                </header>
                <section className={styles.dataSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Exercício</h2>
                        <button className={styles.addButton}>Adicionar</button>
                    </div>
                    <div className={styles.dataList}>
                        <p>Formulário para adicionar exercício</p>
                        <input type="text" placeholder="Nome (texto)" className={styles.input} />
                        <textarea placeholder="Descrição (texto)" className={styles.inputDescription} />
                        <input type="number" placeholder="Duração (minutos)" min="0" step="1" className={styles.input} />
                        <div>
                            <label className={styles.fileLabel}>
                                Selecionar imagem
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.input}
                                    onChange={e => setImageName(e.target.files[0]?.name || "")}
                                />
                            </label>
                            {imageName && <span className={styles.fileName}>{imageName}</span>}
                        </div>
                        <input type="url" placeholder="Link do vídeo (URL)" className={styles.input} />
                        <input type="url" placeholder="Link do áudio (URL)" className={styles.input} />
                        <input type="text" placeholder="Tipo (classificação)" className={styles.input} />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default DataAdd;