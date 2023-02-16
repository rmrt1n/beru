const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
				display: ['Clash Display', 'system-ui', 'sans-serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
