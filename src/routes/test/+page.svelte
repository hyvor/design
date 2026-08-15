<script lang="ts">
	import Base from '$lib/components/Base/Base.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import HeaderNavLink from '$lib/marketing/Header/HeaderNavLink.svelte';
	import Button from '../../lib/components/Button/Button.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import FooterLinkList from '$lib/marketing/Footer/FooterLinkList.svelte';
	import { page } from '$app/stores';

	let resourcesOpen = $state(false);

	const isThemesOrIntegrations = $derived(
		$page.url.pathname === '/themes' || $page.url.pathname.startsWith('/integrations')
	);

	function closeOnLinkClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'A' || target.closest('a')) {
			resourcesOpen = false;
		}
	}
</script>

<svelte:head>
	<title>Test Page - HDS</title>
</svelte:head>

<Header product="relay" name="HYVOR" subName="Design System" max={true}>
	{#snippet center()}
		<HeaderNavLink href="/pricing" active={$page.url.pathname === '/pricing'}>
			Pricing
		</HeaderNavLink>
		<HeaderNavLink href="/test" active={$page.url.pathname === '/test'}>Docs</HeaderNavLink>
		<HeaderNavLink href="/hosting" active={$page.url.pathname.startsWith('/hosting')}>
			Hosting
		</HeaderNavLink>

		<Dropdown bind:show={resourcesOpen} contentPadding={8}>
			{#snippet trigger()}
				<HeaderNavLink active={isThemesOrIntegrations}>
					Resources
					{#snippet end()}<IconCaretDown size={11} />{/snippet}
				</HeaderNavLink>
			{/snippet}
			{#snippet content()}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<div onclick={closeOnLinkClick}>
					<HeaderNavLink href="/themes" menu active={$page.url.pathname === '/themes'}>
						Themes
					</HeaderNavLink>
					<HeaderNavLink
						href="/integrations"
						menu
						active={$page.url.pathname.startsWith('/integrations')}
					>
						Integrations
					</HeaderNavLink>
				</div>
			{/snippet}
		</Dropdown>

		<HeaderNavLink href="https://github.com/hyvor/design" target="_blank">
			{#snippet start()}<IconGithub size={12} />{/snippet}
			Github
			{#snippet end()}<IconBoxArrowUpRight size={11} />{/snippet}
		</HeaderNavLink>
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
	<div class="hds-container-max demo-spacer">
		<h1>This is a test page</h1>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo <consequat class=""> </consequat>
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
			nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
			mollit anim id est laborum.
		</p>
	</div>
</Base>

<Footer
	name="Hyvor Talk"
	logo="/favicon.svg"
	background="#574443"
	email="talk.support@hyvor.com"
	max={true}
>
	{#snippet center()}
		<div class="footer-wrap">
			<div style="display:flex" class="footer">
				<FooterLinkList title="HYVOR TALK">
					<a href="/console">Console</a>
					<a href="/pricing">Pricing</a>
					<a href="/docs">Docs</a>
				</FooterLinkList>

				<FooterLinkList title="LEGAL">
					<a href="/terms">Terms</a>
					<a href="/privacy">Privacy Policy</a>
					<a href="https://hyvor.com/compliance" target="_blank">Compliance</a>
				</FooterLinkList>

				<FooterLinkList title="HYVOR">
					<a href="https://hyvor.com" target="_blank">hyvor.com</a>
					<a href="https://hyvor.com/#letter" target="_blank">About</a>
					<a href="https://hyvor.com/security" target="_blank">Security</a>
					<a href="https://status.hyvor.com/" target="_blank">System status</a>
					<a href="https://hyvor.com/blog" target="_blank">Blog</a>
				</FooterLinkList>

				<FooterLinkList title="RESOURCES">
					<a href="/blog">Blog</a>
					<a href="/docs">Documentation</a>
					<a href="https://hyvor.design" target="_blank">Design System</a>
				</FooterLinkList>
			</div>
		</div>
	{/snippet}
</Footer>

<style lang="scss">
	// media queries
	@media (max-width: 768px) {
		.footer-wrap {
			padding: 20px;
		}
		.footer {
			flex-direction: column;
			gap: 20px;
		}
	}

	.demo-spacer {
		height: 5000px;
		padding: 100px 0;
	}
</style>
