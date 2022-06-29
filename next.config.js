/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// swcMinify: true, // EXPERIMENTAL
	compiler: {
		// removeConsole: {	exclude: ['error'], },
	},
};

module.exports = nextConfig;
