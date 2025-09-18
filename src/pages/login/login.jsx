import React, { useState, useContext } from 'react';
import styles from './login.module.css';
import icon from '../../constants/icon.js';
import Account from '../account/account.jsx';
import api from '../../constants/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const navigate = useNavigate();

    const showRegister = () => setIsRegisterVisible(true);
    const hideRegister = () => setIsRegisterVisible(false);

    async function executeLogin(e) {
        e.preventDefault();
        try {

            const response = await api.post('/admin/login', {
                email,
                senha
            });
            if (response.data) {
                console.log(response.data);
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem('sessionID', response.data.id_admin);
                localStorage.setItem('sessionEmail', response.data.email);
                localStorage.setItem('sessionName', response.data.nome);
                console.log("--------------------", response.data);
                console.log(localStorage.getItem("sessionToken"));
                window.location.href = '/';

            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            alert(`Erro ao fazer login: ${errorMessage}`); // window.alert is the web equivalent
        }
    }

    return (
        <div className={styles.mainContainer}>
            {/* LADO ESQUERDO PARA BRANDING */}
            <div className={styles.brandingSide}>
                <h1 className={styles.title}>PROJETONOME</h1>
                <img src={icon.logo} alt="Logo" className={styles.logo} />
            </div>

            {/* LADO DIREITO PARA O FORMULÁRIO */}
            <div className={styles.loginSide}>
                <div className={styles.formPanel}>
                    <h2 className={styles.formTitle}>Bem-vindo de volta!</h2>
                    <form className={styles.form} onSubmit={executeLogin}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className={styles.input}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.input}
                            onChange={(e) => setPassword(e.target.value)}
                            value={senha}
                            required
                        />
                        <button type="submit" className={styles.button}>
                            Entrar
                        </button>
                    </form>
                    <div className={styles.containerfooter}>
                        <p className={styles.containerfootertext}>Não possui conta?</p>
                        <span onClick={showRegister} className={styles.link}>
                            Cadastre-se!
                        </span>
                    </div>
                </div>
            </div>

            {/* Painel de Cadastro animado */}
            <div className={`${styles.animatedContainer} ${isRegisterVisible ? styles.visible : ''}`}>
                <Account hideRegister={hideRegister} />
            </div>
        </div>
    );
}

export default Login;