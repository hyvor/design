import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		prerender: {
			entries: ['/', '*']
		}
	}
};

export default {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: mdsvex({ extensions: ['.svx', '.md'] }),
  config,
}

// export default config;
