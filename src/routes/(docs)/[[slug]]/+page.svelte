<script lang="ts">
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import Header from '$lib/marketing/Header/Header.svelte';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import FullDocs from '$lib/marketing/Docs/FullDocs.svelte';
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

<Header product="core" name="HYVOR" subName="Design System">
	{#snippet end()}
		<Button size="small" as="a" href="https://hyvor.com" variant="invisible">HYVOR</Button>
		<Button as="a" size="small" href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}
				<IconGithub size={14} />
			{/snippet}
			Github {#snippet end()}
				<IconBoxArrowUpRight size={11} />
			{/snippet}
		</Button>
	{/snippet}
</Header>

<FullDocs {...data} />

<Footer
	email="foss@hyvor.com"
	social={{
		youtube: undefined
	}}
></Footer>
