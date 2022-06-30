import { useEffect, useState } from 'react';

const DARK_MODE_TOKEN_NAME = 'MW_Dark_Mode';

// ============================================================
// 			HOOK
// ============================================================
export const useDarkMode = () => {
	const [isDarkMode, setDarkMode] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		setDarkMode(document.documentElement.classList.contains('dark'));
	}, []);

	useEffect(() => {
		if (isDarkMode !== undefined) {
			if (isDarkMode) {
				document.documentElement.classList.add('dark');
				localStorage.setItem(DARK_MODE_TOKEN_NAME, 'true');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem(DARK_MODE_TOKEN_NAME, 'false');
			}
		}
	}, [isDarkMode]);

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	return [isDarkMode, toggleDarkMode] as const;
};

// ============================================================
// 			SCRIPT - INJECT INTO _document.tsx
// ============================================================
export const darkModeScript = `
if (
	localStorage.getItem('${DARK_MODE_TOKEN_NAME}') === 'true' ||
	(!('${DARK_MODE_TOKEN_NAME}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
	document.documentElement.classList.add('dark');
} else {
	document.documentElement.classList.remove('dark');
}`;
