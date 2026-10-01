<script lang="ts">
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import Docs from '$lib/marketing/Docs/Docs.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { data } = $props();

	let title = $state('Hyvor Design System');

	onMount(() => {
		const unsubscribe = page.subscribe(() => {
			const h1 = document.querySelector('h1');
			if (h1 && h1.textContent) {
				title = h1.textContent + ' - HDS';
			}
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<header class="site-header">
	<nav class="hds-container-max">
		<a class="brand" href="/">
			<img src="https://hyvor.com/api/public/logo/core.svg" alt="" width="26" height="26" />
			<span><strong>HYVOR</strong> Design System</span>
		</a>
		<div class="links">
			<a href="https://hyvor.com" target="_blank">HYVOR</a>
			<a href="https://github.com/hyvor/design" target="_blank">
				<IconGithub size={14} />
				Github
				<IconBoxArrowUpRight size={11} />
			</a>
		</div>
	</nav>
</header>

<Docs {...data} />

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 100;
		height: var(--header-height);
		background: var(--background);
		border-bottom: 1px solid var(--border);
	}

	.site-header nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.links {
		display: flex;
		gap: 20px;
	}

	.links a {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
</style>
