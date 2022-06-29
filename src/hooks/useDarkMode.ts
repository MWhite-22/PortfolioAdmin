import { useEffect, useState } from 'react';

export const useDarkMode = () => {
	const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		setDarkMode(document.documentElement.classList.contains('dark'));
	}, []);

	useEffect(() => {
		if (darkMode !== undefined) {
			if (darkMode) {
				document.documentElement.classList.add('dark');
				localStorage.setItem('MW_DarkMode', 'true');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('MW_DarkMode', 'false');
			}
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return [darkMode, toggleDarkMode] as const;
};
