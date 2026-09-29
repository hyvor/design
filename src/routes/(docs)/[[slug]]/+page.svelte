<script lang="ts">
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import Header from '$lib/marketing/Header/Header.svelte';
	import Docs from '$lib/marketing/Docs/Docs.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import HeaderNavLink from '$lib/marketing/Header/HeaderNavLink.svelte';

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

<Header product="core" name="HYVOR" subName="Design System" max={true}>
	{#snippet center()}
		<HeaderNavLink href="https://hyvor.com" target="_blank">HYVOR</HeaderNavLink>
		<HeaderNavLink href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}
				<IconGithub size={14} />
			{/snippet}
			Github
			{#snippet end()}
				<IconBoxArrowUpRight size={11} />
			{/snippet}
		</HeaderNavLink>
	{/snippet}
</Header>

<Docs {...data} />

