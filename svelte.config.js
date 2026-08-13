import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { markdownPlugin } from './src/lib/components/markdown/markdown.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [markdownPlugin(), vitePreprocess()],

	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		prerender: {
			entries: ['/animation', '/', '*']
		}
	},

	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;
