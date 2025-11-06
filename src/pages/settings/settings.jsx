import React, { useEffect, useMemo, useState } from 'react';
import styles from './settings.module.css';

function Settings() {
	// Profile state
	const [name, setName] = useState(localStorage.getItem('sessionName') || '');
	const [email, setEmail] = useState(localStorage.getItem('sessionEmail') || '');
	const [isEditingProfile, setIsEditingProfile] = useState(false);

	// Security state
	const [currentPwd, setCurrentPwd] = useState('');
	const [newPwd, setNewPwd] = useState('');
	const [confirmPwd, setConfirmPwd] = useState('');

	// Appearance state
	const savedTheme = useMemo(() => localStorage.getItem('appTheme') || 'light', []);
	const [theme, setTheme] = useState(savedTheme);

	useEffect(() => {
		// Apply theme by changing root CSS variables dynamically
		const root = document.documentElement;
		const palettes = {
			light: {
				'--color-background': '#D9D9D9',
				'--color-panel': '#FFFFFF',
				'--color-primary-text': '#404040',
				'--color-secondary-text': '#404040',
				'--color-input-border': '#D9D9D9',
				'--color-primary-button': '#81C784',
				'--color-primary-button-hover': '#6aa86d',
				'--color-link': '#4CB7B3',
			},
			dark: {
				'--color-background': '#2c2c2cff',
				'--color-panel': '#000000ff',
				'--color-primary-text': '#e5e7eb',
				'--color-secondary-text': '#cbd5e1',
				'--color-input-border': '#374151',
				'--color-primary-button': '#10b981',
				'--color-primary-button-hover': '#0e9f79',
				'--color-link': '#22d3ee',
			},
		};
		const palette = palettes[theme] || palettes.light;
		Object.entries(palette).forEach(([k, v]) => root.style.setProperty(k, v));
		localStorage.setItem('appTheme', theme);
	}, [theme]);

	function handleSaveProfile(e) {
		e.preventDefault();
		// Minimal local persistence; backend integration can be added later
		localStorage.setItem('sessionName', name);
		localStorage.setItem('sessionEmail', email);
		alert('Perfil atualizado. Algumas áreas podem refletir após recarregar.');
		setIsEditingProfile(false);
	}

	function handleChangePassword(e) {
		e.preventDefault();
		if (!currentPwd || !newPwd || !confirmPwd) {
			alert('Preencha todos os campos.');
			return;
		}
		if (newPwd !== confirmPwd) {
			alert('A confirmação de senha não confere.');
			return;
		}
		// TODO: integrar com backend (ex.: PUT /admin/password)
		alert('Requisição de troca de senha enviada (mock).');
		setCurrentPwd('');
		setNewPwd('');
		setConfirmPwd('');
	}

	return (
		<div className={styles.mainContainer}>
			<main className={styles.mainContent}>
				<header className={styles.header}>
					<h1 className={styles.title}>Configurações</h1>
					<p className={styles.subtitle}>Gerencie seu perfil, segurança e aparência do app.</p>
				</header>

				<section className={styles.grid}>
					{/* Perfil */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>
							<h2 className={styles.cardTitle}>Meu Perfil</h2>
							{!isEditingProfile ? (
								<button className={styles.secondaryBtn} onClick={() => setIsEditingProfile(true)}>Editar</button>
							) : null}
						</div>
						<form className={styles.form} onSubmit={handleSaveProfile}>
							<label className={styles.label}>
								Nome
								<input
									type="text"
									className={styles.input}
									value={name}
									onChange={(e) => setName(e.target.value)}
									disabled={!isEditingProfile}
								/>
							</label>
							<label className={styles.label}>
								E-mail
								<input
									type="email"
									className={styles.input}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={!isEditingProfile}
								/>
							</label>
							{isEditingProfile && (
								<div className={styles.actions}>
									<button type="button" className={styles.ghostBtn} onClick={() => { setIsEditingProfile(false); setName(localStorage.getItem('sessionName') || ''); setEmail(localStorage.getItem('sessionEmail') || ''); }}>Cancelar</button>
									<button type="submit" className={styles.primaryBtn}>Salvar</button>
								</div>
							)}
						</form>
					</div>

					{/* Segurança */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>
							<h2 className={styles.cardTitle}>Segurança</h2>
						</div>
						<form className={styles.form} onSubmit={handleChangePassword}>
							<label className={styles.label}>
								Senha atual
								<input
									type="password"
									className={styles.input}
									value={currentPwd}
									onChange={(e) => setCurrentPwd(e.target.value)}
								/>
							</label>
							<label className={styles.label}>
								Nova senha
								<input
									type="password"
									className={styles.input}
									value={newPwd}
									onChange={(e) => setNewPwd(e.target.value)}
								/>
							</label>
							<label className={styles.label}>
								Confirmar nova senha
								<input
									type="password"
									className={styles.input}
									value={confirmPwd}
									onChange={(e) => setConfirmPwd(e.target.value)}
								/>
							</label>
							<div className={styles.actions}>
								<button type="submit" className={styles.primaryBtn}>Alterar senha</button>
							</div>
						</form>
					</div>

					{/* Aparência */}
					<div className={styles.card}>
						<div className={styles.cardHeader}>
							<h2 className={styles.cardTitle}>Aparência</h2>
						</div>
						<div className={styles.form}>
							<div className={styles.inlineRow}>
								<span>Tema</span>
								<div className={styles.themeToggle}>
									<button
										className={`${styles.toggleBtn} ${theme === 'light' ? styles.active : ''}`}
										onClick={() => setTheme('light')}
										aria-pressed={theme === 'light'}
										type="button"
									>
										Claro
									</button>
									<button
										className={`${styles.toggleBtn} ${theme === 'dark' ? styles.active : ''}`}
										onClick={() => setTheme('dark')}
										aria-pressed={theme === 'dark'}
										type="button"
									>
										Escuro
									</button>
								</div>
							</div>
							<p className={styles.helperText}>A preferência de tema é salva no dispositivo e aplicada em todo o app.</p>
						</div>
					</div>

				</section>
			</main>
		</div>
	);
}

export default Settings;
