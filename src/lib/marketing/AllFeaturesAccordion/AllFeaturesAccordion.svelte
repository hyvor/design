<script lang="ts">
	import IconCaretDown from '@hyvor/icons/IconCaretDown';
	import type { Component } from 'svelte';
	import Feature from './AllFeaturesAccordionFeature.svelte';

	interface FeatureItem {
		icon: Component;
		title: string;
		description: string;
	}

	interface Category {
		label: string;
		icon: Component;
		color?: string;
		features: FeatureItem[];
	}

	interface Props {
		title?: string;
		description?: string;
		categories: Category[];
		defaultOpenIndex?: number;
		accentColor?: string;
		accentColorDark?: string;
	}

	let {
		title = "And There's More...",
		description = '',
		categories,
		defaultOpenIndex = 0,
		accentColor,
		accentColorDark
	}: Props = $props();

	let openIndex = $state(defaultOpenIndex);

	function toggle(i: number) {
		openIndex = openIndex === i ? -1 : i;
	}
</script>

<section
	class="hds-all-features-accordion hds-container"
	style:--afa-accent={accentColor}
	style:--afa-accent-dark={accentColorDark}
>
	<div class="section-header">
		<h2>{title}</h2>
		{#if description}
			<p>{description}</p>
		{/if}
	</div>

	<div class="accordion">
		{#each categories as cat, i}
			{@const CatIcon = cat.icon}
			{@const catColor = cat.color || 'var(--accent)'}
			<div class="accordion-item" class:open={openIndex === i}>
				<h3 class="accordion-heading">
					<button
						class="accordion-trigger"
						id="hds-accordion-trigger-{i}"
						onclick={() => toggle(i)}
						aria-expanded={openIndex === i}
						aria-controls="hds-accordion-panel-{i}"
						style="--cat-color: {catColor}"
					>
						<span class="cat-icon" aria-hidden="true">
							<CatIcon size={18} />
						</span>
						<span class="cat-label">{cat.label}</span>
						<span class="cat-count">{cat.features.length} features</span>
						<span class="chevron" class:rotated={openIndex === i} aria-hidden="true">
							<IconCaretDown size={16} />
						</span>
					</button>
				</h3>

				<div
					class="accordion-body"
					class:open={openIndex === i}
					role="region"
					id="hds-accordion-panel-{i}"
					aria-labelledby="hds-accordion-trigger-{i}"
				>
					<div class="accordion-body-inner">
						<div class="accordion-content">
							<ul class="features-grid">
								{#each cat.features as feat}
									<Feature
										icon={feat.icon}
										title={feat.title}
										description={feat.description}
										color={catColor}
									/>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.hds-all-features-accordion {
		padding: 80px 0;
	}

	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}

	.section-header h2 {
		font-size: 32px;
		font-weight: 700;
		margin: 0 0 6px;
		font-family: var(--font-serif);
	}

	.section-header p {
		font-size: 1rem;
		color: var(--text-light);
		margin: 0;
	}

	.accordion {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.accordion-item {
		border-radius: 16px;
		transition: background 0.2s ease;
	}

	.accordion-item.open {
		background: color-mix(in srgb, var(--afa-accent, var(--accent)) 6%, transparent);
	}

	:global(:root.dark) .accordion-item.open {
		background: color-mix(
			in srgb,
			var(--afa-accent-dark, var(--afa-accent, var(--accent))) 6%,
			transparent
		);
	}

	.accordion-heading {
		margin: 0;
		font-size: inherit;
		font-weight: inherit;
	}

	.accordion-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 18px 20px;
		background: none;
		border: none;
		border-radius: inherit;
		cursor: pointer;
		text-align: left;
		transition: background 0.15s;
		color: var(--text);
	}

	.accordion-item:not(.open) .accordion-trigger:hover {
		background: var(--hover);
	}

	.cat-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
		border-radius: 10px;
		color: var(--cat-color);
		background: color-mix(in srgb, var(--cat-color) 16%, transparent);
		flex-shrink: 0;
	}

	.cat-label {
		font-size: 16px;
		font-weight: 600;
		flex: 1;
	}

	.cat-count {
		font-size: 13px;
		color: var(--text-light);
	}

	.chevron {
		display: flex;
		align-items: center;
		color: var(--text-light);
		transition: transform 0.2s;
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	/* CSS grid row trick: content stays in DOM for SEO, height animates via grid */
	.accordion-body {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.22s ease;
	}

	.accordion-body.open {
		grid-template-rows: 1fr;
	}

	.accordion-body-inner {
		overflow: hidden;
	}

	.accordion-content {
		padding: 8px 20px 28px;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 28px 20px;
		margin: 0;
		padding: 0;
	}

	/* Override AllFeaturesAccordionFeature's width since we're using grid now */
	/* TODO */
	.features-grid :global(.feature) {
		width: auto;
	}

	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
