import React from 'react';
import styles from '../account/account.module.css';

// The hideRegister function is passed as a prop
function Account({ hideRegister }) {
    return (
        <div className={styles.container}>
            <h2>Criar Conta</h2>
            {/* Add your registration form fields here */}
            <p>Formulário de cadastro...</p>

            {/* Button to close the sliding panel */}
            <button onClick={hideRegister} className={styles.closeButton}>
                Fechar
            </button>
        </div>
    );
}

export default Account;