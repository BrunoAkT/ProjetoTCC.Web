import React, { useState } from 'react';
import styles from '../account/account.module.css';

function Account({ hideRegister }) {
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    
    async function executeRegister() {
        console.log("Register function to be implemented");
    }
    return (
        <div className={styles.container}>
            <div className={styles.formPanel}>
                <h2 className={styles.formTitle}>Seja bem-vindo!</h2>
                <p>Por favor, entre com suas credenciais.</p>
                <form className={styles.form} onSubmit={executeRegister}>
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
                        onChange={(e) => setPassword(e.target.value)}
                        value={senha}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        Cadastrar-se
                    </button>
                </form>
                <div className={styles.containerfooter}>
                    <p className={styles.containerfootertext}>Já possui conta?</p>
                    <span onClick={hideRegister} className={styles.link}>
                        Faça login!
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Account;