<script lang="ts">
	import Button from '../../components/Button/Button.svelte';
	import IconBoxArrowUpRight from '@hyvor/icons/IconBoxArrowUpRight';
	import type { Snippet } from 'svelte';

	type ButtonConfig = { href: string; label: string; external?: boolean };

	interface Props {
		title: string | Snippet;
		description?: string;
		stats?: string[];
		button?: ButtonConfig | ButtonConfig[] | null;
		content: Snippet;
		reverse?: boolean;
		background?: string;
		highlightColor?: string;
	}

	let {
		title,
		description = '',
		stats = [],
		button = null,
		content,
		reverse = false,
		background = 'var(--accent)',
		highlightColor = 'rgba(255, 238, 217, 0.9)'
	}: Props = $props();

	const buttons = $derived(button ? (Array.isArray(button) ? button : [button]) : []);

	let mouseX = $state(0);
	let mouseY = $state(0);
	let hovering = $state(false);

	function handlePointerMove(event: PointerEvent) {
		const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
		mouseX = event.clientX - bounds.left;
		mouseY = event.clientY - bounds.top;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<section
	class="hds-spotlight-split"
	onpointermove={handlePointerMove}
	onpointerenter={() => (hovering = true)}
	onpointerleave={() => (hovering = false)}
	style:--mx="{mouseX}px"
	style:--my="{mouseY}px"
	style:--sps-bg={background}
	style:--sps-highlight={highlightColor}
>
	<svg class="bg-pattern" width="100%" height="100%" aria-hidden="true">
		<defs>
			<pattern id="spotlight-split-grid" width="56" height="56" patternUnits="userSpaceOnUse">
				<path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" stroke-width="1" />
			</pattern>
			<radialGradient id="spotlight-split-fade" cx="50%" cy="40%" r="75%">
				<stop offset="0%" stop-color="white" stop-opacity="1" />
				<stop offset="100%" stop-color="white" stop-opacity="0" />
			</radialGradient>
			<mask id="spotlight-split-mask">
				<rect width="100%" height="100%" fill="url(#spotlight-split-fade)" />
			</mask>
		</defs>
		<rect
			width="100%"
			height="100%"
			fill="url(#spotlight-split-grid)"
			mask="url(#spotlight-split-mask)"
		/>
	</svg>

	<div class="grid-highlight" class:visible={hovering} aria-hidden="true"></div>

	<div class="hds-container inner" class:reverse>
		<div class="text-side">
			<h2>
				{#if typeof title === 'string'}
					{@html title}
				{:else}
					{@render title()}
				{/if}
			</h2>

			{#if description}
				<p class="description">{description}</p>
			{/if}

			{#if stats.length}
				<div class="stat-row">
					{#each stats as stat}
						<span class="stat">{stat}</span>
					{/each}
				</div>
			{/if}

			{#if buttons.length}
				<div class="buttons">
					{#each buttons as b}
						<Button
							as="a"
							href={b.href}
							target={b.external ? '_blank' : undefined}
							rel={b.external ? 'noopener' : undefined}
							variant="outline"
							color="input"
						>
							{b.label}
							{#if b.external}
								{#snippet end()}<IconBoxArrowUpRight size={11} />{/snippet}
							{/if}
						</Button>
					{/each}
				</div>
			{/if}
		</div>

		<div class="content-side">
			{@render content()}
		</div>
	</div>
</section>

<style>
	.hds-spotlight-split {
		position: relative;
		background: var(--sps-bg);
		padding: 96px 0;
		overflow: hidden;
	}

	.bg-pattern {
		position: absolute;
		inset: 0;
		opacity: 0.08;
		pointer-events: none;
	}

	.grid-highlight {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image:
			linear-gradient(to right, var(--sps-highlight) 1px, transparent 1px),
			linear-gradient(to bottom, var(--sps-highlight) 1px, transparent 1px);
		background-size: 56px 56px;
		-webkit-mask-image: radial-gradient(
			180px circle at var(--mx, 50%) var(--my, 50%),
			black 0%,
			black 35%,
			transparent 75%
		);
		mask-image: radial-gradient(
			180px circle at var(--mx, 50%) var(--my, 50%),
			black 0%,
			black 35%,
			transparent 75%
		);
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	.grid-highlight.visible {
		opacity: 0.2;
	}

	.inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 48px;
	}

	.inner.reverse {
		flex-direction: row-reverse;
	}

	.text-side {
		flex: 1;
		min-width: 0;
	}

	h2 {
		font-size: clamp(35px, 4vw, 50px);
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.1;
		color: #fff;
		margin: 0 0 18px;
		font-family: var(--font-serif);
	}

	.description {
		font-size: 16px;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.7);
		max-width: 460px;
		margin: 0 0 28px;
	}

	.stat-row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 20px;
		margin-bottom: 28px;
	}

	.stat {
		font-size: 14px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.85);
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.buttons :global(.button) {
		border-color: rgba(255, 255, 255, 0.3) !important;
		color: rgba(255, 255, 255, 0.85) !important;
		background: transparent !important;
		text-decoration: none !important;
	}

	.buttons :global(.button):hover {
		border-color: rgba(255, 255, 255, 0.55) !important;
		color: #fff !important;
	}

	.content-side {
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.inner,
		.inner.reverse {
			flex-direction: column;
			text-align: center;
			gap: 36px;
		}

		.description {
			max-width: 100%;
		}

		.stat-row,
		.buttons {
			justify-content: center;
		}
	}
</style>
