/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: ({ colors }) => ({
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				body: {
					light: colors.slate['50'],
					dark: colors.slate['900'],
				},
				text: {
					light: colors.zinc['900'],
					dark: colors.zinc['100'],
				},
			}),
			fontSize: {
				xxs: ['.5rem', { lineHeight: '.75rem' }],
			},
		},
	},
	plugins: [],
};
