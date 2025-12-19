<script>
	import Base from '$lib/components/Base/Base.svelte';
	import Header from '$lib/marketing/Header/Header.svelte';
	import Button from '../../lib/components/Button/Button.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import FooterLinkList from '$lib/marketing/Footer/FooterLinkList.svelte';
</script>

<svelte:head>
	<title>Test Page - HDS</title>
</svelte:head>

<Header product="relay" name="HYVOR" subName="Design System" max={true}>
	{#snippet center()}
		<!-- Center content can go here -->
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
	<div class="hds-container-max">
		<h1>This is a test page</h1>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
			incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
			exercitation ullamco laboris nisi ut aliquip ex ea commodo <consequat class="">
			</consequat>
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
			fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
			deserunt mollit anim id est laborum.
		</p>
	</div>
</Base>

<Footer email="talk.support@hyvor.com" max={true}>
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

	div {
		height: 5000px;
		padding: 100px 0;
	}
</style>
