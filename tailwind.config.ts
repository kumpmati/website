import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#5F481E',
				secondary: '#D8B067',
				bg: '#FAF9F3',
				card: '#FFF4DF'
			},

			fontFamily: {
				heading: ['Kalam', 'sans-serif'],
				body: ['Kadwa', 'serif']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
