import { useEffect, useState } from 'react';
import styles from './dataAdd.module.css';
import { IoIosArrowBack } from "react-icons/io";

import api from '../../constants/api';
import { useLocation } from 'react-router-dom';
function DataAdd() {
    const [classificacoes, setClassificacoes] = useState({ id: null, nome: "" });

    const [options, setOptions] = useState([]);

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [duracao, setDuracao] = useState("");
    const [linkVideo, setLinkVideo] = useState("");
    const [audioFile, setAudioFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setImageFile(file); // Guarda o arquivo para enviar depois
            setPreview(URL.createObjectURL(file)); // Cria URL temporária para exibir
        }
    };

    async function handleAddExercise() {
        console.log({
            nome,
            descricao,
            duracao,
            linkVideo,
            audioFile,
            imageFile,
            classificacoes: classificacoes.id
        });

        if (!nome || !descricao || !duracao || !imageFile || !classificacoes?.id) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        const formData = new FormData();
        formData.append('name', nome);
        formData.append('description', descricao);
        formData.append('time', duracao);
        formData.append('video', linkVideo || '');
        formData.append('image', imageFile);
        formData.append('audio', audioFile || '');
        formData.append('type', classificacoes.id);

        try {
            const response = await api.post('/exercises', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                alert("Exercício adicionado com sucesso!");
                window.history.back();
            }
        } catch (error) {
            console.log("Erro ao adicionar exercício: " + error.message);
        }
    }
    async function handleEditExercise() {
        console.log({
            nome,
            descricao,
            duracao,
            linkVideo,
            audioFile,
            imageFile,
            classificacoes: classificacoes.id
        });

        if (!nome || !descricao || !duracao || !imageFile || !classificacoes?.id) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        const formData = new FormData();
        formData.append('name', nome);
        formData.append('description', descricao);
        formData.append('time', duracao);
        formData.append('video', linkVideo || '');
        
        if (imageFile instanceof File) {
            formData.append('image', imageFile);
        }
        if (audioFile instanceof File) {
            formData.append('audio', audioFile);
        }
        formData.append('type', classificacoes.id);

        try {
            const response = await api.put(`/exercises/${location.state.id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                alert("Exercício editado com sucesso!");
                window.history.back();
            }
        } catch (error) {
            console.log("Erro ao editar exercício: " + error.message);
        }
    }

    const location = useLocation();


    async function fetchData() {
        try {
            const response = await api.get(`/exercises/${location.state.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                console.log("Dados do exercício para edição:", response.data);
                setNome(response.data[0].nome || "");
                setDescricao(response.data[0].descricao || "");
                setDuracao(response.data[0].tempo || "");
                setLinkVideo(response.data[0].video || "");
                // Ensure classificacoes is an object with an `id` so the select's value matches
                setClassificacoes({ id: response.data[0].id_tipo_exercicio || null, nome: "" });
                setImageFile(`${api.defaults.baseURL}/uploads/${response.data[0].image || ""}`);
                setPreview(`${api.defaults.baseURL}/uploads/${response.data[0].image || ""}`);
                setAudioFile(`${api.defaults.baseURL}/uploads/${response.data[0].audio || ""}`); // Similar para áudio, se aplicável
            }
        } catch (error) {
            alert("Erro ao buscar dados: " + error.message);
        }
    }

    async function loadData() {
        try {
            const response = await api.get('/types', {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                // Ensure options is always an array before using .map()
                setOptions(Array.isArray(response.data) ? response.data : []);
                console.log("Tipos carregados:", response.data);
            }
        } catch (error) {
            alert("Erro ao buscar dados: " + error.message);
        }
    }
    useEffect(() => {
        loadData();
        if (location.state && location.state.id) {
            fetchData()
        }
    }, [])


    return (
        <div className={styles.mainContainer}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    {location.state && location.state.id ? <h1 className={styles.title}>Editar Exercício {location.state.id}</h1> : <h1 className={styles.title}>Adicionar Exercício</h1>}

                </header>
                <section className={styles.dataSection}>
                    <div className={styles.sectionHeader}>
                        <div style={{ cursor: "pointer" }} onClick={() => window.history.back()}>
                            <IoIosArrowBack size={45} />
                        </div>
                        <h2 className={styles.sectionTitle}>Exercício</h2>

                        {location.state && location.state.id ? <button className={styles.addButton} onClick={handleEditExercise}>Salvar</button> :
                            <button className={styles.addButton} onClick={handleAddExercise}>Adicionar</button>
                        }
                    </div>
                    <div className={styles.dataList}>
                        <p>Formulário para adicionar exercício</p>

                        <input type="text" placeholder="Nome (texto)" className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />

                        <textarea placeholder="Descrição (texto)" className={styles.inputDescription} value={descricao} onChange={(e) => setDescricao(e.target.value)} />

                        <input type="number" placeholder="Duração (minutos)" min="0" step="1" className={styles.input} value={duracao} onChange={(e) => setDuracao(e.target.value)} />

                        <div className={styles.fileInputContainer}>
                            <label className={styles.fileLabel}>
                                Selecionar imagem
                                <input
                                    type="file"
                                    accept="image/*"
                                    className={styles.input}
                                    onChange={handleImageChange}
                                />
                            </label>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className={styles.imagePreview}
                                />
                            )}
                        </div>
                        <input type="url" placeholder="Link do vídeo (URL)" className={styles.input} value={linkVideo} onChange={(e) => setLinkVideo(e.target.value)} />

                        <div className={styles.fileInputContainer}>
                            <label className={styles.fileLabel}> Selecionar áudio
                                <input type="file" accept='audio/*' className={styles.input} onChange={(e) => setAudioFile(e.target.files[0])} />
                            </label>
                        </div>
                        {audioFile && (
                            <audio
                                controls
                                src={audioFile instanceof File ? URL.createObjectURL(audioFile) : audioFile}
                                style={{ width: "100%" }}
                            >
                                Seu navegador não suporta áudio.
                            </audio>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label htmlFor="classificacao">Classificação do exercício:</label>
                            <select
                                id="classificacao"
                                className={styles.select}
                                value={classificacoes.id || ""}
                                onChange={(e) => {
                                    const selectedId = parseInt(e.target.value, 10);
                                    const selectedOption = options.find(opt => opt.id_tipo === selectedId);

                                    if (selectedOption) {
                                        setClassificacoes({
                                            id: selectedOption.id_tipo,
                                            nome: selectedOption.nome_tipo,
                                        });
                                    }
                                }}
                            >
                                <option value="" disabled>Selecione uma classificação</option>
                                {options.map((option) => (
                                    <option key={option.id_tipo} value={option.id_tipo}>
                                        {option.nome_tipo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default DataAdd;