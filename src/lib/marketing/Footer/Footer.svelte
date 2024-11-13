<script lang="ts">
	import Container from '$lib/marketing/Container/Container.svelte';
	import {
		IconCopy,
		IconDiscord,
		IconEnvelope,
		IconGithub,
		IconLinkedin,
		IconTwitterX,
		IconYoutube
	} from '@hyvor/icons';
	import Link from '../../components/Link/Link.svelte';
	import IconButton from '../../components/IconButton/IconButton.svelte';
	import Tooltip from '../../components/Tooltip/Tooltip.svelte';
	import LanguageToggle from '$lib/components/Internationalization/LanguageToggle.svelte';

	const year = new Date().getFullYear();

	interface Props {
		email?: string | null;
		social?: any;
		emailCopied?: boolean;
		center?: import('svelte').Snippet;
	}

	let {
		email = null,
		social = $bindable({} as Record<string, string | null>),
		emailCopied = $bindable(false),
		center
	}: Props = $props();

	social = {
		...{
			x: null,
			discord: 'https://discord.com/invite/2WRJxQB',
			github: 'https://github.com/hyvor',
			youtube: 'https://www.youtube.com/@HYVOR',
			linkedin: 'https://www.linkedin.com/company/30240435'
		},
		...social
	};

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
														<IconEnvelope  />
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
					{#if social.x}
						<a href={social.x} target="_blank" rel="nofollow"><IconTwitterX /></a>
					{/if}
					{#if social.discord}
						<a href={social.discord} target="_blank" rel="nofollow"><IconDiscord /></a>
					{/if}
					{#if social.youtube}
						<a href={social.discord} target="_blank" rel="nofollow"><IconYoutube /></a>
					{/if}
					{#if social.linkedin}
						<a href={social.linkedin} target="_blank" rel="nofollow"><IconLinkedin /></a>
					{/if}
				</div>
			</div>

			<div class="footer-top-right">
				<span class="language-toggle-wrap">
					<LanguageToggle />
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
