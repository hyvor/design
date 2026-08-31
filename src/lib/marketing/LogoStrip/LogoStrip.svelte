<script lang="ts">
	interface Logo {
		name: string;
		src: string;
		href?: string;
		width?: number;
		height?: number;
		color?: boolean;
	}

	interface Props {
		logos: Logo[];
		label?: string;
		background?: string;
		invert?: boolean;
		marquee?: boolean;
		speed?: number;
	}

	let {
		logos,
		label = '',
		background = 'var(--accent)',
		invert = true,
		marquee = true,
		speed = 34
	}: Props = $props();

	let containerWidth = $state(0);
	let setWidths = $state<number[]>([]);
	const setWidth = $derived(setWidths[0] ?? 0);

	const copies = $derived.by(() => {
		if (!setWidth || !containerWidth) return 2;
		const needed = Math.ceil((containerWidth * 2) / setWidth);
		return Math.min(20, Math.max(2, needed % 2 === 0 ? needed : needed + 1));
	});
</script>

{#snippet logoImg(logo: Logo, hidden = false)}
	<img
		src={logo.src}
		alt={logo.name}
		width={logo.width ?? 120}
		height={logo.height ?? 28}
		class="logo"
		class:invert={invert && !logo.color}
		class:color={logo.color}
		aria-hidden={hidden}
	/>
{/snippet}

<section class="hds-logo-strip" style:--ls-bg={background} style:--ls-speed="{speed}s">
	<div class="hds-container">
		{#if label}
			<p class="label">{label}</p>
		{/if}

		{#if !marquee}
			<div class="logos">
				{#each logos as logo}
					{#if logo.href}
						<a href={logo.href} target="_blank" rel="noopener" class="logo-link">
							{@render logoImg(logo)}
						</a>
					{:else}
						{@render logoImg(logo)}
					{/if}
				{/each}
			</div>
		{/if}
	</div>

	{#if marquee}
		<div class="marquee hds-container-max" bind:clientWidth={containerWidth}>
			<div class="marquee-track" style:--ls-copies={copies}>
				{#each Array.from({ length: copies }) as _, setIndex (setIndex)}
					{@const hidden = setIndex > 0}
					<div class="marquee-set" bind:clientWidth={setWidths[setIndex]} aria-hidden={hidden}>
						{#each logos as logo}
							{#if logo.href}
								<a
									href={logo.href}
									target="_blank"
									rel="noopener"
									class="logo-link"
									tabindex={hidden ? -1 : undefined}
								>
									{@render logoImg(logo, hidden)}
								</a>
							{:else}
								{@render logoImg(logo, hidden)}
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>

<style>
	.hds-logo-strip {
		background: var(--ls-bg);
		padding: 52px 0;
		overflow: hidden;
	}

	.label {
		text-align: center;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--accent-light-mid);
		margin: 0 0 36px;
	}

	.logos {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 24px 52px;
	}

	/* marquee layout */
	.marquee {
		mask-image: linear-gradient(
			to right,
			transparent 0,
			black 64px,
			black calc(100% - 64px),
			transparent 100%
		);
		-webkit-mask-image: linear-gradient(
			to right,
			transparent 0,
			black 64px,
			black calc(100% - 64px),
			transparent 100%
		);
	}

	.marquee-track {
		display: flex;
		align-items: center;
		width: max-content;
		/* keep a constant per-set speed regardless of how many sets we repeat */
		animation: marquee-scroll calc(var(--ls-speed) * var(--ls-copies, 2) / 2) linear infinite;
	}

	.marquee-set {
		display: flex;
		align-items: center;
		flex: none;
		gap: 52px;
		/* trailing gap so every set is an identical width and -50% lands cleanly */
		padding-right: 52px;
	}

	.marquee:hover .marquee-track {
		animation-play-state: paused;
	}

	@keyframes marquee-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	.logo-link {
		display: block;
	}

	.logo {
		display: block;
		flex-shrink: 0;
		opacity: 0.8;
		transition: opacity 0.15s ease;
	}

	.logo.invert {
		filter: brightness(0) invert(1);
	}

	.logo.color {
		filter: none;
		opacity: 1;
		border-radius: 10px;
	}

	.logo:hover {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee {
			mask-image: none;
			-webkit-mask-image: none;
		}

		.marquee-track {
			animation: none;
			width: 100%;
			padding: 0 15px;
		}

		.marquee-set {
			flex-wrap: wrap;
			justify-content: center;
			width: 100%;
			padding-right: 0;
		}

		.marquee-set:not(:first-child) {
			display: none;
		}
	}
</style>
