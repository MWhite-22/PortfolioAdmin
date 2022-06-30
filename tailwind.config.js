/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: 'var(--primaryColor)',
			},
			fontSize: {
				tiny: ['.5rem', { lineHeight: '.75rem' }],
			},
		},
	},
	plugins: [],
};
