import { useEffect } from 'react';
import styles from './ConfirmDeleteModal.module.css'; // Usaremos CSS Modules
import { IoWarningOutline } from "react-icons/io5"; // Ícone de alerta

export default function ConfirmDeleteModal({
    isOpen,
    onConfirm,
    onCancel,
    itemName = 'este item',
    title = 'Tem certeza que deseja deletar?',
    confirmLabel = 'Deletar',
    cancelLabel = 'Cancelar',
    isLoading = false, // Nova prop para o estado de carregamento
}) {
    // Efeito para fechar o modal com a tecla 'Escape'
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onCancel();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        // Limpa o event listener quando o componente é desmontado ou o modal fecha
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    return (
        // Adicionando atributos de acessibilidade (role, aria-modal)
        <div 
            className={styles.modalOverlay} 
            onClick={onCancel} 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div className={styles.modalIcon}>
                    <IoWarningOutline size={48} color='var(--color-red, #e3342f)' />
                </div>
                
                <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
                <p className={styles.modalText}>
                    Esta ação é irreversível. Você realmente deseja deletar <strong>{itemName}</strong>?
                </p>

                <div className={styles.modalButtons}>
                    <button 
                        className={styles.btnCancel} 
                        onClick={onCancel}
                        disabled={isLoading} // Desabilita enquanto carrega
                    >
                        {cancelLabel}
                    </button>
                    <button 
                        className={styles.btnConfirm} 
                        onClick={onConfirm}
                        disabled={isLoading} // Desabilita enquanto carrega
                    >
                        {isLoading ? <div className={styles.spinner}></div> : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}