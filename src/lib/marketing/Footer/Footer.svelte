<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from '../Container/Container.svelte';
	import IconEnvelope from '@hyvor/icons/IconEnvelope';
	import IconCopy from '@hyvor/icons/IconCopy';
	import IconDiscord from '@hyvor/icons/IconDiscord';
	import IconGithub from '@hyvor/icons/IconGithub';
	import IconLinkedin from '@hyvor/icons/IconLinkedin';
	import IconTwitterX from '@hyvor/icons/IconTwitterX';
	import IconYoutube from '@hyvor/icons/IconYoutube';
	import IconBluesky from '@hyvor/icons/IconBluesky';
	import IconLockFill from '@hyvor/icons/IconLockFill';
	import IconButton from '$lib/components/IconButton/IconButton.svelte';
	import Tooltip from '$lib/components/Tooltip/Tooltip.svelte';
	import LanguageToggle from '$lib/components/Internationalization/LanguageToggle.svelte';
	import { SOCIAL_LINKS, type Socials } from '../social.js';
	import Affiliate from '../Affiliate/Affiliate.svelte';
	import RecordVisit from './RecordVisit.svelte';

	const year = new Date().getFullYear();

	interface Props {
		name?: string;
		subname?: string;
		product?: string;
		instance?: string;
		logo?: string;
		background?: string;
		email?: string | null;
		social?: Partial<Socials>;
		languageToggle?: boolean;
		gdpr?: boolean;
		affiliate?: boolean;
		recordVisit?: boolean;
		center?: Snippet;
		max?: boolean;
	}

	let {
		name = 'HYVOR',
		subname,
		product,
		instance = 'https://hyvor.com',
		logo,
		background = '#ececec',
		email = null,
		social = {},
		languageToggle = true,
		gdpr = true,
		affiliate = true,
		recordVisit = true,
		center,
		max = false
	}: Props = $props();

	// same "explicit logo, else derive from product" pattern as Header — pass
	// `product` (e.g. "blogs") for the mascot to follow that product's logo
	// automatically, or `logo` to override it directly. Neither given means
	// no mascot.
	const mascotLogo = $derived(
		logo || (product ? `${instance}/api/public/logo/${product}.svg` : undefined)
	);

	const socialLinks = $derived({ ...SOCIAL_LINKS, ...social });

	const SOCIAL_PLATFORMS = [
		{ key: 'x', icon: IconTwitterX, label: 'X (Twitter)' },
		{ key: 'github', icon: IconGithub, label: 'GitHub' },
		{ key: 'discord', icon: IconDiscord, label: 'Discord' },
		{ key: 'linkedin', icon: IconLinkedin, label: 'LinkedIn' },
		{ key: 'youtube', icon: IconYoutube, label: 'YouTube' },
		{ key: 'bluesky', icon: IconBluesky, label: 'Bluesky' }
	] as const satisfies { key: keyof Socials; icon: unknown; label: string }[];

	let emailCopied = $state(false);
	function handleCopyEmail() {
		if (!email) return;
		navigator.clipboard.writeText(email);
		emailCopied = true;
		setTimeout(() => (emailCopied = false), 1000);
	}

	// the floating mascot (only shown when a `logo` is given) tilts/fades in
	// once it's scrolled into view, instead of just appearing on page load
	let mascotInView = $state(false);
	function onView(node: HTMLElement, callback: () => void) {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					setTimeout(callback, 400);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	// a single 5-pointed star (outer/inner vertices alternating), centered on
	// its own origin — reused via `transform="translate(...)"` per position
	// below, rather than a plain dot, for the EU ring on the GDPR badge
	function starPath(outerR: number, innerR: number) {
		const points: string[] = [];
		for (let i = 0; i < 10; i++) {
			const angle = -Math.PI / 2 + (i * Math.PI) / 5;
			const r = i % 2 === 0 ? outerR : innerR;
			points.push(`${(r * Math.cos(angle)).toFixed(2)},${(r * Math.sin(angle)).toFixed(2)}`);
		}
		return `M${points.join('L')}Z`;
	}
	const gdprStarPath = starPath(1.7, 0.68);

	// positions for the 12-star EU ring on the small GDPR badge
	const gdprStars = Array.from({ length: 12 }, (_, i) => {
		const angle = (i * 30 * Math.PI) / 180;
		return {
			x: 16 + 12 * Math.cos(angle),
			y: 16 + 12 * Math.sin(angle)
		};
	});
</script>

<div class="footer-outer">
	{#if mascotLogo}
		<div class="mascot-wrap" use:onView={() => (mascotInView = true)}>
			<img
				src={mascotLogo}
				alt="{name} Logo"
				width="100"
				height="100"
				class:in-view={mascotInView}
			/>
		</div>
	{/if}

	<footer class:card={!!background} style:--footer-bg={background}>
		<Container {max}>
			<div class="top-row">
				<div class="brand">
					<span>{name}</span>
					{#if subname}
						<div class="subname">{subname}</div>
					{/if}
				</div>

				<div class="top-row-right">
					{#if email}
						<div class="email-wrap">
							<a class="email" href="mailto:{email}">
								<IconEnvelope size={14} />
								{email}
							</a>
							<Tooltip text={emailCopied ? 'Copied!' : 'Copy email'} position="top">
								<IconButton
									size="small"
									variant="invisible"
									onclick={handleCopyEmail}
									onmouseleave={() => (emailCopied = false)}
								>
									<IconCopy size={12} />
								</IconButton>
							</Tooltip>
						</div>
					{/if}

					<div class="socials">
						{#each SOCIAL_PLATFORMS as platform (platform.key)}
							{@const href = socialLinks[platform.key]}
							{#if href}
								<a
									{href}
									target="_blank"
									rel="nofollow"
									aria-label={platform.label}
								>
									<platform.icon size={16} />
								</a>
							{/if}
						{/each}
					</div>

					{#if languageToggle}
						<span class="language-toggle-wrap">
							<LanguageToggle align="end" position="top" staticPage />
						</span>
					{/if}
				</div>
			</div>

			<div class="footer-center">
				{@render center?.()}
			</div>

			<div class="bottom-bar">
				<div>HYVOR &copy; {year}</div>

				{#if gdpr}
					<div class="bottom-center">
						<a class="gdpr-chip" href="https://hyvor.com/compliance" target="_blank">
							<span class="gdpr-chip-icon">
								<svg class="ring" viewBox="0 0 32 32" aria-hidden="true">
									<circle cx="16" cy="16" r="16" fill="#173a8a" />
									{#each gdprStars as s}
										<path
											d={gdprStarPath}
											fill="#ffcd3c"
											transform="translate({s.x}, {s.y})"
										/>
									{/each}
								</svg>
								<span class="lock"><IconLockFill size={10} /></span>
							</span>
							<span class="gdpr-chip-text">GDPR Compliant</span>
						</a>
					</div>
				{/if}

				<div class="bottom-right">
					<div class="france">From France <span class="flag">🇫🇷</span></div>
				</div>
			</div>
		</Container>
	</footer>

	{#if affiliate}
		<Affiliate />
	{/if}

	{#if recordVisit}
		<RecordVisit />
	{/if}
</div>

<style>
	.footer-outer {
		position: relative;
		margin-top: 100px;
	}

	.mascot-wrap {
		position: absolute;
		z-index: 10;
		display: flex;
		justify-content: center;
		pointer-events: none;
		left: 0;
		bottom: 100%;
		transform: translate(-35%, 45%) rotate(20deg);
	}

	.mascot-wrap img {
		opacity: 0;
	}

	.mascot-wrap img.in-view {
		animation: mascot-tilt-in 0.8s ease forwards;
	}

	@keyframes mascot-tilt-in {
		0% {
			opacity: 0;
			transform: rotate(-14deg) scale(0.9) translateY(16px);
		}
		55% {
			opacity: 1;
			transform: rotate(10deg) scale(1.06) translateY(-4px);
		}
		100% {
			opacity: 1;
			transform: rotate(0deg) scale(1) translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mascot-wrap img {
			opacity: 1;
		}
		.mascot-wrap img.in-view {
			animation: none;
		}
	}

	footer {
		--footer-text: var(--text);
		--footer-text-strong: var(--text);
		--footer-muted: var(--text-light);
		--footer-border: var(--border);
		--footer-hover: var(--accent);

		position: relative;
		z-index: 1;
		background: var(--footer-bg, transparent);
		color: var(--footer-text);
		padding-top: 50px;
	}

	/*
		"card" mode kicks in whenever a `background` color is given — it swaps
		the footer to a light-text-on-dark scheme, since a custom background
		is assumed to be a branded dark card (as opposed to the default,
		which just inherits the page background and follows the site theme).
	*/
	/* footer.card {
		--footer-text: rgba(255, 255, 255, 0.75);
		--footer-text-strong: #fff;
		--footer-muted: rgba(255, 255, 255, 0.45);
		--footer-border: rgba(255, 255, 255, 0.08);
		--footer-hover: #fff;
	} */

	.top-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 20px;
		padding-bottom: 40px;
		border-bottom: 1px solid var(--footer-border);
	}

	.brand {
		font-size: 16px;
		font-weight: 700;
		color: var(--footer-text-strong);
	}

	.subname {
		font-size: 13px;
		font-weight: 400;
		color: var(--footer-muted);
	}

	.top-row-right {
		display: flex;
		align-items: center;
		gap: 24px;
		flex-wrap: wrap;
	}

	.email-wrap {
		display: inline-flex;
		align-items: center;
		gap: 2px;
	}

	.email {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		color: var(--footer-text);
	}

	.email:hover {
		color: var(--footer-hover);
	}

	.socials {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.socials a {
		color: var(--footer-text);
		display: flex;
	}

	.socials a:hover {
		color: var(--footer-hover);
	}

	.language-toggle-wrap {
		font-size: 18px;
	}

	.footer-center:not(:empty) {
		padding: 48px 0;
	}

	/*
		The bottom bar only gets its own top border when there's actual
		`center` content above it — otherwise that border would sit right
		on top of .top-row's bottom border (since .footer-center collapses
		to zero height when empty), making a single divider look doubled.
	*/
	.footer-center:not(:empty) + .bottom-bar {
		border-top: 1px solid var(--footer-border);
	}

	.bottom-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;
		padding: 24px 0 32px;
		font-size: 13px;
		color: var(--footer-muted);
	}

	.bottom-right {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
	}

	.france {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}

	/*
		The GDPR badge carries its own fixed navy/gold EU colors so it stays
		legible regardless of the footer's background — a compliance badge
		shouldn't fade into a light theme the way muted footer text does.
	*/
	.gdpr-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 5px 12px 5px 5px;
		border-radius: 100px;
		background: #1f2f57;
		color: #fff;
		opacity: 0.9;
		transition: opacity 0.15s ease;
	}

	.gdpr-chip:hover {
		opacity: 1;
	}

	.gdpr-chip-icon {
		position: relative;
		width: 22px;
		height: 22px;
		flex-shrink: 0;
	}

	.gdpr-chip-icon .ring {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	.gdpr-chip-icon .lock {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.gdpr-chip-text {
		font-size: 11px;
		font-weight: 800;
		letter-spacing: 0.02em;
		color: #fff;
	}

	/* emoji glyphs are pre-colored — never let the surrounding muted text
	   color dim or filter them */
	.flag {
		color: initial;
		filter: none;
	}

	@media (max-width: 560px) {
		.mascot-wrap {
			/* keep it clear of the brand wordmark that sits right below it */
			margin-bottom: -40px;
		}

		footer {
			padding-top: 130px;
		}

		.top-row {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
