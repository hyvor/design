<script lang="ts">
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import IconGithub from '@hyvor/icons/IconGithub';
	import Header from '$lib/marketing/Header/Header.svelte';
	import Footer from '$lib/marketing/Footer/Footer.svelte';
	import FooterLinkList from '$lib/marketing/Footer/FooterLinkList.svelte';
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

<Header product="core" name="HYVOR" subName="Design System" max={true}>
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

<Docs {...data} />

<Footer
	product="core"
	subname="Design System"
	background="#ececec"
	backgroundDark="#1c1c1c"
	email="foss@hyvor.com"
	social={{
		youtube: undefined
	}}
	max={true}
>
	{#snippet center()}
		<div class="footer-columns">
			<FooterLinkList title="Products">
				<a href="https://talk.hyvor.com" target="_blank">Hyvor Talk</a>
				<a href="https://blogs.hyvor.com" target="_blank">Hyvor Blogs</a>
				<a href="https://post.hyvor.com" target="_blank">Hyvor Post</a>
				<a href="https://fortguard.io" target="_blank">Fortguard</a>
			</FooterLinkList>

			<FooterLinkList title="Legal">
				<a href="https://hyvor.com/terms" target="_blank">Terms of Service</a>
				<a href="https://hyvor.com/privacy" target="_blank">Privacy Policy</a>
				<a href="https://hyvor.com/sub" target="_blank">Sub-Processors</a>
				<a href="https://hyvor.com/compliance" target="_blank">Compliance (GDPR)</a>
				<a href="https://hyvor.com/compliance#dpa" target="_blank">DPA</a>
			</FooterLinkList>

			<FooterLinkList title="HYVOR">
				<a href="https://hyvor.com/enterprise" target="_blank">Enterprise</a>
				<a href="https://hyvor.com/support" target="_blank">Support</a>
				<a href="https://hyvor.com/security" target="_blank">Security</a>
				<a href="https://hyvor.com/updates" target="_blank">Updates</a>
				<a href="https://status.hyvor.com" target="_blank">Status</a>
			</FooterLinkList>

			<FooterLinkList title="Resources">
				<a href="https://hyvor.com/docs" target="_blank">Docs</a>
				<a href="https://hyvor.com/blog" target="_blank">Blog</a>
				<a href="https://hyvor.com/compare" target="_blank">Comparisons</a>
				<a href="https://hyvor.community" target="_blank">Community</a>
			</FooterLinkList>
		</div>
	{/snippet}
</Footer>

<style>
	.footer-columns {
		display: flex;
		flex-wrap: wrap;
		gap: 32px;
	}

	@media screen and (max-width: 560px) {
		.footer-columns {
			flex-direction: column;
			gap: 24px;
		}
	}
</style>
