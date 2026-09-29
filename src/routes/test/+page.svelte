<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import HeaderNavLink from '$lib/marketing/Header/HeaderNavLink.svelte';
	import HeaderNavMenu from '$lib/marketing/Header/HeaderNavMenu.svelte';
	import HeaderLanguageToggle from '$lib/marketing/Header/HeaderLanguageToggle.svelte';
	import { buildLocalizedUrl } from '$lib/marketing/Header/language.js';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import IconPalette from '@hyvor/icons/IconPalette';
	import IconPuzzle from '@hyvor/icons/IconPuzzle';
	import { page } from '$app/stores';

	// --- Header ---

	const isThemesOrIntegrations = $derived(
		$page.url.pathname === '/themes' || $page.url.pathname.startsWith('/integrations')
	);

	const LANGUAGES = [
		{ code: 'en', flag: '🇬🇧', name: 'English' },
		{ code: 'fr', flag: '🇫🇷', name: 'Français' }
	];
	const DEFAULT_LANGUAGE = 'en';
	const currentLang = $derived(
		LANGUAGES.find((l) => l.code === $page.url.pathname.split('/')[1])?.code ?? DEFAULT_LANGUAGE
	);
</script>

<svelte:head>
	<title>Test Page - HDS</title>
</svelte:head>

<!-- Header -->
<Header product="relay" name="HYVOR" subName="Design System" max={true}>
	{#snippet center()}
		<HeaderNavLink href="#">Pricing</HeaderNavLink>
		<HeaderNavLink href="#" active={true}>Docs</HeaderNavLink>
		<HeaderNavLink href="#">Hosting</HeaderNavLink>

		<HeaderNavMenu label="Resources" active={isThemesOrIntegrations}>
			<HeaderNavLink href="#">
				{#snippet start()}<IconPalette size={15} />{/snippet}
				Themes
				{#snippet description()}Blog themes to match your brand{/snippet}
			</HeaderNavLink>
			<HeaderNavLink href="#">
				{#snippet start()}<IconPuzzle size={15} />{/snippet}
				Integrations
				{#snippet description()}Connect with your favorite tools{/snippet}
			</HeaderNavLink>
		</HeaderNavMenu>

		<HeaderNavLink href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}<IconGithub size={12} />{/snippet}
			Github
			{#snippet end()}<IconBoxArrowUpRight size={11} />{/snippet}
		</HeaderNavLink>

		<HeaderLanguageToggle
			languages={LANGUAGES}
			current={currentLang}
			href={(code) => buildLocalizedUrl($page.url.pathname, currentLang, code, DEFAULT_LANGUAGE)}
		/>
	{/snippet}
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

<Base>
	<div class="hds-container placeholder">
		<p>Scroll to see the header behaviour.</p>
	</div>
</Base>

<style>
	.placeholder {
		padding: 80px 15px;
		min-height: 200vh;
	}
</style>
