<script lang="ts">
	import Container from '$lib/marketing/Container/Container.svelte';
	import IconCopy from '@hyvor/icons/IconCopy';
	import IconDiscord from '@hyvor/icons/IconDiscord';
	import IconEnvelope from '@hyvor/icons/IconEnvelope';
	import IconGithub from '@hyvor/icons/IconGithub';
	import IconLinkedin from '@hyvor/icons/IconLinkedin';
	import IconTwitterX from '@hyvor/icons/IconTwitterX';
	import IconYoutube from '@hyvor/icons/IconYoutube';
	import Link from '../../components/Link/Link.svelte';
	import IconButton from '../../components/IconButton/IconButton.svelte';
	import Tooltip from '../../components/Tooltip/Tooltip.svelte';
	import LanguageToggle from '$lib/components/Internationalization/LanguageToggle.svelte';
	import IconBluesky from '@hyvor/icons/IconBluesky';
	import { SOCIAL_LINKS, type Socials } from '../social.js';
	import Affiliate from '../Affiliate/Affiliate.svelte';

	const year = new Date().getFullYear();

	interface Props {
		email?: string | null;
		social?: Partial<Socials>;
		center?: import('svelte').Snippet;
		affiliate?: boolean;
	}

	let {
		email = null,
		social = $bindable({} as Record<string, string | null>),
		center,
		affiliate = true
	}: Props = $props();

	social = {
		...SOCIAL_LINKS,
		...social
	};

	let emailCopied = $state(false);

	function handleCopy() {
		navigator.clipboard.writeText(email!);
		emailCopied = true;
		setTimeout(() => {
			emailCopied = false;
		}, 1000);
	}
</script>

<footer>
	<Container>
		<div class="footer-top">
			<div class="footer-top-left">
				{#if email}
					<div class="email-wrap">
						<Link href="mailto:{email}" underline={false} color="text" rel="nofollow">
							{#snippet start()}
								<IconEnvelope />
							{/snippet}
							{email}
						</Link>
						<Tooltip text={emailCopied ? 'Copied!' : 'Copy email'} position="top">
							<IconButton
								size="small"
								variant="invisible"
								on:click={handleCopy}
								on:mouseleave={() => (emailCopied = false)}
							>
								<IconCopy size={12} />
							</IconButton>
						</Tooltip>
					</div>
				{/if}

				<div class="social-media">
					{#if social.github}
						<a href={social.github} target="_blank" rel="nofollow"><IconGithub /></a>
					{/if}
					{#if social.discord}
						<a href={social.discord} target="_blank" rel="nofollow"><IconDiscord /></a>
					{/if}
					{#if social.blueksy}
						<a href={social.blueksy} target="_blank" rel="nofollow"><IconBluesky /></a>
					{/if}
					{#if social.x}
						<a href={social.x} target="_blank" rel="nofollow"><IconTwitterX /></a>
					{/if}
					{#if social.youtube}
						<a href={social.youtube} target="_blank" rel="nofollow"><IconYoutube /></a>
					{/if}
					{#if social.linkedin}
						<a href={social.linkedin} target="_blank" rel="nofollow"><IconLinkedin /></a>
					{/if}
				</div>
			</div>

			<div class="footer-top-right">
				<span class="language-toggle-wrap">
					<LanguageToggle align="end" position="top" staticPage />
				</span>
			</div>
		</div>

		<div class="footer-center">
			{@render center?.()}
		</div>

		<div class="footer-bottom">
			<div class="footer-bottom-left">
				HYVOR © {year}
			</div>
			<div class="footer-bottom-right">From France 🇫🇷</div>
		</div>
	</Container>

	{#if affiliate}
		<Affiliate />
	{/if}

</footer>

<style>
	footer {
		border-top: 1px solid var(--border);
	}

	.footer-top {
		padding-top: 60px;
		display: flex;
		align-items: flex-start;
	}
	.footer-center {
		padding-top: 50px;
	}
	.footer-top-left {
		flex: 1;
	}
	.footer-top-right {
		display: flex;
	}
	.email-wrap {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-bottom: 15px;
	}
	.social-media a {
		display: inline-block;
		padding: 3px;
		margin-right: 8px;
		color: var(--text-light);
	}
	.social-media a:first-child {
		padding-left: 0;
	}
	.social-media a:hover {
		color: var(--accent);
	}

	.footer-bottom {
		padding-top: 50px;
		padding-bottom: 30px;
		display: flex;
	}
	.footer-bottom-left {
		flex: 1;
	}

	.language-toggle-wrap {
		margin-left: 8px;
		font-size: 18px;
	}
</style>
