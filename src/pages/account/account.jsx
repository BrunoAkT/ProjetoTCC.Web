import React, { useState } from 'react';
import styles from '../account/account.module.css';
import api from '../../constants/api';

function Account({ hideRegister }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const [confimarSenha, setConfirmPassword] = useState('');
    
    
    async function executeRegister(e) {
        if(senha !== confimarSenha){
            alert("As senhas não coincidem!");
            return;
        }
        e.preventDefault();
        try {
            const response = await api.post('/admin/register', {
                email,
                senha,
                nome
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('sessionToken')}` }
            });
            if (response.data) {
                console.log(response.data);
                alert('Cadastro realizado com sucesso!');
                hideRegister();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            alert(`Erro ao fazer login: ${errorMessage}`); 
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formPanel}>
                <h2 className={styles.formTitle}>Seja bem-vindo!</h2>
                <p>Por favor, entre as credenciais do Usuário.</p>
                <form className={styles.form} onSubmit={executeRegister}>
                    <input
                        type="text"
                        placeholder="Nome"
                        className={styles.input}
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                        required
                    />
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
                    <input
                        type="password"
                        placeholder="Confirme sua senha"
                        className={styles.input}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confimarSenha}
                        required
                    />
                    <button type="submit" className={styles.button} onClick={executeRegister}>
                        Cadastrar-se
                    </button>
                </form>
                
            </div>
        </div>
    );
}

export default Account;