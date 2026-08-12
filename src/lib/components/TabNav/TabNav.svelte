<script lang="ts">
	import { setContext } from 'svelte';
	import type { TabNavState } from './tabnav.js';

	type Props = (
		| {
				basePath?: undefined;
				pathname?: undefined;
				goto?: undefined;
		  }
		| {
				basePath: string;
				// SvelteKit's `page.url.pathname`, e.g. `import { page } from '$app/state'`.
				pathname: string;
				// SvelteKit's `goto`, e.g. `import { goto } from '$app/navigation'`.
				goto: (url: string, opts?: { replaceState?: boolean }) => void;
		  }
	) & {
		replaceState?: boolean;
		children?: import('svelte').Snippet;
	};

	let { children, basePath, replaceState = false, pathname: pathnameProp, goto }: Props = $props();

	let fallbackPathname = $state(typeof window !== 'undefined' ? window.location.pathname : '');

	$effect(() => {
		if (!basePath || pathnameProp !== undefined) return;

		const onPopState = () => {
			fallbackPathname = window.location.pathname;
		};
		window.addEventListener('popstate', onPopState);
		return () => window.removeEventListener('popstate', onPopState);
	});

	const tabNavState: TabNavState = {
		basePath,
		replaceState,
		goto,
		get pathname() {
			return pathnameProp ?? fallbackPathname;
		},
		set pathname(value: string) {
			fallbackPathname = value;
		}
	};

	setContext('tab-nav-state', tabNavState);
</script>

<div class="tab-nav">
	{@render children?.()}
</div>

<style>
	div {
		display: flex;
	}
</style>
