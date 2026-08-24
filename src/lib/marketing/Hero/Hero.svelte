<script lang="ts">
	import Button from '../../components/Button/Button.svelte';
	import IconChevronDown from '@hyvor/icons/IconChevronDown';
	import type { ComponentProps, Snippet } from 'svelte';

	type ButtonProps = ComponentProps<typeof Button>;

	interface Props {
		title: string | Snippet;
		subtitle?: string | Snippet;
		badge?: string | Snippet;
		buttons?: ButtonProps | ButtonProps[] | null;
		accentColor?: string;
		accentColorDark?: string;
		fullHeight?: boolean;
		after?: Snippet;
	}

	let {
		title,
		subtitle,
		badge,
		buttons = null,
		accentColor,
		accentColorDark,
		fullHeight = false,
		after
	}: Props = $props();

	const buttonList = $derived(buttons ? (Array.isArray(buttons) ? buttons : [buttons]) : []);
</script>

<section
	class="hero"
	class:full-height={fullHeight}
	style:--hero-accent={accentColor}
	style:--hero-accent-dark={accentColorDark}
>
	<svg class="hero-pattern" aria-hidden="true" focusable="false">
		<defs>
			<pattern id="hero-dot-pattern" width="28" height="28" patternUnits="userSpaceOnUse">
				<circle cx="2" cy="2" r="1.6" fill="currentColor" />
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#hero-dot-pattern)" />
	</svg>

	<div class="hds-container inner">
		<div class="left">
			{#if badge}
				<div class="badge anim anim-0">
					{#if typeof badge === 'string'}
						{badge}
					{:else}
						{@render badge()}
					{/if}
				</div>
			{/if}

			<h1 class="anim anim-1">
				{#if typeof title === 'string'}
					{@html title}
				{:else}
					{@render title()}
				{/if}
			</h1>

			{#if subtitle}
				<h2 class="subtitle anim anim-2">
					{#if typeof subtitle === 'string'}
						{@html subtitle}
					{:else}
						{@render subtitle()}
					{/if}
				</h2>
			{/if}

			{#if buttonList.length}
				<div class="buttons anim anim-3">
					{#each buttonList as b}
						<Button
							as="a"
							href={b.href}
							target={b.external ? '_blank' : undefined}
							rel={b.external ? 'noopener' : undefined}
							size={b.size || 'x-large'}
							variant={b.variant}
						>
							{b.label}
						</Button>
					{/each}
				</div>
			{/if}

			{#if after}
				<div class="anim anim-3">
					{@render after()}
				</div>
			{/if}
		</div>
	</div>

	<div class="scroll-indicator anim anim-4" aria-hidden="true">
		<div class="scroll-mouse">
			<div class="scroll-dot"></div>
		</div>
		<IconChevronDown size={12} />
	</div>
</section>

<style>
	.hero {
		--hero-accent-resolved: var(--hero-accent, var(--accent));

		position: relative;
		display: flex;
		align-items: center;
		padding: 60px 0 80px;
		overflow: hidden;
	}

	.hero.full-height {
		min-height: calc(100vh - var(--header-height, 60px));
	}

	:global(:root.dark) .hero {
		--hero-accent-resolved: var(--hero-accent-dark, var(--hero-accent, var(--accent)));
	}

	.hero-pattern {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		color: var(--border);
		mask-image: radial-gradient(ellipse 65% 60% at 50% 38%, black 0%, transparent 75%);
		-webkit-mask-image: radial-gradient(ellipse 65% 60% at 50% 38%, black 0%, transparent 75%);
		pointer-events: none;
	}

	.inner {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 100px;
		width: 1120px;
		max-width: 100%;
	}

	.left {
		flex: 1;
		min-width: 0;
		text-align: center;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		border-radius: 100px;
		font-size: 13px;
		font-weight: 600;
		background: color-mix(in srgb, var(--hero-accent-resolved) 12%, transparent);
		color: var(--hero-accent-resolved);
		margin-bottom: 24px;
		border: 1px solid color-mix(in srgb, var(--hero-accent-resolved) 25%, transparent);
	}

	h1 {
		margin: 0;
		font-size: clamp(36px, 5vw, 56px);
		line-height: 1.1;
		letter-spacing: -0.02em;
		font-weight: 800;
		font-family: var(--font-serif);
	}

	/* smaller second line inside the title, e.g. a parenthetical sub-line */
	.left :global(h1 .heading-small) {
		font-size: clamp(35px, 5vw, 46px);
		font-weight: 800;
	}

	.subtitle {
		font-weight: 500;
		letter-spacing: -0.02em;
		font-family: var(--font-serif);

		margin: auto;
		margin-top: 30px;
		font-size: clamp(22px, 3vw, 26px);
		line-height: 1.6;
		color: color-mix(in srgb, var(--text) 70%, var(--text-light));
		max-width: 480px;
	}

	.left :global(.hds-hl) {
		color: var(--hero-accent-resolved);
		font-weight: 700;
	}

	.left :global(.hds-marker) {
		position: relative;
		font-weight: 700;
		background-image: linear-gradient(
			100deg,
			color-mix(in srgb, var(--hero-accent-resolved) 35%, transparent) 0%,
			color-mix(in srgb, var(--hero-accent-resolved) 45%, transparent) 100%
		);
		background-repeat: no-repeat;
		background-size: 100% 0.5em;
		background-position: 0 88%;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
	}

	.buttons {
		display: flex;
		gap: 12px;
		margin-top: 36px;
		flex-wrap: wrap;
		justify-content: center;
	}

	/* Entrance animation */
	.anim {
		opacity: 0;
		animation: hero-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.anim-0 {
		animation-delay: 0s;
	}

	.anim-1 {
		animation-delay: 0.05s;
	}

	.anim-2 {
		animation-delay: 0.15s;
	}

	.anim-3 {
		animation-delay: 0.25s;
	}

	.anim-4 {
		animation-delay: 0.6s;
	}

	@keyframes hero-fade-up {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.anim {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	/* Scroll indicator */
	.scroll-indicator {
		position: absolute;
		left: 50%;
		bottom: 28px;
		transform: translateX(-50%);
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		color: var(--text-light);
	}

	.scroll-mouse {
		width: 24px;
		height: 38px;
		border: 2px solid var(--border);
		border-radius: 100px;
		display: flex;
		justify-content: center;
		padding-top: 6px;
	}

	.scroll-dot {
		width: 4px;
		height: 8px;
		border-radius: 2px;
		background: var(--hero-accent-resolved);
		animation: scroll-wheel 1.8s ease-in-out infinite;
	}

	@keyframes scroll-wheel {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		60% {
			opacity: 0;
			transform: translateY(12px);
		}
		100% {
			opacity: 0;
			transform: translateY(12px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-dot {
			animation: none;
		}
	}

	/* Responsive */
	@media (max-width: 992px) {
		.hero.full-height {
			min-height: unset;
		}

		.hero {
			padding: 60px 0;
		}

		.inner {
			flex-direction: column;
			gap: 48px;
			text-align: center;
		}

		.subtitle {
			max-width: 100%;
		}

		.buttons {
			justify-content: center;
		}

		.scroll-indicator {
			display: none;
		}
	}
</style>
